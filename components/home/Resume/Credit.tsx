import { createHomeStyles } from "@/assets/styles/home.styles";
import { CreditProps } from "@/models/creditModels";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppText } from "@/components/AppText";


export const Credit: React.FC<CreditProps> = ({loan}) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    return (
        <View style={[styles.loanCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
                <View style={styles.cardContent}>
                    {/* Bank Info */}
                    <View style={styles.itemsHorizontal}>
                        <View>
                         <AppText style={[styles.bankLabel, { color: theme.colors.onSurface }]}>Préstamo con</AppText>
                            <AppText style={[styles.bankName, { color: theme.colors.onBackground }]}>{loan.bank}</AppText>
                        </View>
                        <View style={styles.bankLogo}>
                            <AppText style={styles.logoText}>H</AppText>
                        </View>
                    </View>

                    {/* Amount Section */}
                    <View style={styles.itemsHorizontal}>
                    <View style={styles.amountSection}>
                        <AppText style={[styles.amountLabel, { color: theme.colors.onSurface }]}>Monto total</AppText>
                        <AppText style={[styles.amountValue, { color: theme.colors.onBackground }]}>
                            ${loan.totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </AppText>  
                    </View>
                    <View style={styles.interestInfo}>
                    <AppText style={[styles.amountLabel, { color: theme.colors.onSurface }]}>Tasa anual</AppText>
                            <AppText style={[styles.amountValue, { color: theme.colors.onBackground }]}>
                                {loan.interestRate}%
                            </AppText>
                        </View>
                        </View>


                    {/* Dates Section */}
                    <View style={styles.itemsHorizontal}>
                        <View style={styles.dateItem}>
                            <AppText style={[styles.dateLabel, { color: theme.colors.onSurface }]}>Fecha de inicio</AppText>
                            <AppText style={[styles.dateValue, { color: theme.colors.onBackground }]}>{loan.startDate}</AppText>
                        </View>
                        <View style={[styles.dateItem, styles.dateItemLeft]}>
                            <AppText style={[styles.dateLabel, { color: theme.colors.onSurface }]}>Fecha de término</AppText>
                            <AppText style={[styles.dateValue, { color: theme.colors.onBackground }]}>{loan.endDate}</AppText>
                        </View>
                    </View>
                </View>
            </View>
    );
}