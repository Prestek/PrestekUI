import { createHomeStyles } from "@/assets/styles/home.styles";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface NextPaymentProps {
    nextPaymentDate: string;
    nextPaymentAmount: number;
    paymentDateLabel: string;
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

    // Función para determinar el color basado en los días restantes
    const getCardColor = (daysUntilPayment: number): string => {
        if (daysUntilPayment <= 14) {
            return '#FF3B30'; // Rojo - menos de 2 semanas
        } else if (daysUntilPayment <= 30) {
            return '#F5C700'; // Amarillo - menos de 1 mes
        } else {
            return '#4CAF50'; // Verde - más de 1 mes
        }
    };

    // Función para obtener el mensaje de días restantes
    const getDaysMessage = (daysUntilPayment: number): string => {
        if (daysUntilPayment <= 0) {
            return "Vencido";
        } else if (daysUntilPayment === 1) {
            return "Falta 1 día para vencer";
        } else if (daysUntilPayment <= 7) {
            return `Faltan ${daysUntilPayment} días para vencer`;
        } else if (daysUntilPayment <= 14) {
            return `Faltan ${daysUntilPayment} días para vencer`;
        } else if (daysUntilPayment <= 30) {
            return `Faltan ${daysUntilPayment} días para vencer`;
        } else {
            return `Faltan ${daysUntilPayment} días para vencer`;
        }
    };

    const daysUntilPayment = calculateDaysUntilPayment(nextPaymentDate);
    const cardColor = getCardColor(daysUntilPayment);
    const daysMessage = getDaysMessage(daysUntilPayment);

    return (
        <View style={[styles.nextPaymentCard, { backgroundColor: cardColor }]}>
            {/* Top Section - Next Payment */}
            <View style={styles.nextPaymentTop}>
                <View style={styles.nextPaymentLeft}>
                <Text style={styles.nextPaymentIconText}>!</Text>
                    <Text style={styles.nextPaymentTitle}>Próximo pago</Text>
                </View>
                <Text style={styles.nextPaymentAmount}>
                    ${nextPaymentAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </Text>
            </View>

            {/* Middle Section - Due Date */}
            <View style={styles.nextPaymentMiddle}>
                <Text style={styles.nextPaymentDueLabel}>Fecha límite</Text>
                <Text style={styles.nextPaymentDueDate}>{paymentDateLabel}</Text>
            </View>

            {/* Bottom Section - Countdown */}
            <View style={[styles.nextPaymentBottom, { backgroundColor: cardColor === '#FF3B30' ? '#FF6B61' : cardColor === '#F5C700' ? '#FFE55C' : '#66BB6A' }]}>
                <Text style={styles.nextPaymentCountdown}>{daysMessage}</Text>
            </View>
        </View>
    );
};
