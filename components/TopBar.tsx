import { MaterialIcons } from "@expo/vector-icons"
import { Text } from "react-native-paper"



export const TobBar(children){
    const theme = useTheme();
      const styles = createAuthStyles(theme);

    return(
        <View style={styles.logoContainer}>
            <MaterialIcons
                name="credit-card"
                size={60}
                color={theme.colors.primary}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}