import { AppText } from "@/components/AppText";
import { View, StyleSheet, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useState } from "react";
import { AuthButton, AuthInput } from "@/components/auth";
import { formatAmount } from "@/utils/masks";
import Slider from "@react-native-community/slider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { spacing } from "@/assets/styles/theme";

interface LoanRequestProps {
  onSubmit: (amount: string, installments: string) => void;
  disabled: boolean;
}

const MIN_INSTALLMENTS = 6;
const MAX_INSTALLMENTS = 60;

export const LoanRequest = ({ onSubmit, disabled }: LoanRequestProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState(6);

  const handleSubmit = () => {
    if (
      Number.parseInt(amount) < 1000000 ||
      Number.parseInt(amount) > 50000000
    ) {
      Alert.alert(
        "Monto inválido",
        "El monto del préstamo debe estar entre $1,000,000 y $50,000,000"
      );
      return;
    }
    if (amount && installments) {
      onSubmit(amount, installments.toString());
    }
  };

  return (
    <View style={styles.loanContainer}>
      <View style={styles.requestContainer}>
        <AppText style={styles.requestTitle}>Solicita tu préstamo</AppText>
        <AppText style={styles.requestSubtitle}>
          Completa la información para encontrar las mejores ofertas
        </AppText>

        <View style={styles.formContainer}>
          <AuthInput
            onChangeText={(text) => formatAmount(text, setAmount)}
            keyboardType="numeric"
            icon="cash-plus"
            iconPosition="left"
            label="Monto del préstamo"
            value={
              amount
                ? new Intl.NumberFormat("es-CO").format(Number.parseInt(amount))
                : ""
            }
            disabled={disabled}
          />

          <View style={sliderStyles.sliderContainer}>
            <View style={sliderStyles.labelRow}>
              <MaterialCommunityIcons
                name="calendar-month"
                size={20}
                color={theme.colors.primary}
              />
              <AppText
                style={[sliderStyles.label, { color: theme.colors.primary }]}
              >
                Número de cuotas
              </AppText>
            </View>

            <View
              style={[
                sliderStyles.valueContainer,
                {
                  backgroundColor: theme.colors.surfaceVariant,
                  borderWidth: 1,
                  borderColor: theme.colors.outline,
                },
              ]}
            >
              <AppText
                style={[
                  sliderStyles.valueText,
                  { color: theme.colors.primary },
                ]}
              >
                {installments}
              </AppText>
              <AppText
                style={[
                  sliderStyles.valueLabel,
                  { color: theme.colors.onPrimaryContainer },
                ]}
              >
                meses
              </AppText>
            </View>

            <Slider
              style={sliderStyles.slider}
              minimumValue={MIN_INSTALLMENTS}
              maximumValue={MAX_INSTALLMENTS}
              step={1}
              value={installments}
              onValueChange={(value) => setInstallments(value)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.outline}
              thumbTintColor={theme.colors.primary}
              disabled={disabled}
            />

            <View style={sliderStyles.rangeLabels}>
              <AppText
                style={[
                  sliderStyles.rangeText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {MIN_INSTALLMENTS} meses
              </AppText>
              <AppText
                style={[
                  sliderStyles.rangeText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {MAX_INSTALLMENTS} meses
              </AppText>
            </View>
          </View>
        </View>
      </View>

      <AuthButton onPress={handleSubmit} disabled={!amount || !installments}>
        Buscar ofertas
      </AuthButton>
    </View>
  );
};

const sliderStyles = StyleSheet.create({
  sliderContainer: {
    marginTop: spacing.sm,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  valueText: {
    fontSize: 36,
    fontWeight: "bold",
  },
  valueLabel: {
    fontSize: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -spacing.xs,
  },
  rangeText: {
    fontSize: 12,
  },
});
