import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { spacing } from "@/assets/styles/theme";
import { AppText } from "@/components/AppText";
import { ApplicationProps } from "@/models/applicationModels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "react-native-paper";


export const Applications: React.FC<ApplicationProps> = ({
  total,
  children
}) => {
  const theme = useTheme();
  const paymentStyles = createPaymentStyles(theme);

  return (
    <View style={paymentStyles.historyContent}>
      {children}

      {total === 0 && (
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
            Solicitudes no encontradas
          </AppText>
        </View>
      )}
    </View>
  );
};
