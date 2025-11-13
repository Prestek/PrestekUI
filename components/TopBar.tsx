import { createAuthStyles } from "@/assets/styles/auth.styles";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { MaterialIcons } from "@expo/vector-icons"
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context";
import { ChildrenProps } from "@/models/childrenModel";
import { AppText } from "./AppText";


export const TopBar: React.FC<ChildrenProps> = ({ children }) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    const authStyles = createAuthStyles(theme);
    return(
        <View style={[authStyles.container, { flex: 1 }]}>
            <View style={styles.introContainer}>
                <View style={styles.logoContainer}>
                    <MaterialIcons
                        name="credit-card"
                        size={30}
                        color={theme.colors.primary}
                    />
                    <AppText style={styles.title}> Prestek</AppText>
                </View>
                <AppText style={styles.introTitle} >Complete your profile</AppText>
                <AppText style={styles.subtitle}>To offer you the best loans, we need to know you better</AppText>
            </View>
            {children}
        </View>
    );
}