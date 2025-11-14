import { createHomeStyles } from "@/assets/styles/home.styles";
import { NextPaymentProps } from "@/models/creditModels";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppText } from "@/components/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CardColors {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
}

export const NextPayment: React.FC<NextPaymentProps> = ({ nextPaymentDate, nextPaymentAmount, paymentDateLabel }) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);

    // Función para calcular días hasta el próximo pago
    const calculateDaysUntilPayment = (paymentDate: string): number => {
        const today = new Date();
        const payment = new Date(paymentDate);
        const diffTime = payment.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Función para determinar los colores basado en los días restantes
    const getCardColors = (daysUntilPayment: number): CardColors => {
        if (daysUntilPayment <= 7) {
            // Crítico - Rojo muy urgente
            return {
                backgroundColor: 'rgba(239, 68, 68, 0.08)', // Rojo muy claro
                textColor: 'rgb(127, 29, 29)', // Rojo oscuro
                borderColor: 'rgba(148, 18, 18, 0.29)', // Rojo semi-transparente
            };
        } else if (daysUntilPayment <= 14) {
            // Urgente - Naranja
            return {
                backgroundColor: 'rgba(249, 207, 22, 0.08)', // Naranja muy claro
                textColor: 'rgb(124, 108, 18)', // Naranja oscuro
                borderColor: 'rgba(249, 196, 22, 0.41)', // Naranja semi-transparente
            };
        } else if (daysUntilPayment <= 30) {
            // Advertencia - Amarillo
            return {
                backgroundColor: 'rgba(234, 179, 8, 0.08)', // Amarillo muy claro
                textColor: 'rgb(113, 63, 18)', // Amarillo oscuro/marrón
                borderColor: 'rgba(234, 179, 8, 0.3)', // Amarillo semi-transparente
            };
        } else {
            // OK - Verde
            return {
                backgroundColor: 'rgba(34, 197, 94, 0.08)', // Verde muy claro
                textColor: 'rgb(20, 83, 45)', // Verde oscuro
                borderColor: 'rgba(34, 197, 94, 0.3)', // Verde semi-transparente
            };
        }
    };

    // Función para obtener el mensaje de días restantes
    const getDaysMessage = (daysUntilPayment: number): string => {
        if (daysUntilPayment <= 0) {
            return "Expired";
        } else if (daysUntilPayment === 1) {
            return "1 day left to expire";
        } else {
            return `${daysUntilPayment} days left to expire`;
        }
    };

    const daysUntilPayment = calculateDaysUntilPayment(nextPaymentDate);
    const cardColors = getCardColors(daysUntilPayment);
    const daysMessage = getDaysMessage(daysUntilPayment);

    return (
        <View style={[
            styles.nextPaymentCard, 
            { 
                backgroundColor: cardColors.backgroundColor,
                borderWidth: 2,
                borderColor: cardColors.borderColor,
            }
        ]}>
            {/* Top Section - Next Payment */}
            <View style={styles.nextPaymentTop}>
                <View style={styles.nextPaymentLeft}>
                    <MaterialCommunityIcons name="cash-multiple" size={24} color={cardColors.textColor} />
                    <AppText style={[styles.nextPaymentTitle, { color: cardColors.textColor }]}>
                        Next payment
                    </AppText>
                </View>
                <AppText style={[styles.nextPaymentAmount, { color: cardColors.textColor }]}>
                    ${nextPaymentAmount.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                </AppText>
            </View>

            {/* Middle Section - Due Date */}
            <View style={styles.nextPaymentMiddle}>
                <AppText style={[styles.nextPaymentDueLabel, { color: cardColors.textColor }]}>
                    Due date
                </AppText>
                <AppText style={[styles.nextPaymentDueDate, { color: cardColors.textColor }]}>
                    {paymentDateLabel}
                </AppText>
            </View>

            {/* Bottom Section - Countdown */}
            <View style={styles.nextPaymentBottom}>
                <AppText style={[styles.nextPaymentCountdown, { color: cardColors.textColor }]}>
                    {daysMessage}
                </AppText>
            </View>
        </View>
    );
};
