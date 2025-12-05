import { SimulationResponse } from "@/models/creditModels";
import { User } from "@/models/userModels";
import { simulateLoan } from "@/services/financialAPI";
import { getItem } from "@/utils/secureStorage";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";

export type LoanStep = "confirmation" | "searching" | "options" | "detail" | "no_offers" | "processing" | "success";

export const useSimulation = () => {
    const [simulationResult, setSimulationResult] = useState<SimulationResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<LoanStep>("confirmation");
    const [error, setError] = useState<string | null>(null);
    const { getToken } = useAuth();

    const handleSimulation = async (amount: number, termMonths: number) => {
        setLoading(true);
        setError(null);
        setCurrentStep("searching");
        
        const user = await getItem("user");
        if (!user) {
            setError("Usuario no encontrado");
            setCurrentStep("confirmation");
            setLoading(false);
            return;
        }
        
        const userData = JSON.parse(user) as User;
        try {
            const token = await getToken({ template: "prestek-api" });
            if (!token) {
                throw new Error("No authentication token");
            }
            
            const response = await simulateLoan({
                userId: userData.id.toString(),
                amount,
                termMonths,
                monthlyIncome: userData.monthlyIncome,
            }, token);
            
            console.log("Simulation response:", response.data);
            
            const hasOffers = response.data && 
                response.data.analysis && 
                Object.keys(response.data.analysis).length > 0;
            
            if (hasOffers) {
                setSimulationResult(response.data);
                setCurrentStep("options");
            } else {
                setSimulationResult(null);
                setCurrentStep("no_offers");
            }
        } catch (error) {
            console.error(error);
            router.push("/(error)");
        } finally {
            setLoading(false);
        }
    };

    const resetSimulation = () => {
        setSimulationResult(null);
        setCurrentStep("confirmation");
        setError(null);
    };

    return { 
        simulationResult, 
        loading, 
        error,
        handleSimulation, 
        currentStep, 
        setCurrentStep,
        resetSimulation 
    };
}