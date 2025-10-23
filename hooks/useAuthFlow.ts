import { useState } from "react";
import { useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

type OAuthProvider = "google" | "facebook" | "microsoft";
type OAuthStrategy = "oauth_google" | "oauth_facebook" | "oauth_microsoft";

export const useAuthFlow = () => {
  const [loading, setLoading] = useState(false);
  const { startSSOFlow } = useSSO();
  const router = useRouter();

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
          router.replace("/");
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
