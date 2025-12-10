import { createLoanStyles } from "@/assets/styles/loan.styles";
import { AppText } from "@/components/AppText";
import { AuthButton, TermsText } from "@/components/auth";
import { router } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { useTheme, Checkbox } from "react-native-paper";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export const InformationRequired = () => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.informationContent}>
      <View style={styles.informationContentText}>
      <MaterialIcons name="warning-amber" size={30} color={theme.colors.error} />
        <AppText variant="headlineMedium" style={styles.requestTitle}>
          Información Requerida
        </AppText>
        <AppText variant="bodyLarge" style={styles.requestSubtitle}>
          Para solicitar un préstamo, primero necesitas completar tu información personal y escanear tu cédula de identidad.
        </AppText>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setChecked(!checked)}
            activeOpacity={0.7}
          >
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
              color={theme.colors.primary}
            />
            <AppText variant="bodyMedium" style={styles.checkboxText}>
              Aceptar los términos y condiciones
            </AppText>
          </TouchableOpacity>
        </View>

        <TermsText />
        <AuthButton
          disabled={!checked}
          children="Completar información"
          onPress={() => router.push("/(client)/(scan)")}
        />
      </View>
    </View>
  );
};
