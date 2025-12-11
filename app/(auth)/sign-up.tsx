import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { AuthLink } from "@/components/auth/AuthLink";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignUp } from "@/hooks/useEmailAuth";
import { EmailVerificationStep } from "@/components/auth/EmailVerification";
import { MD3Theme, PaperProvider } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/hooks/useTheme";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const params = useLocalSearchParams();
  const theme = useTheme(params.role as string);
  const { handleOAuth, loading: oauthLoading } = useAuthFlow();
  const {
    handleSignUp,
    handleVerify,
    loading: emailLoading,
    pendingVerification,
  } = useEmailSignUp();

  const loading = oauthLoading || emailLoading;

  // Sign up screen
  return (
    <PaperProvider theme={theme as MD3Theme}>
      {pendingVerification ? (
        <EmailVerificationStep
          email={email}
          code={code}
          setCode={setCode}
          loading={loading}
          handleVerify={handleVerify}
        />
      ) : (
        <AuthLayout introTitle="Crea tu cuenta">
          <EmailPasswordForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={() => handleSignUp(email, password)}
            submitLabel={loading ? "Creando cuenta..." : "Continuar"}
            loading={loading}
          />

          <AuthDivider />

          <OAuthButtons onPress={handleOAuth} disabled={loading} />

          <AuthLink
            href={{
              pathname: "/(auth)/sign-in",
              params: { role: params.role as string },
            }}
            text="Iniciar sesión"
            disabled={loading}
            title="¿Ya tienes una cuenta?"
          />
        </AuthLayout>
      )}
    </PaperProvider>
  );
}
