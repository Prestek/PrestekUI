import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { authStyles } from "@/assets/styles/auth.styles";

interface AuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  onPress,
  disabled = false,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[authStyles.button, disabled && authStyles.buttonDisabled]}
      disabled={disabled}
    >
      <Text style={authStyles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};
