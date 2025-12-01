import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { NavigationBottom } from "@/components/BottomNavigation";
import { AppText } from "@/components/AppText";
import { createStyles } from "@/assets/styles/bank.styles";

export default function BankHomeLayout() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant }}>
      <SignedIn>
        <NavigationBottom />
      </SignedIn>
      <SignedOut>
        <View style={styles.signedOutContainer}>
          <AppText style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Debes iniciar sesión
          </AppText>
          <View style={styles.linkRow}>
            <Link href="/(auth)/sign-in" style={styles.authLink}>
              <AppText style={styles.authLinkText}>Iniciar sesión</AppText>
            </Link>
            <Link href="/(auth)/sign-up" style={styles.authLink}>
              <AppText style={styles.authLinkText}>Crear cuenta</AppText>
            </Link>
          </View>
        </View>
      </SignedOut>
    </View>
  );
}
