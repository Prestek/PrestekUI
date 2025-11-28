import { createHomeStyles } from "@/assets/styles/home.styles";
import { AppText } from "@/components/AppText";
import { ItemsProps } from "@/models/itemsModels";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTheme } from "react-native-paper";


export const Items: React.FC<ItemsProps> = ({ icon, title, description}) => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <MaterialIcons name={icon} size={24} color={theme.colors.primary} />
                <AppText style={styles.itemTitle}>{title}</AppText>
            </View>
            <AppText style={styles.subtitle}>{description}</AppText>
        </View>
    );
}