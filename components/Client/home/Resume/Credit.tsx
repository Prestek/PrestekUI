import { createHomeStyles } from "@/assets/styles/home.styles";
import { AppText } from "@/components/AppText";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Application } from "@/models/creditModels";


export const Credit: React.FC<{ lastApplication: Application | null }> = ({ lastApplication }) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);

    if (!lastApplication) {
        return (
            <View style={[styles.basicInformation, styles.resumeContrainer, { alignItems: 'center', paddingVertical: 24 }]}>
                <AppText style={[styles.basicInformationTitle, { marginBottom: 16, textAlign: 'center', }]}>
                    No tienes ninguna solicitud de prestamo
                </AppText>
                <TouchableOpacity 
                    style={{
                        backgroundColor: theme.colors.primary,
                        paddingHorizontal: 24,
                        paddingVertical: 12,
                        borderRadius: 8,
                    }}
                    onPress={() => router.push("/(client)/(home)/loan")}
                >
                    <AppText style={{ color: '#fff', fontWeight: 'bold' }}>Solicitar</AppText>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={[styles.basicInformation, styles.resumeContrainer]}>
            <View style={[styles.itemsHorizontal]}>
                <View style={styles.cardHeader}>
                    <AppText style={styles.basicInformationTitle}>Última solicitud</AppText>
                    <AppText style={[styles.basicInformationContentText, styles.bankColor]}>{lastApplication?.bankName}</AppText>
                </View>
                <View style={styles.bankLogo}>
                    <AppText style={styles.logoText}>{lastApplication?.bankName.charAt(0)}</AppText>
                </View>
            </View>
            <View style={styles.cardContent}>
                <View style={styles.itemsHorizontal}>
                    <View style={styles.amountSection}>
                        <AppText style={[styles.amountLabel, styles.basicInformationContentText]}>Total solicitado</AppText>
                        <AppText style={[styles.amountValue, styles.basicInformationContentText]}>
                            ${lastApplication?.amount.toLocaleString('es-CO', { minimumFractionDigits: 2 })}
                        </AppText>
                    </View>
                    <View style={styles.amountSection}>
                        <AppText style={styles.basicInformationContentText}>Fecha de solicitud</AppText>
                        <AppText style={[styles.basicInformationContentText, styles.bankName,styles.leftText]}>{new Date(lastApplication?.applicationDate).toLocaleDateString('es-CO')}</AppText>
                    </View>
                </View>
            </View>
        </View>
    );
}