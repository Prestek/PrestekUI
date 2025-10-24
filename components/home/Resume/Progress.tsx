import { createHomeStyles } from "@/assets/styles/home.styles";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface CreditProps{
    loan: {
        bank: string,
        totalAmount: number,
        interestRate: number,
        startDate: string,
        endDate: string,
        paidAmount: number,
        remainingAmount: number,
        progressPercentage: number
    }
}

export const Progress: React.FC<CreditProps> = ({loan}) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);

    return (
        <View style={styles.progressSection}>
            <View style={styles.itemsHorizontal}>
                <Text style={[styles.progressTitle, { color: theme.colors.onBackground }]}>Progreso</Text>
                <Text style={[styles.progressPercentage, { color: theme.colors.onBackground }]}>
                        {loan.progressPercentage}%
                    </Text>
            </View>
            <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${loan.progressPercentage}%`, backgroundColor: theme.colors.primary }]} />
                </View>
                <View style={styles.progressInfo}>
                    
                    <Text style={[styles.progressPaid, { color: theme.colors.onBackground }]}>
                        Pagado: ${loan.paidAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </Text>
                    <Text style={[styles.progressRemaining, { color: theme.colors.onBackground }]}>
                        Restante: ${loan.remainingAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </Text>
                </View>
            </View>
    );
}