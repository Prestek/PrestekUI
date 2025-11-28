import { createHomeStyles } from "@/assets/styles/home.styles";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Profile() {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
  
    
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <SignOutButton />
        </View>
    )
  }