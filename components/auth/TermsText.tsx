import React from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AppText } from "../AppText";

export const TermsText: React.FC = () => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <AppText variant="bodySmall" style={styles.termsText}>
      Al continuar, autorizas el{" "}
      <AppText variant="bodySmall" style={styles.termsLink}>
        tratamiento de tus datos personales
      </AppText>{" "}
      según nuestra{" "}
      <AppText variant="bodySmall" style={styles.termsLink}>
        política de privacidad
      </AppText>
      . Consultar tu historial de crédito es un paso indispensable en tu proceso de aprobación.
    </AppText>

  );
};
