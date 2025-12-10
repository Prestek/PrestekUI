import { AppText } from "@/components/AppText";
import { View, ScrollView } from "react-native";
import { Avatar, Surface, useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation } from "@/components/Navigation";
import { AuthButton } from "@/components/auth";
import { spacing } from "@/assets/styles/theme";

interface LoanNoOffersProps {
  amount: string;
  installments: string;
}

export const LoanNoOffers = ({
  amount,
  installments,
}: LoanNoOffersProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);

  const formattedAmount = new Intl.NumberFormat("es-CO").format(parseInt(amount));

  return (
    <Navigation
      header={true}
      headerChildren={
        <AppText style={styles.optionsTitle}>Sin ofertas disponibles</AppText>
      }
      showElevated={true}
    >
      <View style={[styles.container, { paddingBottom: spacing.xl, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.md }]}>
          <View style={styles.noOffersIconContainer}>
            <Avatar.Icon style={styles.noOffersIcon} icon="credit-card-off-outline" size={100} color={theme.colors.onPrimary}  />
          </View>

          <AppText style={styles.noOffersTitle}>
            No encontramos ofertas para ti
          </AppText>
          
          <AppText style={styles.noOffersSubtitle}>
            En este momento no hay ofertas de crédito disponibles para el monto y plazo solicitado.
          </AppText>

          <View style={styles.noOffersTipsCard}>
            <View style={styles.noOffersTipsHeader}>
              <MaterialCommunityIcons
                name="lightbulb-outline"
                size={24}
                color={theme.colors.primary}
              />
              <AppText style={styles.noOffersTipsTitle}>Sugerencias</AppText>
            </View>
            
            <View style={styles.noOffersTipItem}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={18}
                color={theme.colors.primary}
              />
              <AppText style={styles.noOffersTipText}>
                Intenta con un monto menor
              </AppText>
            </View>
            
            <View style={styles.noOffersTipItem}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={18}
                color={theme.colors.primary}
              />
              <AppText style={styles.noOffersTipText}>
                Considera un plazo más largo
              </AppText>
            </View>
            
            <View style={styles.noOffersTipItem}>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={18}
                color={theme.colors.primary}
              />
              <AppText style={styles.noOffersTipText}>
                Verifica que tu información financiera esté actualizada
              </AppText>
            </View>
          </View>
      </View>
    </Navigation>
  );
};
