import { createHomeStyles } from "@/assets/styles/home.styles";
import { CreditProps } from "@/models/creditModels";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { AppText } from "@/components/AppText";


export const Progress: React.FC<CreditProps> = ({ loan }) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);

    return (
        <View style={styles.progressSection}>
            <View style={styles.progressContainer}>
            <View style={styles.itemsHorizontal}>
                <AppText style={[styles.progressTitle, { color: theme.colors.inversePrimary }]}>Progreso</AppText>
                <AppText style={[styles.progressPercentage, { color: theme.colors.inversePrimary }]}>
                    {loan.progressPercentage}%
                </AppText>
            </View>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${loan.progressPercentage}%`, backgroundColor: theme.colors.secondaryContainer }]} />
            </View>
            <View style={styles.progressInfo}>
                <AppText style={[styles.progressPaid, { color: theme.colors.inversePrimary }]}>
                    Pagado: ${loan.paidAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </AppText>
                <AppText style={[styles.progressRemaining, { color: theme.colors.inversePrimary }]}>
                    Restante: ${loan.remainingAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                </AppText>
            </View>
            </View>
        </View>
    );
}