import { AppText } from "@/components/AppText";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Navigation } from "@/components/Navigation";
import { AuthButton } from "@/components/auth";
import { spacing } from "@/assets/styles/theme";
import { LoanConfirmationProps } from "@/models/creditModels";

export const LoanConfirmation = ({
  amount,
  installments,
  onConfirm,
  loading,
}: LoanConfirmationProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);

  const formattedAmount = new Intl.NumberFormat("es-CO").format(
    parseInt(amount)
  );

  return (
    <Navigation
      header={true}
      headerChildren={
        <AppText style={styles.optionsTitle}>Confirmar solicitud</AppText>
      }
      showElevated={true}
    >
      <View style={[styles.informationContent, { paddingBottom: spacing.xl }]}>
        <View style={styles.confirmationIconContainer}>
          <MaterialIcons
            name="request-quote"
            size={80}
            color={theme.colors.primary}
          />
        </View>

        <AppText style={styles.confirmationTitle}>
          Resumen de tu solicitud
        </AppText>
        <AppText style={styles.confirmationSubtitle}>
          Revisa los datos antes de continuar
        </AppText>

        <View style={styles.detailSummaryCard}>
          <View style={styles.detailSummaryRow}>
            <View style={styles.confirmationItemRow}>
              <MaterialIcons
                name="money"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.confirmationItemContent}>
                <AppText style={styles.detailSummaryLabel}>
                  Monto solicitado
                </AppText>
                <AppText style={styles.detailSummaryValueHighlight}>
                  ${formattedAmount}
                </AppText>
              </View>
            </View>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailSummaryRow}>
            <View style={styles.confirmationItemRow}>
              <MaterialIcons
                name="calendar-month"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.confirmationItemContent}>
                <AppText style={styles.detailSummaryLabel}>Plazo</AppText>
                <AppText style={styles.detailSummaryValueHighlight}>
                  {installments} meses
                </AppText>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <MaterialIcons
            name="info-outline"
            size={24}
            color={theme.colors.primary}
          />
          <AppText style={styles.infoText}>
            Al confirmar, buscaremos las mejores ofertas de crédito disponibles
            para ti en múltiples entidades financieras.
          </AppText>
        </View>

        <View style={styles.detailFooter}>
          <AuthButton onPress={onConfirm} disabled={loading}>
            {loading ? "Buscando ofertas..." : "Confirmar y buscar ofertas"}
          </AuthButton>
        </View>
      </View>
    </Navigation>
  );
};
