import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";

export const TermsText: React.FC = () => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <Text style={styles.termsText}>
    By continuing, you agree to our terms of service and privacy policy
    </Text>
  );
};
