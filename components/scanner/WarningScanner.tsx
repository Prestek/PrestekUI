import { createScanStyles } from "@/assets/styles/scan.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Image } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef } from "react";
import { AppText } from "@/components/AppText";


export default function WarningScanner() {
    const theme = useTheme();
    const router = useRouter();
    const styles = createScanStyles(theme);
    const lottie = require('@/assets/animationID.json');
    const handleContinue = () => {
        router.push('/(home)/scan-camera');
    };


    return (
        <View style={styles.container}>
            
            <View style={styles.warningContainer}>
                <View style={styles.contentContainer}>
                    {/* Header Section */}
                    <View style={styles.headerSection}>
                        <AppText style={styles.subtitle}>Scan the back side of your ID card</AppText>
                    </View>
                    <View style={styles.center}>
                        <LottieView
                            source={lottie}
                            autoPlay
                            style={{ width: 280, height: 280 }}
                        />
                    </View>
                    {/* Instructions Section */}
                    <View style={styles.instructionsSection}>
                        <View style={styles.instructionItemContainer}>
                            <View style={styles.instructionItem}>
                                <MaterialIcons name="lightbulb" size={20} color={theme.colors.inversePrimary} />
                                <AppText style={styles.instructionText}>
                                    Find a place with good lighting
                                </AppText>
                            </View>
                            <View style={styles.instructionItem}>
                                <MaterialIcons name="check" size={20} color={theme.colors.inversePrimary} />
                                <AppText style={styles.instructionText}>
                                    Ensure the ID card is completely visible and well lit.
                                </AppText>
                            </View>
                            <View style={styles.instructionItem}>
                                <MaterialIcons name="block" size={20} color={theme.colors.inversePrimary} />
                                <AppText style={styles.instructionText}>
                                    Avoid reflections and shadows on the document.
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
                        Continue
                    </AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
}