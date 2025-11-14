import { createHomeStyles } from "@/assets/styles/home.styles";
import { ScrollView, View } from "react-native";
import { Avatar, IconButton, MD3Colors, Text, useTheme } from "react-native-paper";
import { AppText } from "@/components/AppText";
import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { spacing } from "@/assets/styles/theme";
import { NextPayment } from "./NextPayment";


export const History = () => {
    const theme = useTheme();
    const paymentStyles = createPaymentStyles(theme);
    const paymentHistory = [
        { date: "15 junio 2023", amount: 1250.00, status: "Completado" },
        { date: "15 mayo 2023", amount: 1250.00, status: "Completado" },
        { date: "15 abril 2023", amount: 1250.00, status: "Completado" },
    ];
    return (
        <View style={paymentStyles.container}>
            <View style={paymentStyles.historyHeader}>
                <AppText style={paymentStyles.historyTitle}>Historial de pagos</AppText>
                <IconButton
                    icon="filter-variant"
                    iconColor={theme.colors.onPrimary}
                    style={paymentStyles.filterButton}
                    size={20}
                    onPress={() => console.log('Pressed')}
                />
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing["4xl"] }}
                showsVerticalScrollIndicator={false}
            >
                <View style={paymentStyles.historyContent}>
                    <NextPayment
                        nextPaymentDate="2025-11-25"
                        nextPaymentAmount={1250.00}
                        paymentDateLabel="8 noviembre 2025"
                    />
                    {paymentHistory.map((payment, index) => (
                        <View key={index} style={paymentStyles.paymentItem}>
                            <View style={paymentStyles.bankLogo}>
                                <MaterialCommunityIcons name="bank" size={24} color={theme.colors.onPrimary} />
                            </View>
                            <View style={paymentStyles.paymentContent}>
                                <AppText style={[paymentStyles.paymentType, { color: theme.colors.secondary }]}>Pago mensual</AppText>
                                <AppText style={[paymentStyles.paymentDate, { color: theme.colors.secondary }]}>{payment.date}</AppText>
                            </View>
                            <AppText style={[paymentStyles.paymentAmount, { color: theme.colors.secondary }]}>
                                ${payment.amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                            </AppText>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}