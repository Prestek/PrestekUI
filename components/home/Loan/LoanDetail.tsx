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
      <AppText style={styles.optionsTitle}>Offer details</AppText>
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
              {offer.approvalProbability}% approval probability
            </AppText>
          </View>
        </View>

        <View style={styles.detailSummaryCard}>
          <AppText style={styles.detailSectionTitle}>Credit summary</AppText>
          
          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabel}>Approved amount</AppText>
            <AppText style={styles.detailSummaryValue}>
              ${new Intl.NumberFormat("es-CO").format(offer.amount)}
            </AppText>
          </View>

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabel}>Installments</AppText>
            <AppText style={styles.detailSummaryValue}>{offer.installments} months</AppText>
          </View>

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabel}>Interest rate</AppText>
            <AppText style={styles.detailSummaryValue}>{offer.interestRate}% EA</AppText>
          </View>

          <View style={styles.detailDivider} />

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabelBold}>Monthly payment</AppText>
            <AppText style={styles.detailSummaryValueHighlight}>
              ${new Intl.NumberFormat("es-CO").format(offer.monthlyPayment)}
            </AppText>
          </View>

          <View style={styles.detailSummaryRow}>
            <AppText style={styles.detailSummaryLabelBold}>Total to pay</AppText>
            <AppText style={styles.detailSummaryLabelBold}>
              ${new Intl.NumberFormat("es-CO").format(offer.totalPayment)}
            </AppText>
          </View>
        </View>

        <View style={styles.detailSummaryCard}>
          <AppText style={styles.detailSectionTitle}>Monthly payment breakdown</AppText>
          
          <View style={styles.detailBreakdownItem}>
            <View style={styles.detailBreakdownIconContainer}>
              <MaterialCommunityIcons name="cash" size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.detailBreakdownContent}>
              <AppText style={styles.detailBreakdownLabel}>Capital amount</AppText>
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
              <AppText style={styles.detailBreakdownLabel}>Interests</AppText>
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
          Accept offer
        </AuthButton>
        </View>
    </ScrollView>
    </View>
    </Navigation>
  );
};

