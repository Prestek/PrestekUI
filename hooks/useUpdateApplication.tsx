import { UpdateApplicationRequest } from "@/models/creditModels";
import { BankCode } from "@/models/enums/Request";
import { updateApplication } from "@/services/financialAPI";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import { useBank } from "./useBank";
import { Alert } from "react-native";
import { router } from "expo-router";

export const useUpdateApplication = () => {
    const [loading, setLoading] = useState(false);
    const { getToken } = useAuth();
    const {loadApplications} = useBank();
    const updateApplicationRequest = async (applicationId: number, bankCode: BankCode, application: UpdateApplicationRequest) => {
        setLoading(true);
        try {
            const token = await getToken({ template: "prestek-api" });
            if (!token) {
                throw new Error("No authentication token");
            }
            const response = await updateApplication(applicationId, bankCode, application, token);
            console.log("Response:", response);
            loadApplications();
            Alert.alert("Solicitud actualizada", "La solicitud ha sido actualizada correctamente");
            router.back();
            return response;
        } catch (error) {
            console.error("Error updating application:", error);
        } finally {
            setLoading(false);
        }
    }
    return { updateApplicationRequest, loading };
}