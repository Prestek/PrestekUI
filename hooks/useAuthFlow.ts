import { useState, useEffect } from "react";
import { useSSO, useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { getItem } from "@/utils/secureStorage";

type OAuthProvider = "google" | "facebook" | "microsoft";
type OAuthStrategy = "oauth_google" | "oauth_facebook" | "oauth_microsoft";

export const useAuthFlow = () => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();
  const { getToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await getItem("role");
      setRole(storedRole);
    };
    loadRole();
  }, []);
  const handleOAuth = async (provider: OAuthProvider) => {
    setLoading(true);
    try {
      const strategyMap: Record<OAuthProvider, OAuthStrategy> = {
        google: "oauth_google",
        facebook: "oauth_facebook",
        microsoft: "oauth_microsoft",
      };

      const strategy = strategyMap[provider];
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });

        // Pequeño delay para asegurar que la sesión esté lista
        setTimeout(() => {
          if (role === "client") {
            router.replace("/(client)/(home)");
          } else if (role === "bank") {
            router.replace("/(bank)/(home)");
          } else {
            router.replace("/");
          }
        }, 100);
      }
    } catch (err) {
      console.error("OAuth error:", err);
      alert(`Failed to sign in with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return { handleOAuth, loading };
};
