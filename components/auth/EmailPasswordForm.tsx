import React from "react";
import { View } from "react-native";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { EmailPasswordFormProps } from "@/models/authModels";
import { spacing } from "@/assets/styles/theme";


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
    <View style={{ gap: spacing.sm }}>
      <AuthInput
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        disabled={loading}
        label="Correo electrónico"
        icon="email"
        iconPosition="left"
      />
      <AuthInput
        value={password}
        secureTextEntry
        label="Contraseña"
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
