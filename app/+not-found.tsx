import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function NotFoundScreen() {
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    console.log("NotFoundScreen - isSignedIn:", isSignedIn, "isLoaded:", isLoaded);
  }, [isSignedIn, isLoaded]);

  // Esperar a que Clerk cargue
  if (!isLoaded) {
    return null;
  }

  // Redirigir según el estado de autenticación
  if (isSignedIn) {
    return <Redirect href="/(home)" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
