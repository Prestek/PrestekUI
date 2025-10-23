import React from "react";
import { Text } from "react-native";
import { authStyles } from "@/assets/styles/auth.styles";

export const TermsText: React.FC = () => {
  return (
    <Text style={authStyles.termsText}>
      Al continuar, aceptas nuestros términos de servicio y política de
      privacidad
    </Text>
  );
};
