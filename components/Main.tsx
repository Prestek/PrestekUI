import { Button, Image, ScrollView, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Login } from "../pages/login/Login";

export function Main() {
    const insets = useSafeAreaInsets();
    const theme = useTheme();
    return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: theme.colors.background }}>
        <ScrollView>
            <Login />
        </ScrollView>
    </View>
    );
}