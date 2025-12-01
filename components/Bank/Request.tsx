import { LoanRequest, statusLabels } from "@/hooks/const/data";
import { Card, Chip, IconButton, Surface, TouchableRipple, useTheme } from "react-native-paper";
import { AppText } from "../AppText";
import { RequestBankProps, RequestProps } from "@/models/applicationModels";
import { createStyles } from "@/assets/styles/bank.styles";
import { spacing, typography } from "@/assets/styles/auth.styles";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LoanRequestStatus } from "@/models/enums/Request";

export const BankRequest: React.FC<RequestBankProps> = ({
  request,
  showElevation = true,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const getBackgroundColorByStatus = (status: string) => {
    switch (status) {
      case LoanRequestStatus.APPROVED:
        return "rgba(0, 146, 54, 0.57)";
      case LoanRequestStatus.PENDING:
        return "rgba(255, 208, 0, 0.46)";
      case LoanRequestStatus.REJECTED:
        return "rgba(194, 0, 0, 0.61)";
      default:
        return theme.colors.onSurface;
    }
  };

  const handleViewRequest = (id: string) => {
    router.push({
      pathname: "/(bank)/(detail)",
      params: { id },
    });
  };

  return (
    <TouchableRipple
      borderless={false}
      onPress={() => handleViewRequest(request.id)}
    >
      <Surface style={[styles.requestCard, { borderLeftWidth: 4, borderLeftColor: getBackgroundColorByStatus(request.status) }]} elevation={3}>
        <View style={styles.bankLogo}>
          <MaterialCommunityIcons name="account" size={30} color={theme.colors.onPrimary} />
        </View>
        <View style={{ flex: 1, gap: spacing.sm }}>
          <View style={styles.lastRequestHeader}>
            <View>
              <AppText style={styles.cardText}>{request.applicant}</AppText>
              <AppText style={styles.cardText}>${request.amount.toLocaleString("es-CO")}</AppText>
            </View>
            <IconButton
              icon="chevron-right"
              size={20}
              style={{ margin: 0 }}
            />
          </View>
          <View style={styles.lastRequestHeader}>
            <AppText style={styles.lastRequestValue}>ID: {request.id}</AppText>
            <AppText style={styles.lastRequestValue}>{new Date(request.requestedAt).toLocaleDateString("es-CO")}</AppText>
          </View>
        </View>
      </Surface>
    </TouchableRipple>
  );
};
