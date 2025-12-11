import { Application } from "@/models/creditModels";
import { BankCode } from "@/models/enums/Request";
import { User } from "@/models/userModels";
import { getApplication } from "@/services/financialAPI";
import { getUserById } from "@/services/userAPI";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { router } from "expo-router";
export const useApplication = (id: string, bankCode: BankCode) => {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getApplicationById(id, bankCode);
  }, [id, bankCode]);

  const fetchUserName = async (userId: string) => {
    try {
      const token = await getToken({ template: "prestek-api" });
      if (!token) {
        throw new Error("No authentication token");
      }
      setLoading(true);
      const user = await getUserById(userId, token);
      console.log("User:", user);
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      router.push("/(error)");
    } finally {
      setLoading(false);
    }
  };
  const getApplicationById = async (
    applicationId: string,
    bankCode: BankCode
  ) => {
    const token = await getToken({ template: "prestek-api" });
    if (!token) {
      throw new Error("No authentication token");
    }
    setLoading(true);
    try {
      const response = await getApplication(applicationId, bankCode, token);
      fetchUserName(response.data.userId);
      setApplication(response.data);
    } catch (error) {
      console.error("Error getting application:", error);
    }
  };
  return { application, getApplicationById, user, loading };
};
