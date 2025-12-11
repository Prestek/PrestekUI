import {
  IconButton,
  Surface,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { AppText } from "../AppText";
import { RequestBankProps } from "@/models/applicationModels";
import { createStyles } from "@/assets/styles/bank.styles";
import { spacing } from "@/assets/styles/auth.styles";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { BankCode, LoanRequestStatus } from "@/models/enums/Request";
import { formatDate } from "@/models/functions/date";

export const BankRequest: React.FC<RequestBankProps> = ({
  request,
  showElevation = true,
  bankCode,
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
    console.log("bankCode", bankCode);
    router.push({
      pathname: "/(bank)/(detail)",
      params: { id: id, bankCode: bankCode as BankCode },
    });
  };

  return (
    <TouchableRipple
      borderless={false}
      onPress={() => handleViewRequest(request.id.toString())}
    >
      <Surface
        style={[
          styles.requestCard,
          {
            borderLeftWidth: 4,
            borderLeftColor: getBackgroundColorByStatus(request.status),
          },
        ]}
        elevation={3}
      >
        <View style={styles.bankLogo}>
          <MaterialCommunityIcons
            name="account"
            size={30}
            color={theme.colors.onPrimary}
          />
        </View>
        <View style={{ flex: 1, gap: spacing.sm }}>
          <View style={styles.lastRequestHeader}>
            <View>
              <AppText style={styles.cardText}>
                {"USR - " + request.userId}
              </AppText>
              <AppText style={styles.cardText}>
                ${request.amount.toLocaleString("es-CO")}
              </AppText>
            </View>
            <IconButton icon="chevron-right" size={20} style={{ margin: 0 }} />
          </View>
          <View style={styles.lastRequestHeader}>
            <AppText style={styles.lastRequestValue}>ID: {request.id}</AppText>
            <AppText style={styles.lastRequestValue}>
              {formatDate(request.applicationDate)}
            </AppText>
          </View>
        </View>
      </Surface>
    </TouchableRipple>
  );
};
