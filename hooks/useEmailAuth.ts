import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export const useEmailSignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, setActive } = useSignIn();
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
        await setActive?.({ session: result.createdSessionId });
        // Pequeño delay para asegurar que la sesión esté lista
        setTimeout(() => {
          router.replace("/(home)");
        }, 100);
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
  const router = useRouter();

  const handleSignUp = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
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
        // Pequeño delay para asegurar que la sesión esté lista
        setTimeout(() => {
          router.replace("/(home)");
        }, 100);
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Verification failed. Please check your code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignUp,
    handleVerify,
    loading,
    pendingVerification,
  };
};
