import { spacing, borderRadius, typography } from "@/assets/styles/theme";
import Logo from "@/components/Logo";
import { AppText } from "@/components/AppText";
import { saveItem } from "@/utils/secureStorage";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, MD3Theme, Surface, useTheme } from "react-native-paper";

type RoleOption = "client" | "bank";

export default function RoleScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleRoleSelection = async (role: RoleOption) => {
    await saveItem("role", role);

    if (role === "client") {
      router.push({
        pathname: "/(auth)/sign-in",
        params: { role: "client" },
      });
      return;
    }

    router.push("/(auth)/select-bank");
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
      <Logo width={60} height={60} color={theme.colors.inversePrimary} />
        <AppText style={styles.welcomeLabel}>Bienvenido</AppText>
        <AppText style={styles.description}>
          Conecta tus finanzas y gestiona tus productos desde un único lugar.
        </AppText>
      </View>

      <Surface style={styles.actionCard} elevation={3}>
        <AppText style={styles.actionTitle}>¿Cómo quieres continuar?</AppText>
        <AppText style={styles.actionSubtitle}>
          Elige tu rol para personalizar tu experiencia.
        </AppText>
        <Button icon="account" mode="contained" onPress={() => handleRoleSelection("client")} textColor={theme.colors.inversePrimary}>
            Soy cliente
        </Button>
        <Button icon="bank" mode="outlined" onPress={() => handleRoleSelection("bank")} textColor={theme.colors.primary} style={styles.secondaryButton}>
            Represento un banco
        </Button>
      </Surface>
    </View>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
      justifyContent: "space-between",
    },
    heroContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    logoWrapper: {
      width: 96,
      height: 96,
      borderRadius: 48,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.surface,
    },
    welcomeLabel: {
      fontSize: typography.sizes.xl,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.onBackground,
      textAlign: "center",
    },
    description: {
      fontSize: typography.sizes.md,
      color: theme.colors.inversePrimary,
      textAlign: "center",
    },
    actionCard: {
      gap: spacing.md,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      backgroundColor: theme.colors.surface,
    },
    actionTitle: {
      fontSize: typography.sizes.lg,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.onSurface,
    },
    actionSubtitle: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
    },
    buttonContent: {
      paddingVertical: spacing.xs,
    },
    primaryButton: {
      borderRadius: borderRadius.lg,
      color: theme.colors.inversePrimary,
    },
    secondaryButton: {
      borderColor: theme.colors.primary,
    },
  });