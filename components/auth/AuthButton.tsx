import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";

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
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled]}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{children}</Text>
    </TouchableOpacity>
  );
};
