import React from "react";
import { TextInput, TextInputProps } from "react-native";
import { authStyles } from "@/assets/styles/auth.styles";

interface AuthInputProps extends TextInputProps {
  disabled?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  disabled = false,
  style,
  ...props
}) => {
  return (
    <TextInput
      style={[authStyles.input, disabled && authStyles.inputDisabled, style]}
      editable={!disabled}
      placeholderTextColor="#999"
      {...props}
    />
  );
};
