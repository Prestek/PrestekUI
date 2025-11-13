import { createAuthStyles } from "@/assets/styles/auth.styles";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { MaterialIcons } from "@expo/vector-icons"
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context";
import { ChildrenProps } from "@/models/childrenModel";


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
                    <Text style={styles.title}> Prestek</Text>
                </View>
                <Text style={styles.introTitle} >Complete your profile</Text>
                <Text style={styles.subtitle}>To offer you the best loans, we need to know you better</Text>
            </View>
            {children}
        </View>
    );
}