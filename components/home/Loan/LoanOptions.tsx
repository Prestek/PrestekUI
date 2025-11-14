import { AppText } from "@/components/AppText";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import { Surface, useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation } from "@/components/Navigation";

export interface LoanOffer {
  id: string;
  bankName: string;
  bankLogo: string;
  interestRate: number;
  amount: number;
  installments: number;
  monthlyPayment: number;
  totalPayment: number;
  approvalProbability: number;
}

interface LoanOptionsProps {
  offers: LoanOffer[];
  requestedAmount: string;
  requestedInstallments: string;
  onSelectOffer: (offer: LoanOffer) => void;
  onBack: () => void;
}

export const LoanOptions = ({
  offers,
  requestedAmount,
  requestedInstallments,
  onSelectOffer,
  onBack,
}: LoanOptionsProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);

  return (
    <Navigation header={true} headerChildren={
        <View style={styles.optionsHeader}>
          <AppText style={styles.optionsTitle}>Ofertas disponibles</AppText>
          <AppText style={styles.optionsSubtitle}>
            ${new Intl.NumberFormat("es-CO").format(parseInt(requestedAmount))} • {requestedInstallments} meses
          </AppText>
        </View>
      } 
      showElevated={true}>
    <View style={styles.container}>
      <ScrollView
        style={styles.optionsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsListContent}
      >
        <AppText style={styles.resultsCount}>
          Encontramos {offers.length} {offers.length === 1 ? "oferta" : "ofertas"} para ti
        </AppText>

        {offers.map((offer) => (
          <Surface key={offer.id} elevation={2} style={styles.offerCard}>
            <View style={styles.offerHeader}>
              <View style={styles.bankInfo}>
                <View style={styles.bankLogoContainer}>
                  <AppText style={styles.bankLogoText}>
                    {offer.bankName.substring(0, 2).toUpperCase()}
                  </AppText>
                </View>
                <View>
                  <AppText style={styles.bankName}>{offer.bankName}</AppText>
                  <View style={styles.approvalBadge}>
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={14}
                      color={theme.colors.primary}
                    />
                    <AppText style={styles.approvalText}>
                      {offer.approvalProbability}% probabilidad de aprobación
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.offerDetails}>
              <View style={styles.offerDetailRow}>
                <View style={styles.offerDetailItem}>
                  <AppText style={styles.offerDetailLabel}>Tasa de interés</AppText>
                  <AppText style={styles.offerDetailValue}>{offer.interestRate.toFixed(2)}% EA</AppText>
                </View>
                <View style={styles.offerDetailItem}>
                  <AppText style={styles.offerDetailLabel}>Monto aprobado</AppText>
                  <AppText style={styles.offerDetailValue}>
                    ${new Intl.NumberFormat("es-CO").format(offer.amount)}
                  </AppText>
                </View>
              </View>

              <View style={styles.offerDetailRow}>
                <View style={styles.offerDetailItem}>
                  <AppText style={styles.offerDetailLabel}>Cuota mensual</AppText>
                  <AppText style={styles.offerDetailValueHighlight}>
                    ${new Intl.NumberFormat("es-CO").format(offer.monthlyPayment)}
                  </AppText>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => onSelectOffer(offer)}
            >
              <AppText style={styles.detailButtonText}>Ver detalle</AppText>
              <MaterialCommunityIcons
                name="arrow-right"
                size={20}
                color={theme.colors.onPrimary}
              />
            </TouchableOpacity>
          </Surface>
        ))}
      </ScrollView>
    </View>
    </Navigation>
  );
};

