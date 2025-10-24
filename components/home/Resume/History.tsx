import { createHomeStyles } from "@/assets/styles/home.styles";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";


export const History = () => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    const paymentHistory = [
        { date: "15 junio 2023", amount: 1250.00, status: "Completado" },
        { date: "15 mayo 2023", amount: 1250.00, status: "Completado" },
        { date: "15 abril 2023", amount: 1250.00, status: "Completado" }
    ];
    return (
        <View style={styles.historySection}>
        <View style={styles.historyHeader}>
            <Text style={[styles.historyTitle, { color: theme.colors.onBackground }]}>Historial de pagos</Text>
            <Text style={[styles.seeAllLink, { color: theme.colors.primary }]}>Ver todos</Text>
        </View>

        {paymentHistory.map((payment, index) => (
            <View key={index} style={styles.paymentItem}>
                <View style={styles.paymentIndicator} />
                <View style={styles.paymentContent}>
                    <Text style={[styles.paymentType, { color: theme.colors.onBackground }]}>Pago mensual</Text>
                    <Text style={[styles.paymentDate, { color: theme.colors.onSurface }]}>{payment.date}</Text>
                    <Text style={[styles.paymentStatus, { color: '#4CAF50' }]}>{payment.status}</Text>
                </View>
                <Text style={[styles.paymentAmount, { color: theme.colors.onBackground }]}>
                    ${payment.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </Text>
            </View>
        ))}
    </View>
    );
}