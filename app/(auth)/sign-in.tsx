import React, { useEffect, useMemo, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { TermsText } from "@/components/auth/TermsText";
import { AuthLink } from "@/components/auth/AuthLink";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignIn } from "@/hooks/useEmailAuth";
import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { getAppTheme, getBankTheme } from "@/assets/themes/paperTheme";
import { getItem } from "@/utils/secureStorage";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);

  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const { handleOAuth, loading: oauthLoading } = useAuthFlow();
  const { handleSignIn, loading: emailLoading } = useEmailSignIn();

  const loading = oauthLoading || emailLoading;

  useEffect(() => {
    const paramRole = typeof params.role === "string" ? params.role : null;
    if (paramRole) {
      setRole(paramRole);
      return;
    }
  }, [params.role]);

  const theme = useMemo(
    () => (role === "bank" ? getBankTheme(colorScheme) : getAppTheme(colorScheme)),
    [role, colorScheme]
  );

  return (
    <PaperProvider theme={theme}>
      <AuthLayout>
        <EmailPasswordForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={() => handleSignIn(email, password)}
          submitLabel={loading ? "Signing in..." : "Continue"}
          loading={loading}
        />
        <AuthDivider />
        <OAuthButtons onPress={handleOAuth} disabled={loading} />
        <AuthLink href="/(auth)/sign-up" text="Sign up" disabled={loading} />
      </AuthLayout>
    </PaperProvider>
  );
}
