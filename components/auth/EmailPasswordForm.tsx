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
        value={email}
        placeholder="Enter your email..."
        onChangeText={onEmailChange}
        keyboardType="email-address"
        disabled={loading}
        label="Email Address"
        icon="email"
        iconPosition="left"
      />
      <AuthInput
        value={password}
        placeholder="Enter your password..."
        secureTextEntry
        label="Password"
        onChangeText={onPasswordChange}
        disabled={loading}
        icon="eye"
        iconPosition="right"
      />
      <AuthButton onPress={onSubmit} disabled={loading}>
        {submitLabel}
      </AuthButton>
    </View>
  );
};
