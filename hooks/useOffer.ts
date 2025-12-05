import { OfferResponse } from "@/models/creditModels";
import { User } from "@/models/userModels";
import { getApplication } from "@/services/financialAPI";
import { createLoan } from "@/services/offerAPI";
import { useAuth } from "@clerk/clerk-expo";
import { getItem } from "expo-secure-store";
import { useState } from "react";
import { useApplications } from "./useApplications";

export const useOffer = () => {
    const [loading, setLoading] = useState(false);
    const [offerResult, setOfferResult] = useState<OfferResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useAuth();
    const { loadApplications } = useApplications();

    const handleOffer = async (
        amount: number, 
        termMonths: number, 
        selectedEntity: string,
    ) => {
        setLoading(true);
        setError(null);
        
        const user = await getItem("user");
        if (!user) {
            setError("Usuario no encontrado");
            setLoading(false);
            return null;
        }
        
        const userData = JSON.parse(user) as User;
        try {
            const token = await getToken({ template: "prestek-api" });
            if (!token) {
                throw new Error("No authentication token");
            }
            
            const response = await createLoan({
                userId: userData.id.toString(),
                amount,
                termMonths,
                monthlyIncome: userData.monthlyIncome,
                selectedEntity,
            }, token);
            
            await loadApplications(userData.id.toString());

            setOfferResult(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
            setError("Error al procesar la solicitud. Intenta de nuevo.");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const resetOffer = () => {
        setOfferResult(null);
        setError(null);
    };

    return { 
        loading,
        offerResult,
        error,
        handleOffer,
        resetOffer,
    };
}