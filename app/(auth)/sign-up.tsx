import React, { useState } from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { TermsText } from "@/components/auth/TermsText";
import { AuthLink } from "@/components/auth/AuthLink";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignUp } from "@/hooks/useEmailAuth";

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
    return (
      <AuthLayout
        title="Verify your email"
        subtitle={`We sent a verification code to ${email}`}
      >
        <AuthInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="number-pad"
          autoFocus
          maxLength={6}
        />
        <AuthButton onPress={() => handleVerify(code)} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </AuthButton>
      </AuthLayout>
    );
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
