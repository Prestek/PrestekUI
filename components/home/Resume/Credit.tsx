import { createHomeStyles } from "@/assets/styles/home.styles";
import { CreditProps } from "@/models/creditModels";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";


export const Credit: React.FC<CreditProps> = ({loan}) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    return (
        <View style={[styles.loanCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline }]}>
                <View style={styles.cardContent}>
                    {/* Bank Info */}
                    <View style={styles.itemsHorizontal}>
                        <View>
                            <Text style={[styles.bankLabel, { color: theme.colors.onSurface }]}>Préstamo con</Text>
                            <Text style={[styles.bankName, { color: theme.colors.onBackground }]}>{loan.bank}</Text>
                        </View>
                        <View style={styles.bankLogo}>
                            <Text style={styles.logoText}>H</Text>
                        </View>
                    </View>

                    {/* Amount Section */}
                    <View style={styles.itemsHorizontal}>
                    <View style={styles.amountSection}>
                        <Text style={[styles.amountLabel, { color: theme.colors.onSurface }]}>Monto total</Text>
                        <Text style={[styles.amountValue, { color: theme.colors.onBackground }]}>
                            ${loan.totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </Text>  
                    </View>
                    <View style={styles.interestInfo}>
                    <Text style={[styles.amountLabel, { color: theme.colors.onSurface }]}>Tasa anual</Text>
                            <Text style={[styles.amountValue, { color: theme.colors.onBackground }]}>
                                {loan.interestRate}%
                            </Text>
                        </View>
                        </View>


                    {/* Dates Section */}
                    <View style={styles.itemsHorizontal}>
                        <View style={styles.dateItem}>
                            <Text style={[styles.dateLabel, { color: theme.colors.onSurface }]}>Fecha de inicio</Text>
                            <Text style={[styles.dateValue, { color: theme.colors.onBackground }]}>{loan.startDate}</Text>
                        </View>
                        <View style={[styles.dateItem, styles.dateItemLeft]}>
                            <Text style={[styles.dateLabel, { color: theme.colors.onSurface }]}>Fecha de término</Text>
                            <Text style={[styles.dateValue, { color: theme.colors.onBackground }]}>{loan.endDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
    );
}