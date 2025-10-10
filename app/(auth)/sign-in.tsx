import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { TermsText } from "@/components/auth/TermsText";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignIn } from "@/hooks/useEmailAuth";
import { authStyles } from "@/assets/styles/auth.styles";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleOAuth, loading: oauthLoading } = useAuthFlow();
  const { handleSignIn, loading: emailLoading } = useEmailSignIn();

  const loading = oauthLoading || emailLoading;

  return (
    <AuthLayout>
      <OAuthButtons onPress={handleOAuth} disabled={loading} />

      <AuthDivider />

      <EmailPasswordForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={() => handleSignIn(email, password)}
        submitLabel={loading ? "Signing in..." : "Continue"}
        loading={loading}
      />

      <View style={authStyles.linkContainer}>
        <Text style={loading && authStyles.disabledText}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity disabled={loading}>
          <Link href="/(auth)/sign-up" disabled={loading}>
            <Text style={[authStyles.link, loading && authStyles.disabledText]}>
              Sign up
            </Text>
          </Link>
        </TouchableOpacity>
      </View>

      <TermsText />
    </AuthLayout>
  );
}
