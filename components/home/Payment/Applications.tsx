import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { spacing, typography } from "@/assets/styles/theme";
import { AppText } from "@/components/AppText";
import { ApplicationProps } from "@/models/applicationModels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native"
import { Chip, Surface, useTheme } from "react-native-paper"
import { Request } from "./Request";

export const Applications: React.FC<ApplicationProps> = ({ filteredRequests, showElevation=true, limit=filteredRequests.length }) => {

    const theme = useTheme();
    const paymentStyles = createPaymentStyles(theme);


    return (
        <View style={paymentStyles.historyContent}>
            {filteredRequests.slice(0, limit).map((request: any, index: number) => (
                <Request request={request} showElevation={showElevation} key={index} />
            ))}

            {filteredRequests.length === 0 && (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: spacing["4xl"]
                }}>
                    <MaterialCommunityIcons
                        name="file-search-outline"
                        size={64}
                        color={theme.colors.onSurfaceVariant}
                    />
                    <AppText style={{
                        color: theme.colors.onSurfaceVariant,
                        marginTop: spacing.md,
                        fontSize: 16
                    }}>
                        Requests not found
                    </AppText>
                </View>
            )}
        </View>
    )
}