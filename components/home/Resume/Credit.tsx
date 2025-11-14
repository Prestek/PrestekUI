import { createHomeStyles } from "@/assets/styles/home.styles";
import { AppText } from "@/components/AppText";
import { CreditProps } from "@/models/creditModels";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";


export const Credit: React.FC<CreditProps> = ({ loan }) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    return (
        <View style={[styles.basicInformation, styles.resumeContrainer]}>
                {/* Bank Info */}
                <View style={[styles.itemsHorizontal]}>
                    <View style={styles.cardHeader}>
                        <AppText style={styles.basicInformationTitle}>Current loan</AppText>
                        <AppText style={[styles.basicInformationContentText, styles.bankColor]}>{loan.bank}</AppText>
                    </View>
                    <View style={styles.bankLogo}>
                        <AppText style={styles.logoText}>N</AppText>
                    </View>
                </View>
            <View style={styles.cardContent}>
                {/* Amount Section */}
                <View style={styles.itemsHorizontal}>
                    <View style={styles.amountSection}>
                        <AppText style={[styles.amountLabel, styles.basicInformationContentText]}>Total amount</AppText>
                        <AppText style={[styles.amountValue, styles.basicInformationContentText]}>
                            ${loan.totalAmount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                        </AppText>
                    </View>
                    <View style={styles.interestInfo}>
                        <AppText style={[styles.amountLabel, styles.basicInformationContentText]}>Annual interest rate</AppText>
                        <AppText style={[styles.amountValue, styles.basicInformationContentText]}>
                            {loan.interestRate}%
                        </AppText>
                    </View>
                </View>
                <View style={styles.itemsHorizontal}>
                    <View style={styles.amountSection}>
                        <AppText style={styles.basicInformationContentText}>Start date</AppText>
                        <AppText style={[styles.basicInformationContentText, styles.bankName]}>{loan.startDate}</AppText>
                    </View>
                    <View style={styles.amountSection}>
                        <AppText style={[styles.basicInformationContentText, styles.alignTextRight]}>End date</AppText>
                        <AppText style={[styles.basicInformationContentText, styles.alignTextRight, styles.bankName]}>{loan.endDate}</AppText>
                    </View>
                </View>
            </View>
        </View>
    );
}