import { createHomeStyles } from "@/assets/styles/home.styles";
import { CreditProps } from "@/models/creditModels";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { AppText } from "@/components/AppText";


export const Progress: React.FC<CreditProps> = ({loan}) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);

    return (
        <View style={styles.progressSection}>
            <View style={styles.itemsHorizontal}>
                <AppText style={[styles.progressTitle, { color: theme.colors.onBackground }]}>Progreso</AppText>
                <AppText style={[styles.progressPercentage, { color: theme.colors.onBackground }]}>
                        {loan.progressPercentage}%
                    </AppText>
            </View>
            <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${loan.progressPercentage}%`, backgroundColor: theme.colors.primary }]} />
                </View>
                <View style={styles.progressInfo}>
                    
                    <AppText style={[styles.progressPaid, { color: theme.colors.onBackground }]}>
                        Pagado: ${loan.paidAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </AppText>
                    <AppText style={[styles.progressRemaining, { color: theme.colors.onBackground }]}>
                        Restante: ${loan.remainingAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                    </AppText>
                </View>
            </View>
    );
}