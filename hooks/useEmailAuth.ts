import { useEffect, useState, useRef } from "react";
import { useSignIn, useSignUp, useAuth, useUser } from "@clerk/clerk-expo";
import { router, useRouter } from "expo-router";
import { createUserProfile, getAllUsers, getUserByEmail } from "../services/userAPI";
import { getItem } from "expo-secure-store";
import { saveItem } from "@/utils/secureStorage";
import { useApplications } from "./useApplications";
import { User } from "@/models/userModels";

export const useEmailSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, setActive } = useSignIn();

  const handleSignIn = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn?.create({
        identifier: email,
        password,
      });

      if (result?.status === "complete") {
        console.log("Sign in successful:", result);
        await setActive?.({ session: result.createdSessionId });
      }
    } catch (err) {
      console.error("Sign in error:", err);
      alert("Sign in failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading };
};

export const useEmailSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const { signUp, setActive } = useSignUp();
  const { user } = useUser();
  const { getToken } = useAuth();
  const handleSignUp = async (email: string, password: string) => {
    console.log("Handling sign up for:", email);
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      console.log("Starting sign up for:", email);
      await signUp?.create({ emailAddress: email, password });
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign up error:", err);
      alert("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!code) {
      alert("Por favor ingresa el código de verificación");
      return;
    }
    setLoading(true);
    try {
      const result = await signUp?.attemptEmailAddressVerification({ code });

      if (result?.status === "complete") {
        await setActive?.({ session: result.createdSessionId });
        setPendingVerification(false);
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Verificación fallida. Por favor verifica tu código y vuelve a intentarlo.");
    } finally {
      setLoading(false);
    }
  };

  const completeUserProfile = async (profileData: {
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
    let userId = 0;
    try {
      const token = await getToken({ template: "prestek-api" });
      if (!token) {
        throw new Error("No authentication token");
      }
      const users = await getAllUsers(token);
      console.log(users);
      if (users.data.length > 0) {
        userId = users.data.length + 1;
      }
      console.log(users.data.length);
      if(userId === 0) {
        userId = 1;
      }
      const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";
      const userResponse = await createUserProfile({
        id: userId,
        email: userEmail,
        ...profileData,
        creditScore: 600,
      }, token);
      await saveItem("user", JSON.stringify(userResponse));
      // Solo redirigir al home después de completar el perfil
      router.replace("/(client)/(home)");
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  };

  return {
    handleSignUp,
    handleVerify,
    completeUserProfile,
    loading,
    pendingVerification,
  };
};

// Hook combinado para facilitar el uso
export const useEmailAuth = () => {
  const signUpHook = useEmailSignUp();

  return {
    ...signUpHook,
  };
};

export const useCheckUserExists = (userEmail: string) => {
  const router = useRouter();
  const auth = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  const hasExecutedRef = useRef(false);
  const { loadApplications } = useApplications();
  const { getToken } = useAuth();

  useEffect(() => {
    if (!userEmail || !auth.isSignedIn || hasExecutedRef.current) {
      return;
    }

    hasExecutedRef.current = true;

    const checkAndRedirect = async () => {
      setIsChecking(true);
      try {
        const token = await getToken({ template: "prestek-api" });
        if (!token) {
          throw new Error("No authentication token");
        }
        const storedUser = await getItem("user");
        if (!storedUser) {
          const user = await getUserByEmail(userEmail, token);
          if (user) {
            await saveItem("user", JSON.stringify(user));
          }
        }
        const user = await getItem("user");
        if (user) {
          const userData = JSON.parse(user) as User;
          await loadApplications(userData.id.toString());
        }
      } catch (error) {
        console.error("Error checking user existence:", error);
      } finally {
        setIsChecking(false);
      }
    };
    checkAndRedirect();
  }, [userEmail, auth.isSignedIn, router]);

  return { isChecking };
};
