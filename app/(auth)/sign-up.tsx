import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { TermsText } from "@/components/auth/TermsText";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignUp } from "@/hooks/useEmailAuth";
import { authStyles } from "@/assets/styles/auth.styles";

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
    <AuthLayout>
      <OAuthButtons onPress={handleOAuth} disabled={loading} />

      <AuthDivider />

      <EmailPasswordForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={() => handleSignUp(email, password)}
        submitLabel={loading ? "Creating account..." : "Continue"}
        loading={loading}
      />

      <View style={authStyles.linkContainer}>
        <Text style={loading && authStyles.disabledText}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity disabled={loading}>
          <Link href="/(auth)/sign-in" disabled={loading}>
            <Text style={[authStyles.link, loading && authStyles.disabledText]}>
              Sign in
            </Text>
          </Link>
        </TouchableOpacity>
      </View>

      <TermsText />
    </AuthLayout>
  );
}
