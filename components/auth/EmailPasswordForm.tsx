import React from "react";
import { View } from "react-native";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";

interface EmailPasswordFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  loading?: boolean;
}

export const EmailPasswordForm: React.FC<EmailPasswordFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  submitLabel,
  loading = false,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <AuthInput
        autoCapitalize="none"
        value={email}
        placeholder="Enter email"
        onChangeText={onEmailChange}
        keyboardType="email-address"
        disabled={loading}
      />
      <AuthInput
        value={password}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={onPasswordChange}
        disabled={loading}
      />
      <AuthButton onPress={onSubmit} disabled={loading}>
        {submitLabel}
      </AuthButton>
    </View>
  );
};
