import { createScanStyles } from "@/assets/styles/scan.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { AppText } from "@/components/AppText";


export default function WarningScanner() {
    const theme = useTheme();
    const router = useRouter();
    const styles = createScanStyles(theme);
    const lottie = require('@/assets/animationID.json');
    const handleContinue = () => {
        router.push('/(client)/(scan)/camera');
    };
    return (
        <View style={styles.container}>
            
            <View style={styles.warningContainer}>
                <View style={styles.contentContainer}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <AppText style={styles.subtitle}>Escanea el reverso de tu cédula de identidad</AppText>
                    </View>
                    <View style={styles.center}>
                        <LottieView
                            source={lottie}
                            autoPlay
                            style={{ width: 280, height: 250 }}
                        />
                    </View>
                    <View style={styles.instructionsSection}>
                        <View style={styles.instructionItemContainer}>
                            <View style={styles.instructionItem}>
                                <MaterialIcons name="lightbulb" size={20} color={theme.colors.inversePrimary} />
                                <AppText style={styles.instructionText}>
                                    Encuentra un lugar con buena iluminación
                                </AppText>
                            </View>
                            <View style={styles.instructionItem}>
                                <MaterialIcons name="check" size={20} color={theme.colors.inversePrimary} />
                                <AppText style={styles.instructionText}>
                                    Asegura que la cédula esté completamente visible y bien iluminada.
                                </AppText>
                            </View>
                            <View style={styles.instructionItem}>
                                <MaterialIcons name="block" size={20} color={theme.colors.inversePrimary} />
                                <AppText style={styles.instructionText}>
                                    Evita reflejos y sombras en el documento.
                                </AppText>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Action Buttons */}
                <TouchableOpacity
                    onPress={handleContinue}
                    style={[styles.buttonWarning, styles.button, styles.fullWidthButton]}
                >
                    <AppText style={[styles.buttonLabelStyle, { color: theme.colors.primary }]}>
                        Continuar
                    </AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
}