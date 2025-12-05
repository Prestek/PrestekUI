import { AppText } from "@/components/AppText";
import { View, ScrollView } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation } from "@/components/Navigation";
import { AuthButton } from "@/components/auth";
import { OfferResponse } from "@/models/creditModels";
import { getBackgroundColorByStatus, getColorByStatus } from "@/models/functions/color";
import { LoanRequestStatus, LoanRequestStatusLabel } from "@/models/enums/Request";

interface LoanSuccessProps {
  offerResult: OfferResponse;
  requestedAmount: string;
  requestedInstallments: string;
  onFinish: () => void;
}

const formatDate = (dateArray: number[]): string => {
  if (!dateArray || dateArray.length < 3) return "N/A";
  const [year, month, day] = dateArray;
  return `${day}/${month}/${year}`;
};


export const LoanSuccess = ({
  offerResult,
  requestedAmount,
  requestedInstallments,
  onFinish,
}: LoanSuccessProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);

  const { application, creditScore, message } = offerResult;

  return (
    <Navigation
      header={true}
      headerChildren={
        <AppText style={styles.optionsTitle}>Solicitud enviada</AppText>
      }
      showElevated={true}
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.detailContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.detailContentContainer}
        >
          {/* Icono de éxito */}
          <View style={styles.successIconContainer}>
            <View style={styles.successIconCircle}>
              <MaterialCommunityIcons
                name="check"
                size={60}
                color="#4CAF50"
              />
            </View>
          </View>

          <AppText style={styles.successTitle}>
            ¡Solicitud enviada exitosamente!
          </AppText>

          {/* Estado de la solicitud */}
          <View style={[
            styles.statusBadge,
            { backgroundColor: getBackgroundColorByStatus(application.status) + "20" }
          ]}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={20}
              color={getColorByStatus(application.status)}
            />
            <AppText style={[
              styles.statusText,
              { color: getColorByStatus(application.status) }
            ]}>
              {LoanRequestStatusLabel[application.status] || application.status}
            </AppText>
          </View>

          {/* Detalles de la solicitud */}
          <View style={styles.detailSummaryCard}>
            <AppText style={styles.detailSectionTitle}>
              Detalles de la solicitud
            </AppText>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>
                Número de solicitud
              </AppText>
              <AppText style={styles.detailSummaryValueHighlight}>
                #{application.id}
              </AppText>
            </View>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>
                Entidad financiera
              </AppText>
              <AppText style={styles.detailSummaryValue}>
                {application.entity}
              </AppText>
            </View>

            <Divider style={styles.detailDivider} />

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>
                Monto solicitado
              </AppText>
              <AppText style={styles.detailSummaryValue}>
                ${new Intl.NumberFormat("es-CO").format(application.amount)}
              </AppText>
            </View>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>
                Plazo
              </AppText>
              <AppText style={styles.detailSummaryValue}>
                {requestedInstallments} meses
              </AppText>
            </View>

            <View style={styles.detailSummaryRow}>
              <AppText style={styles.detailSummaryLabel}>
                Fecha de solicitud
              </AppText>
              <AppText style={styles.detailSummaryValue}>
                {formatDate(application.applicationDate)}
              </AppText>
            </View>
          </View>

          {/* Score crediticio */}
          <View style={styles.creditScoreCard}>
            <View style={styles.creditScoreHeader}>
              <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={theme.colors.primary}
              />
              <AppText style={styles.creditScoreTitle}>
                Tu score crediticio
              </AppText>
            </View>
            <AppText style={styles.creditScoreValue}>
              {Math.round(creditScore)}
            </AppText>
            <AppText style={styles.creditScoreDescription}>
              Este puntaje fue utilizado para evaluar tu solicitud
            </AppText>
          </View>

          {/* Próximos pasos */}
          <View style={styles.nextStepsCard}>
            <AppText style={styles.nextStepsTitle}>
              ¿Qué sigue?
            </AppText>
            
            <View style={styles.nextStepItem}>
              <View style={styles.nextStepNumber}>
                <AppText style={styles.nextStepNumberText}>1</AppText>
              </View>
              <AppText style={styles.nextStepText}>
                La entidad financiera revisará tu solicitud
              </AppText>
            </View>

            <View style={styles.nextStepItem}>
              <View style={styles.nextStepNumber}>
                <AppText style={styles.nextStepNumberText}>2</AppText>
              </View>
              <AppText style={styles.nextStepText}>
                Recibirás una notificación con la respuesta
              </AppText>
            </View>

            <View style={styles.nextStepItem}>
              <View style={styles.nextStepNumber}>
                <AppText style={styles.nextStepNumberText}>3</AppText>
              </View>
              <AppText style={styles.nextStepText}>
                Si es aprobado, podrás ver los detalles del crédito
              </AppText>
            </View>
          </View>

          <View style={styles.detailFooter}>
            <AuthButton onPress={onFinish} disabled={false}>
              Volver al inicio
            </AuthButton>
          </View>
        </ScrollView>
      </View>
    </Navigation>
  );
};
