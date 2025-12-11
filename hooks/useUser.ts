import { User } from "@/models/userModels";
import { updateUserProfile } from "@/services/userAPI";
import { getItem, saveItem } from "@/utils/secureStorage";
import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useUserProfile = () => {
  const { getToken } = useAuth();
  const [isChecking, setIsChecking] = useState(true);

  const updateUser = async (profileData: {
    email: string;
    firstName: string;
    lastName: string;
    documentNumber: string;
    phone: string;
    monthlyIncome: number;
    monthlyExpenses: number;
    employmentStatus:
      | "Employed"
      | "Unemployed"
      | "Self-Employed"
      | "Student"
      | "Retired";
  }) => {
    try {
      setIsChecking(true);
      const token = await getToken({ template: "prestek-api" });
      if (!token) {
        throw new Error("No authentication token");
      }
      const user = await getItem("user");
      if (!user) {
        throw new Error("No user found");
      }
      const userData = JSON.parse(user) as User;
      const updatedUser = await updateUserProfile(
        userData.id,
        {
          id: userData.id,
          email: profileData.email,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          documentNumber: profileData.documentNumber,
          phone: profileData.phone,
          monthlyIncome: profileData.monthlyIncome,
          monthlyExpenses: profileData.monthlyExpenses,
          employmentStatus: profileData.employmentStatus,
          creditScore: userData.creditScore,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt,
        },
        token
      );
      await saveItem("user", JSON.stringify(updatedUser));
      Alert.alert(
        "Perfil actualizado",
        "El perfil ha sido actualizado correctamente"
      );
    } catch (error) {
      console.error("Error updating user:", error);
      router.push("/(error)");
    } finally {
      setIsChecking(false);
    }
  };
  return { updateUser, isChecking };
};
