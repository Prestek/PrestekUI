import { createScanStyles } from "@/assets/styles/scan.styles";
import CedulaScanner from "@/components/scanner/CedulaScanner";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Appbar, useTheme } from 'react-native-paper';
import Logo from "@/components/Logo";

export default function DocumentScanner(){
    const router = useRouter();
    const theme = useTheme();
    const styles = createScanStyles(theme);
    
    const handleBack = () => {
        if (router.canGoBack()) {
            router.replace('/(auth)/login');
        } else {
            router.replace('/(auth)/login');
        }
    };
    
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.appbar}>
                <Appbar.BackAction onPress={handleBack} color={theme.colors.primary} />
                <View style={styles.titleContainer}>
                    <Logo
                        width={24}
                        height={24}
                        color={theme.colors.primary}
                    />
                    <Text style={styles.appbarTitle}>Prestek</Text>
                </View>
            </Appbar.Header>
            <CedulaScanner />
        </View>
    );
}
