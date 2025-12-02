import { createHomeStyles } from "@/assets/styles/home.styles";
import { AppText } from "@/components/AppText";
import { LastApplicationProps } from "@/models/clientResumeModels";
import { CreditProps } from "@/models/creditModels";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";


export const Credit: React.FC<LastApplicationProps> = ({ bank, totalAmount, applicationDate }) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    return (
        <View style={[styles.basicInformation, styles.resumeContrainer]}>
                <View style={[styles.itemsHorizontal]}>
                    <View style={styles.cardHeader}>
                        <AppText style={styles.basicInformationTitle}>Última solicitud</AppText>
                        <AppText style={[styles.basicInformationContentText, styles.bankColor]}>{bank}</AppText>
                    </View>
                    <View style={styles.bankLogo}>
                        <AppText style={styles.logoText}>B</AppText>
                    </View>
                </View>
            <View style={styles.cardContent}>
                <View style={styles.itemsHorizontal}>
                    <View style={styles.amountSection}>
                        <AppText style={[styles.amountLabel, styles.basicInformationContentText]}>Total solicitado</AppText>
                        <AppText style={[styles.amountValue, styles.basicInformationContentText]}>
                            ${totalAmount.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                        </AppText>
                    </View>
                    <View style={styles.amountSection}>
                        <AppText style={styles.basicInformationContentText}>Fecha de solicitud</AppText>
                        <AppText style={[styles.basicInformationContentText, styles.bankName]}>{applicationDate}</AppText>
                    </View>
                </View>
                
            </View>
        </View>
    );
}