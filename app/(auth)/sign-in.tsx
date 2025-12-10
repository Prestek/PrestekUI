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
import { MD3Theme, PaperProvider } from "react-native-paper";
import { useTheme } from "@/hooks/useTheme";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const params = useLocalSearchParams();
  const theme = useTheme(params.role as string);
  const { handleOAuth, loading: oauthLoading } = useAuthFlow();
  const { handleSignIn, loading: emailLoading } = useEmailSignIn();
  const loading = oauthLoading || emailLoading;

  return (
    <PaperProvider theme={theme as MD3Theme}>
      <AuthLayout>
        <EmailPasswordForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={() => handleSignIn(email, password)}
          submitLabel={loading ? "Iniciando sesión..." : "Continuar"}
          loading={loading}
        />
        <AuthDivider />
        <OAuthButtons onPress={handleOAuth} disabled={loading} />
        <AuthLink href={{
          pathname: "/(auth)/sign-up",
          params: { role: params.role as string },
        }} text="Registrarme" disabled={loading} />
      </AuthLayout>
    </PaperProvider>
  );
}
