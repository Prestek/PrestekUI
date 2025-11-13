import React, { useState } from "react";
import { View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { EmailPasswordForm } from "@/components/auth/EmailPasswordForm";
import { TermsText } from "@/components/auth/TermsText";
import { AuthLink } from "@/components/auth/AuthLink";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useEmailSignIn } from "@/hooks/useEmailAuth";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleOAuth, loading: oauthLoading } = useAuthFlow();
  const { handleSignIn, loading: emailLoading } = useEmailSignIn();

  const loading = oauthLoading || emailLoading;

  return (
    <AuthLayout>
      <View style={{ width: "100%" }}>
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
      </View>
      <TermsText />
    </AuthLayout>
  );
}

