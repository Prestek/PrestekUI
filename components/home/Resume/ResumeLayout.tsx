import { createHomeStyles } from "@/assets/styles/home.styles";
import { View, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Credit } from "./Credit";
import { History } from "./History";
import { Progress } from "./Progress";
import { NextPayment } from "./NextPayment";
import { UserHeader } from "./UserHeader";
import { SignOutButton } from "@/components/SignOutButton";




export const ResumeLayout = () => {

    const loanData = {
        bank: "Banco Nacional",
        totalAmount: 25000.00,
        interestRate: 12.5,
        startDate: "15 marzo 2023",
        endDate: "15 diciembre 2025",
        paidAmount: 10500.00,
        remainingAmount: 14500.00,
        progressPercentage: 42
    };

    // Datos del próximo pago - ejemplo con fecha cercana para mostrar color rojo
    const nextPaymentData = {
        nextPaymentDate: "2025-10-25", // Cambiar esta fecha para probar diferentes colores
        nextPaymentAmount: 1250.00,
        paymentDateLabel: "8 noviembre 2025"
    };

    const theme = useTheme();
    const styles = createHomeStyles(theme);

    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <UserHeader />
            
            <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>Tu Crédito Actual</Text>
                <View style={styles.headerIcon}>
                    <Text style={styles.iconText}>★</Text>
                </View>
            </View>
            <Text style={[styles.headerSubtitle, { color: theme.colors.onSurface }]}>
                Información detallada de tu préstamo activo
            </Text>

            <Credit loan = {loanData}/>

            <Progress loan={loanData} /> 
            
            <NextPayment 
                nextPaymentDate={nextPaymentData.nextPaymentDate}
                nextPaymentAmount={nextPaymentData.nextPaymentAmount}
                paymentDateLabel = {nextPaymentData.paymentDateLabel}
            />

            <History />
            <SignOutButton />
        </ScrollView>
    );
}