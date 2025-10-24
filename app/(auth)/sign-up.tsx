import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { TermsText } from "@/components/auth/TermsText";
import { AuthLink } from "@/components/auth/AuthLink";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignUp } from "@/hooks/useEmailAuth";
import { EmailVerificationStep } from "@/components/auth/EmailVerification";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const { handleOAuth, loading: oauthLoading } = useAuthFlow();
  const {
    handleSignUp,
    handleVerify,
    loading: emailLoading,
    pendingVerification,
  } = useEmailSignUp();

  const loading = oauthLoading || emailLoading;


  // Verification screen
  if (pendingVerification) {
    return <EmailVerificationStep email={email} code={code} setCode={setCode} loading={loading} handleVerify={handleVerify} />;
  }

  // Sign up screen
  return (
    <AuthLayout subtitle="Register to enjoy the best loans management platform">

      <EmailPasswordForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={() => handleSignUp(email, password)}
        submitLabel={loading ? "Creating account..." : "Continue"}
        loading={loading}
      />

      <AuthDivider />

      <OAuthButtons onPress={handleOAuth} disabled={loading} />

      <AuthLink href="/(auth)/sign-in" text="Sign in" disabled={loading} title="Already have an account?" />

      <TermsText />
    </AuthLayout>
  );
}
