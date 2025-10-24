import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";

interface AuthInputProps extends TextInputProps {
  disabled?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  disabled = false,
  style,
  ...props
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <TextInput
      style={[styles.input, disabled && styles.inputDisabled, style]}
      editable={!disabled}
      placeholderTextColor={theme.colors.onSurfaceVariant}
      {...props}
    />
  );
};
