import CompleteProfile from "@/components/Client/scanner/profile/CompleteProfile";
import { LoadingTransition } from "@/components/LoadingTransition";
import { User } from "@/models/userModels";
import { getItem } from "@/utils/secureStorage";
import { useEffect, useState } from "react";

export default function EditProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser) as User;
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  if (isLoading) {
    return <LoadingTransition />;
  }

  return (
    <CompleteProfile
      data={
        user
          ? {
              name: user.firstName,
              lastName: user.lastName,
              document: user.documentNumber,
              date: null,
            }
          : null
      }
      additionalInformation={
        user
          ? {
              phone: user.phone,
              monthlyIncome: user.monthlyIncome?.toString() || "",
              monthlyExpenses: user.monthlyExpenses?.toString() || "",
              employmentStatus: user.employmentStatus as
                | "Employed"
                | "Unemployed"
                | "Self-Employed"
                | "Student"
                | "Retired",
            }
          : undefined
      }
      isEditing={true}
    />
  );
}
