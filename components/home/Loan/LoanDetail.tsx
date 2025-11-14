import { AppText } from "@/components/AppText";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LoanOffer } from "./LoanOptions";
import { Navigation } from "@/components/Navigation";
import { AuthButton } from "@/components/auth";

interface LoanDetailProps {
  offer: LoanOffer;
  onAccept: (offer: LoanOffer) => void;
  onBack: () => void;
}

export const LoanDetail = ({ offer, onAccept, onBack }: LoanDetailProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);

  const monthlyPaymentBreakdown = {
    capital: offer.monthlyPayment * 0.7,
    interest: offer.monthlyPayment * 0.3,
  };

  return (
    <Navigation header={true} headerChildren={
      <AppText style={styles.optionsTitle}>Detalle de oferta</AppText>
    } 
    showElevated={true}>
    <View style={styles.container}>
      <ScrollView
        style={styles.detailContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.detailContentContainer}
      >
        <View style={styles.detailBankCard}>
          <View style={styles.detailBankLogoContainer}>
            <AppText style={styles.detailBankLogoText}>
              {offer.bankName.substring(0, 2).toUpperCase()}
            </AppText>
          </View>
          <AppText style={styles.detailBankName}>{offer.bankName}</AppText>
          <View style={styles.detailApprovalBadge}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={theme.colors.primary}
            />
            <AppText style={styles.detailApprovalText}>
              {offer.approvalProbability}% de aprobación
            </AppText>
          </View>
        </View>

        <View style={styles.detailSummaryCard}>
          <AppText style={styles.detailSectionTitle}>Resumen del crédito</AppText>
          
          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabel}>Monto aprobado</AppText>
            <AppText style={styles.detailSummaryValue}>
              ${new Intl.NumberFormat("es-CO").format(offer.amount)}
            </AppText>
          </View>

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabel}>Plazo</AppText>
            <AppText style={styles.detailSummaryValue}>{offer.installments} meses</AppText>
          </View>

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabel}>Tasa de interés</AppText>
            <AppText style={styles.detailSummaryValue}>{offer.interestRate}% EA</AppText>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabelBold}>Cuota mensual</AppText>
            <AppText style={styles.detailSummaryValueHighlight}>
              ${new Intl.NumberFormat("es-CO").format(offer.monthlyPayment)}
            </AppText>
          </View>

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabelBold}>Total a pagar</AppText>
            <AppText style={styles.detailSummaryLabelBold}>
              ${new Intl.NumberFormat("es-CO").format(offer.totalPayment)}
            </AppText>
          </View>
        </View>

        <View style={styles.detailSummaryCard}>
          <AppText style={styles.detailSectionTitle}>Desglose de cuota mensual</AppText>
          
          <View style={styles.detailBreakdownItem}>
            <View style={styles.detailBreakdownIconContainer}>
              <MaterialCommunityIcons name="cash" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.detailBreakdownContent}>
              <AppText style={styles.detailBreakdownLabel}>Capital</AppText>
              <AppText style={styles.detailBreakdownValue}>
                ${new Intl.NumberFormat("es-CO").format(monthlyPaymentBreakdown.capital)}
              </AppText>
            </View>
          </View>

          <View style={styles.detailBreakdownItem}>
            <View style={styles.detailBreakdownIconContainer}>
              <MaterialCommunityIcons name="percent" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.detailBreakdownContent}>
              <AppText style={styles.detailBreakdownLabel}>Intereses</AppText>
              <AppText style={styles.detailBreakdownValue}>
                ${new Intl.NumberFormat("es-CO").format(monthlyPaymentBreakdown.interest)}
              </AppText>
            </View>
          </View>
        </View>
      <View style={styles.detailFooter}>
        <AuthButton
          onPress={() => onAccept(offer)}
          disabled={false}
        >
          Aceptar oferta
        </AuthButton>
        </View>
    </ScrollView>
    </View>
    </Navigation>
  );
};

