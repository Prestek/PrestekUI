import { Application } from "@/models/creditModels";
import { BankCode, LoanRequestStatus } from "@/models/enums/Request";
import { getApplicationsByBank } from "@/services/financialAPI";
import { useAuth } from "@clerk/clerk-expo";
import { getItem } from "expo-secure-store";
import { createContext, useState } from "react";

type BankContextType = {
    applications: Application[];
    isLoading: boolean;
    loadApplications: () => Promise<void>;
    addApplication: (newApplication: Application) => void;
    replaceAllApplications: (list: Application[]) => void;
    total: number;
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    bankCode: BankCode | null;
  };


export const BankContext = createContext<BankContextType | undefined>(undefined);

// Convierte fecha (string o array) a timestamp para ordenar
const dateToTimestamp = (date: string | number[] | undefined): number => {
    if (!date) return 0;
    if (typeof date === "string") {
        return new Date(date).getTime();
    }
    if (Array.isArray(date)) {
        // Array: [year, month, day, hour, minute, second, nanoseconds]
        return new Date(
            date[0],
            date[1] - 1,
            date[2],
            date[3] || 0,
            date[4] || 0,
            date[5] || 0
        ).getTime();
    }
    return 0;
};

export function BankProvider({ children }: { children: React.ReactNode }) {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getToken } = useAuth();
    const [total, setTotal] = useState(0);
    const[totalPending, setTotalPending] = useState(0);
    const[totalApproved, setTotalApproved] = useState(0);
    const[totalRejected, setTotalRejected] = useState(0);
    const[bankCode, setBankCode] = useState<BankCode | null>(null);
    const loadApplications = async () => {
        setIsLoading(true);
        try {
            const token = await getToken({ template: "prestek-api" });
            if (!token) {
                throw new Error("No authentication token");
            }
            const bankCode = await getItem("selectedBank");
            console.log("bank en contexto",bankCode);
            if (!bankCode) {
                throw new Error("No bank code selected");
            }
            setBankCode(bankCode as BankCode);
            console.log("bank en contexto",bankCode);
            const response = await getApplicationsByBank(token, bankCode as BankCode);
            const orderedApplications = response.data.sort((a: Application, b: Application) => {
                const dateA = dateToTimestamp(a.applicationDate);
                const dateB = dateToTimestamp(b.applicationDate);
                return dateB - dateA;
            });
            console.log("Ordered Applications:", orderedApplications);
            setApplications(orderedApplications);
            setTotal(orderedApplications.length);
            setTotalPending(orderedApplications.filter((a: Application) => a.status === LoanRequestStatus.PENDING).length);
            setTotalApproved(orderedApplications.filter((a: Application) => a.status === LoanRequestStatus.APPROVED).length);
            setTotalRejected(orderedApplications.filter((a: Application) => a.status === LoanRequestStatus.REJECTED).length);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addApplication = (newApplication: Application) => {
        const lastApplication = applications.find((a: Application) => a.id === newApplication.id);
        if (lastApplication) {
        const newApplications = applications.splice(applications.indexOf(lastApplication), 1, newApplication);
        setApplications(newApplications);
        }
    }
    const replaceAllApplications = (list: Application[]) => {
        setApplications(list);
    }
    

    return (
        <BankContext.Provider value={{ applications, isLoading, loadApplications, addApplication, replaceAllApplications, total, totalPending, totalApproved, totalRejected, bankCode }}>
            {children}
        </BankContext.Provider>
    );
}