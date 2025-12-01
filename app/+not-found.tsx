import { getItem } from "@/utils/secureStorage";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function NotFoundScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [roleLoaded, setRoleLoaded] = useState(false);

  useEffect(() => {
    console.log("NotFoundScreen - isSignedIn:", isSignedIn, "isLoaded:", isLoaded);
    const loadRole = async () => {
      const storedRole = await getItem("role");
      setRole(storedRole);
      setRoleLoaded(true);
    };
    loadRole();
  }, [isSignedIn, isLoaded]);


  // Esperar a que Clerk cargue
  if (!isLoaded || !roleLoaded) {
    return null;
  }

  // Redirigir según el estado de autenticación
  if (isSignedIn && roleLoaded && role) {
    if (role === "client") {
      return <Redirect href="/(client)/(home)" />;
    } else if (role === "bank") {
      return <Redirect href="/(bank)/(home)" />;
    } else {
      return <Redirect href="/" />;
    }
  }

  return <Redirect href="/(auth)/role" />;
}
