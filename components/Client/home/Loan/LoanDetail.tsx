import { AppText } from "@/components/AppText";
import { View, ScrollView } from "react-native";
import { Divider, Surface, useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BankOffer } from "@/models/creditModels";
import { Navigation } from "@/components/Navigation";
import { AuthButton } from "@/components/auth";

interface LoanDetailProps {
  offer: BankOffer;
  requestedAmount: string;
  requestedInstallments: string;
  onAccept: (offer: BankOffer) => void;
  onBack: () => void;
}

export const LoanDetail = ({
  offer,
  requestedAmount,
  requestedInstallments,
  onAccept,
  onBack,
}: LoanDetailProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);

  const { analysis, bankName, isRecommended } = offer;

  return (
    <Navigation
      header={true}
      headerChildren={
        <AppText style={styles.optionsTitle}>Detalles de la oferta</AppText>
      }
      showElevated={true}
      backAction={onBack}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.detailContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailContentContainer}
        >
          {/* Header del banco */}
          <View style={styles.detailBankCard}>
            {isRecommended && (
              <View style={styles.detailRecommendedBadge}>
                <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                <AppText style={styles.detailRecommendedText}>
                  Mejor opción
                </AppText>
              </View>
            )}
            <View
              style={[
                styles.detailBankLogoContainer,
                isRecommended && styles.detailBankLogoRecommended,
              ]}
            >
              <AppText style={styles.detailBankLogoText}>
                {bankName.substring(0, 2).toUpperCase()}
              </AppText>
            </View>
            <AppText style={styles.detailBankName}>{bankName}</AppText>
            <View style={styles.detailApprovalBadge}>
              <MaterialCommunityIcons
                name="percent"
                size={16}
                color={theme.colors.primary}
              />
              <AppText style={styles.detailApprovalText}>
                {(analysis.paymentToIncomeRatio * 100).toFixed(1)}% de tus
                ingresos mensuales
              </AppText>
            </View>
          </View>

          {/* Resumen financiero */}
          <View style={styles.detailSummaryCard}>
            <AppText style={styles.detailSectionTitle}>
              Resumen financiero
            </AppText>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>
                Monto solicitado
              </AppText>
              <AppText style={styles.detailSummaryValue}>
                ${new Intl.NumberFormat("es-CO").format(parseInt(requestedAmount))}
              </AppText>
            </View>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>Plazo</AppText>
              <AppText style={styles.detailSummaryValue}>
                {requestedInstallments} meses
              </AppText>
            </View>

            <Divider style={styles.detailDivider} />

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabelBold}>
                Cuota mensual
              </AppText>
              <AppText style={styles.detailSummaryValueHighlight}>
                ${new Intl.NumberFormat("es-CO").format(analysis.monthlyPaymentAvg)}
              </AppText>
            </View>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabelBold}>
                Total intereses
              </AppText>
              <AppText style={styles.detailSummaryLabelBold}>
                ${new Intl.NumberFormat("es-CO").format(analysis.totalInterest)}
              </AppText>
            </View>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabelBold}>
                Costo total
              </AppText>
              <AppText style={styles.detailSummaryLabelBold}>
                ${new Intl.NumberFormat("es-CO").format(analysis.totalCost)}
              </AppText>
            </View>
          </View>

          {/* Aspectos positivos */}
          <View style={[styles.detailAspectsCard, { backgroundColor: 'rgba(28, 196, 90, 0.05)' }]}>
            <View style={styles.prosConsHeader}>
              <MaterialCommunityIcons
                name="thumb-up"
                size={24}
                color="#4CAF50"
              />
              <AppText style={[styles.detailSectionTitle, { color: "#4CAF50" }]}>
                Aspectos positivos
              </AppText>
            </View>

            {analysis.positives.map((positive, index) => (
              <View key={index} style={styles.prosConsItem}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={20}
                  color="#4CAF50"
                />
                <AppText style={styles.prosConsText}>{positive}</AppText>
              </View>
            ))}
          </View>

          {/* Aspectos a considerar */}
          <View style={[styles.detailAspectsCard, { backgroundColor: 'rgba(245, 39, 39, 0.07)' }]}>
            <View style={styles.prosConsHeader}>
              <MaterialCommunityIcons
                name="alert-circle"
                size={24}
                color="rgb(192, 27, 27)"
              />
              <AppText style={[styles.detailSectionTitle, { color: "rgb(192, 27, 27)" }]}>
                Aspectos a considerar
              </AppText>
            </View>

            {analysis.negatives.map((negative, index) => (
              <View key={index} style={styles.prosConsItem}>
                <MaterialCommunityIcons
                  name="alert"
                  size={20}
                  color="rgb(192, 27, 27)"
                />
                <AppText style={styles.prosConsText}>{negative}</AppText>
              </View>
            ))}
          </View>

          <View style={styles.detailFooter}>
            <AuthButton onPress={() => onAccept(offer)} disabled={false}>
              Solicitar crédito
            </AuthButton>
          </View>
        </ScrollView>
      </View>
    </Navigation>
  );
};

