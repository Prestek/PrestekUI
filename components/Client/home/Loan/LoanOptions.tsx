import { AppText } from "@/components/AppText";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Dialog, Portal, Surface, useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation } from "@/components/Navigation";
import { BankOffer, LoanOptionsProps } from "@/models/creditModels";
import { spacing } from "@/assets/styles/theme";
import { useState } from "react";

const BANK_NAMES: Record<string, string> = {
  bancolombia: "Bancolombia",
  davivienda: "Davivienda",
  coltefinanciera: "Coltefinanciera",
};

const getRiskColor = (risk: string, theme: any) => {
  switch (risk.toLowerCase()) {
    case "bajo":
      return "#4CAF50";
    case "medio":
      return "#FF9800";
    case "alto":
      return "#F44336";
    default:
      return theme.colors.primary;
  }
};

const getRiskIcon = (
  risk: string
): "shield-check" | "shield-alert" | "shield-remove" => {
  switch (risk.toLowerCase()) {
    case "bajo":
      return "shield-check";
    case "medio":
      return "shield-alert";
    case "alto":
      return "shield-remove";
    default:
      return "shield-check";
  }
};

export const LoanOptions = ({
  simulationResult,
  requestedAmount,
  requestedInstallments,
  onSelectOffer,
}: LoanOptionsProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  const { recommendation, analysis } = simulationResult;

  // Convertir el análisis a un array de ofertas ordenadas
  const bankOffers: BankOffer[] = Object.entries(analysis).map(
    ([bankKey, bankAnalysis]) => ({
      bankKey,
      bankName:
        BANK_NAMES[bankKey] ||
        bankKey.charAt(0).toUpperCase() + bankKey.slice(1),
      analysis: bankAnalysis,
      isRecommended:
        bankKey.toLowerCase() === recommendation.bestOption.toLowerCase(),
    })
  );

  // Ordenar para que la recomendada esté primero
  const sortedOffers = bankOffers.sort((a, b) => {
    if (a.isRecommended) return -1;
    if (b.isRecommended) return 1;
    return a.analysis.totalCost - b.analysis.totalCost;
  });

  return (
    <Navigation
      header={true}
      headerChildren={
        <View style={styles.optionsHeader}>
          <AppText style={styles.optionsTitle}>Ofertas disponibles</AppText>
          <AppText style={styles.optionsSubtitle}>
            $
            {new Intl.NumberFormat("es-CO").format(
              Number.parseInt(requestedAmount)
            )}{" "}
            • {requestedInstallments} meses
          </AppText>
        </View>
      }
      showElevated={true}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.optionsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.optionsListContent}
        >
          {/* Tarjeta de recomendación */}
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
              <AppText style={styles.recommendationTitle}>
                Nuestra recomendación
              </AppText>
            </View>
            <AppText style={styles.recommendationBank}>
              {recommendation.bestOption}
            </AppText>
            <AppText style={styles.recommendationReason}>
              {recommendation.reason}
            </AppText>
            <View style={styles.riskBadge}>
              <MaterialCommunityIcons
                name={getRiskIcon(recommendation.riskAssessment)}
                size={18}
                color={getRiskColor(recommendation.riskAssessment, theme)}
              />
              <AppText
                style={[
                  styles.riskText,
                  { color: getRiskColor(recommendation.riskAssessment, theme) },
                ]}
              >
                Riesgo {recommendation.riskAssessment}
              </AppText>
            </View>
            <Button
              icon="robot"
              mode="outlined"
              onPress={() => setShowAnalysisModal(true)}
              style={{ marginTop: spacing.md }}
            >
              Ver análisis de IA
            </Button>
          </View>

          <AppText style={styles.resultsCount}>
            {sortedOffers.length}{" "}
            {sortedOffers.length === 1
              ? "oferta encontrada"
              : "ofertas encontradas"}
          </AppText>

          {sortedOffers.map((offer) => (
            <Surface
              key={offer.bankKey}
              elevation={2}
              style={[
                styles.offerCard,
                offer.isRecommended && {
                  borderColor: "#FFD700",
                  borderWidth: 1,
                },
              ]}
            >
              {offer.isRecommended && (
                <View style={styles.recommendedBadge}>
                  <MaterialCommunityIcons
                    name="star"
                    size={14}
                    color="#FFD700"
                  />
                  <AppText style={styles.recommendedBadgeText}>
                    Mejor opción
                  </AppText>
                </View>
              )}

              <View style={styles.offerHeader}>
                <View style={styles.bankInfo}>
                  <View style={[styles.bankLogoContainer]}>
                    <AppText style={styles.bankLogoText}>
                      {offer.bankName.substring(0, 2).toUpperCase()}
                    </AppText>
                  </View>
                  <View>
                    <AppText style={styles.bankName}>{offer.bankName}</AppText>
                    <View style={styles.approvalBadge}>
                      <MaterialCommunityIcons
                        name="percent"
                        size={14}
                        color={theme.colors.primary}
                      />
                      <AppText style={styles.approvalText}>
                        {(offer.analysis.paymentToIncomeRatio * 100).toFixed(1)}
                        % de tus ingresos
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.offerDetails}>
                <View style={styles.offerDetailRow}>
                  <View style={styles.offerDetailItem}>
                    <AppText style={styles.offerDetailLabel}>
                      Cuota mensual
                    </AppText>
                    <AppText style={styles.offerDetailValueHighlight}>
                      $
                      {new Intl.NumberFormat("es-CO").format(
                        offer.analysis.monthlyPaymentAvg
                      )}
                    </AppText>
                  </View>
                  <View style={styles.offerDetailItem}>
                    <AppText style={styles.offerDetailLabel}>
                      Costo total
                    </AppText>
                    <AppText style={styles.offerDetailValue}>
                      $
                      {new Intl.NumberFormat("es-CO").format(
                        offer.analysis.totalCost
                      )}
                    </AppText>
                  </View>
                </View>

                <View style={styles.offerDetailRow}>
                  <View style={styles.offerDetailItem}>
                    <AppText style={styles.offerDetailLabel}>
                      Total intereses
                    </AppText>
                    <AppText style={styles.offerDetailValue}>
                      $
                      {new Intl.NumberFormat("es-CO").format(
                        offer.analysis.totalInterest
                      )}
                    </AppText>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.detailButton]}
                onPress={() => onSelectOffer(offer)}
              >
                <AppText style={styles.detailButtonText}>Ver detalles</AppText>
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

      {/* Modal de Análisis de IA */}
      <Portal>
        <Dialog
          visible={showAnalysisModal}
          onDismiss={() => setShowAnalysisModal(false)}
          style={styles.dialogContainer}
        >
          <Dialog.Title style={styles.dialogTitle}>
            <View style={styles.modalHeaderRow}>
              <MaterialCommunityIcons
                name="robot"
                size={28}
                color={theme.colors.primary}
              />
              <AppText style={styles.modalTitle}>Análisis de IA</AppText>
            </View>
          </Dialog.Title>

          <Dialog.ScrollArea style={styles.dialogScrollArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Mejor opción */}
              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <MaterialCommunityIcons
                    name="star"
                    size={20}
                    color="#FFD700"
                  />
                  <AppText style={styles.modalSectionTitle}>
                    Mejor opción
                  </AppText>
                </View>
                <AppText style={styles.modalBestOption}>
                  {recommendation.bestOption}
                </AppText>
                <AppText style={styles.modalReason}>
                  {recommendation.reason}
                </AppText>
              </View>

              {/* Evaluación de riesgo */}
              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <MaterialCommunityIcons
                    name={getRiskIcon(recommendation.riskAssessment)}
                    size={20}
                    color={getRiskColor(recommendation.riskAssessment, theme)}
                  />
                  <AppText style={styles.modalSectionTitle}>
                    Evaluación de riesgo
                  </AppText>
                </View>
                <View
                  style={[
                    styles.modalRiskBadge,
                    {
                      backgroundColor:
                        getRiskColor(recommendation.riskAssessment, theme) +
                        "20",
                    },
                  ]}
                >
                  <AppText
                    style={[
                      styles.modalRiskText,
                      {
                        color: getRiskColor(
                          recommendation.riskAssessment,
                          theme
                        ),
                      },
                    ]}
                  >
                    Riesgo {recommendation.riskAssessment.toUpperCase()}
                  </AppText>
                </View>
              </View>

              {/* Resumen detallado */}
              <View style={styles.modalSection}>
                <View style={styles.modalSectionHeader}>
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color={theme.colors.primary}
                  />
                  <AppText style={styles.modalSectionTitle}>
                    Resumen detallado
                  </AppText>
                </View>
                <AppText style={styles.modalSummaryText}>
                  {recommendation.summary}
                </AppText>
              </View>
            </ScrollView>
          </Dialog.ScrollArea>

          <Dialog.Actions>
            <Button onPress={() => setShowAnalysisModal(false)}>
              Entendido
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Navigation>
  );
};
