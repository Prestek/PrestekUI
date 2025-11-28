import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { spacing, typography } from "@/assets/styles/theme";
import { AppText } from "@/components/AppText";
import { ApplicationProps } from "@/models/applicationModels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Chip, Surface, useTheme } from "react-native-paper";
import { Request } from "./Client/home/Payment/Request";
import { BankRequest } from "@/components/Bank/Request";

export const Applications: React.FC<ApplicationProps> = ({
  filteredRequests = [],
  showElevation = true,
  limit,
  role,
}) => {
  const theme = useTheme();
  const paymentStyles = createPaymentStyles(theme);
  const requests = Array.isArray(filteredRequests) ? filteredRequests : [];
  const limitValue = typeof limit === "number" ? limit : requests.length;

  return (
    <View style={paymentStyles.historyContent}>
      {requests
        .slice(0, limitValue)
        .map((request: any, index: number) =>
          role === "bank" ? (
            <BankRequest
              request={request}
              showElevation={showElevation}
              key={index}
            />
          ) : (
            <Request
              request={request}
              showElevation={showElevation}
              key={index}
            />
          )
        )}

      {requests.length === 0 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: spacing["4xl"],
          }}
        >
          <MaterialCommunityIcons
            name="file-search-outline"
            size={64}
            color={theme.colors.onSurfaceVariant}
          />
          <AppText
            style={{
              color: theme.colors.onSurfaceVariant,
              marginTop: spacing.md,
              fontSize: 16,
            }}
          >
            Requests not found
          </AppText>
        </View>
      )}
    </View>
  );
};
