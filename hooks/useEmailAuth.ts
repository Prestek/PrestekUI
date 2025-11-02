import { useEffect, useState, useRef } from "react";
import { useSignIn, useSignUp, useAuth, useUser } from "@clerk/clerk-expo";
import { router, useRouter } from "expo-router";
import { checkUserExists, createUserProfile } from "../services/userAPI";

export const useEmailSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
  const { getToken } = useAuth();
  const router = useRouter();

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
      alert("Please enter the verification code");
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
      alert("Verification failed. Please check your code and try again.");
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
    let userId = 1;
    if (!userId) {
      throw new Error("No user ID available");
    }

    try {
      const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";

      await createUserProfile({
        id: userId,
        email: userEmail,
        ...profileData,
        creditScore: 600,
      });
      userId = userId + 1;
      // Solo redirigir al home después de completar el perfil
      router.replace("/(home)");
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
  const [hasChecked, setHasChecked] = useState(false);
  const hasExecutedRef = useRef(false);

  useEffect(() => {
    // Solo ejecutar una vez por email
    if (!userEmail || !auth.isSignedIn || hasExecutedRef.current) {
      return;
    }

    hasExecutedRef.current = true;

    const checkAndRedirect = async () => {
      console.log("Starting user existence check for:", userEmail);
      setIsChecking(true);

      try {
        const exists = await checkUserExists(userEmail);
        console.log("User exists result:", exists);

        if (!exists) {
          console.log("User does not exist, redirecting to complete-profile");
          const target = "/(auth)/scan";
          router.replace(target);
        } else {
          console.log("User exists, staying on current page");
        }

        setHasChecked(true);
      } catch (error) {
        console.error("Error checking user existence:", error);
        setHasChecked(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkAndRedirect();
  }, [userEmail, auth.isSignedIn, router]);

  return { isChecking, hasChecked };
};
