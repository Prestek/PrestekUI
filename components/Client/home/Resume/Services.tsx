import { AppText } from "@/components/AppText";
import { ScrollView, View } from "react-native";
import { Items } from "./Items";
import { TouchableRipple, useTheme } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { ItemsProps } from "@/models/itemsModels";
import { router } from "expo-router";
const quickActions: ItemsProps[] = [
    {
        icon: "credit-card",
        title: "Solicitar préstamo",
        description: "Solicitar un nuevo préstamo",
        onPress: () => { router.push("/(client)/(home)/loan") },
    },
    {
        icon: "history",
        title: "Solicitudes de crédito",
        description: "Ver tus solicitudes",
        onPress: () => { router.push("/(client)/(home)/applications") },
    },
    {
        icon: "help-outline",
        title: "Necesita ayuda",
        description: "Contactar soporte",
        onPress: () => { },
    },
];
export const Services = () => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    return (
        <View>
            <AppText style={styles.introTitle}>Servicios</AppText>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemsCarouselContent}
                style={styles.itemsCarousel}
            >
                {quickActions.map((item, index) => (
                    <TouchableRipple
                        borderless={false}
                        onPress={item.onPress}
                        style={[
                            styles.itemSlide,
                            index === quickActions.length - 1 && styles.itemSlideLast,
                        ]}
                        key={item.title}
                    >
                        <Items {...item} />
                    </TouchableRipple>
                ))}
            </ScrollView>
        </View>
    );
}