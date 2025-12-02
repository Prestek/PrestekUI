import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { typography } from "@/assets/styles/theme";
import { AppText } from "@/components/AppText";
import { RequestProps } from "@/models/applicationModels";
import { LoanRequestStatus } from "@/models/enums/Request";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Chip, IconButton, Surface, TouchableRipple, useTheme } from "react-native-paper";

export const Request: React.FC<RequestProps> = ({ request, showElevation = true }) => {
    const theme = useTheme();
    const paymentStyles = createPaymentStyles(theme);

    const getColorByStatus = (status: string) => {
        switch (status) {
            case "Aprobada":
                return 'rgb(20, 83, 45)';
            case "Pendiente":
                return 'rgb(124, 108, 18)';
            case "Rechazada":
                return 'rgb(127, 29, 29)';
            default:
                return theme.colors.onSurface;
        }
    }

    const getBackgroundColorByStatus = (status: string) => {
        switch (status) {
            case "Aprobada":
                return 'rgba(28, 196, 90, 0.18)';
            case "Pendiente":
                return 'rgba(249, 207, 22, 0.18)';
            case "Rechazada":
                return 'rgba(239, 68, 68, 0.15)';
            default:
                return theme.colors.onSurface;
        }
    }
    const getBackgroundColorByStatusAll = (status: string) => {
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
    }

    return (
        <TouchableRipple
            borderless={false}
            onPress={() => console.log('view request')}
        >
            <Surface style={[paymentStyles.paymentItem, !showElevation && paymentStyles.withoutElevantion, showElevation && { borderLeftWidth: 4, borderLeftColor: getBackgroundColorByStatusAll(request.status) }]} elevation={showElevation ? 3 : 0}>
                <View style={paymentStyles.horizontalItems}>
                    <View style={paymentStyles.horizontalItems}>
                        <View style={[paymentStyles.bankLogo,
                        !showElevation && { backgroundColor: theme.colors.tertiary }]}>
                            <MaterialCommunityIcons name="bank" size={24} color={showElevation ? theme.colors.onPrimary : theme.colors.onPrimary} />
                        </View>
                        <AppText style={[paymentStyles.paymentType, !showElevation && { color: theme.colors.onPrimary }]}>
                            {request.bank}
                        </AppText>
                    </View>
                    {showElevation ?
                        <IconButton
                            icon="chevron-right"
                            size={20}
                            style={{ margin: 0 }}
                        />
                        :
                        <Chip
                            style={{
                                backgroundColor: getBackgroundColorByStatus(request.status),
                            }}
                            textStyle={{
                                color: getColorByStatus(request.status),
                                fontSize: 11,
                            }}
                        >
                            {request.status}
                        </Chip>}

                </View>

                <View style={paymentStyles.horizontalItems}>
                    <View>
                        <AppText style={[paymentStyles.labelText, !showElevation && { color: theme.colors.onPrimary }]}>
                            Fecha de solicitud
                        </AppText>
                        <AppText style={[paymentStyles.paymentDate, !showElevation && { color: theme.colors.onPrimary }]}>
                            {request.date}
                        </AppText>
                    </View>

                    <View>
                        <AppText style={[paymentStyles.labelText, !showElevation && { color: theme.colors.onPrimary }]}>
                            Monto solicitado
                        </AppText>
                        <AppText style={[paymentStyles.paymentAmount, !showElevation && { color: theme.colors.onPrimary }, { textAlign: 'right' }]}>
                            ${request.amount.toLocaleString('es-CO')}
                        </AppText>
                    </View>
                </View>
            </Surface>
        </TouchableRipple>
    );
}