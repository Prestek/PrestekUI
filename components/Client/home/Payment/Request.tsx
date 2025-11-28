import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { typography } from "@/assets/styles/theme";
import { AppText } from "@/components/AppText";
import { RequestProps } from "@/models/applicationModels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Chip, Surface, useTheme } from "react-native-paper";

export const Request: React.FC<RequestProps> = ({ request, showElevation = true }) => {
    const theme = useTheme();
    const paymentStyles = createPaymentStyles(theme);

    const getColorByStatus = (status: string) => {
        switch (status) {
            case "Approved":
                return 'rgb(20, 83, 45)';
            case "Pending":
                return 'rgb(124, 108, 18)';
            case "Rejected":
                return 'rgb(127, 29, 29)';
            default:
                return theme.colors.onSurface;
        }
    }

    const getBackgroundColorByStatus = (status: string) => {
        switch (status) {
            case "Approved":
                return 'rgba(28, 196, 90, 0.18)';
            case "Pending":
                return 'rgba(249, 207, 22, 0.18)';
            case "Rejected":
                return 'rgba(239, 68, 68, 0.15)';
            default:
                return theme.colors.onSurface;
        }
    }

    return (
        <Surface style={[paymentStyles.paymentItem, !showElevation && paymentStyles.withoutElevantion]} elevation={showElevation ? 3 : 0}>
            <View style={paymentStyles.horizontalItems}>
                <View style={paymentStyles.horizontalItems}>
                    <View style={[paymentStyles.bankLogo, 
                        !showElevation && {backgroundColor: theme.colors.tertiary}]}>
                        <MaterialCommunityIcons name="bank" size={24} color={showElevation ? theme.colors.onPrimary : theme.colors.onPrimary} />
                    </View>
                    <AppText style={[paymentStyles.paymentType, !showElevation && { color: theme.colors.onPrimary }]}>
                        {request.bank}
                    </AppText>
                </View>
                <Chip
                    style={{
                        backgroundColor: getBackgroundColorByStatus(request.status),
                    }}
                    textStyle={{
                        color: getColorByStatus(request.status),
                        fontSize: 11,
                        fontFamily: typography.fontFamilyBold,
                    }}
                >
                    {request.status}
                </Chip>
            </View>

            <View style={paymentStyles.horizontalItems}>
                <View>
                    <AppText style={[paymentStyles.labelText, !showElevation && { color: theme.colors.onPrimary }]}>
                        Requested Date
                    </AppText>
                    <AppText style={[paymentStyles.paymentDate, !showElevation && { color: theme.colors.onPrimary }]}>
                        {request.date}
                    </AppText>
                </View>

                <View>
                    <AppText style={[paymentStyles.labelText, !showElevation && { color: theme.colors.onPrimary }]}>
                        Requested Amount
                    </AppText>
                    <AppText style={[paymentStyles.paymentAmount, !showElevation && { color: theme.colors.onPrimary },{textAlign: 'right'}]}>
                        ${request.amount.toLocaleString('es-CO')}
                    </AppText>
                </View>
            </View>
        </Surface>
    );
}