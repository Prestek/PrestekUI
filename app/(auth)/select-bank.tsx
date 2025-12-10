import { spacing, borderRadius, typography } from "@/assets/styles/theme";
import { AppText } from "@/components/AppText";
import { Navigation } from "@/components/Navigation";
import { saveItem } from "@/utils/secureStorage";
import { router } from "expo-router";
import { StyleSheet, View, useColorScheme } from "react-native";
import {
  IconButton,
  MD3Theme,
  Surface,
  TouchableRipple,
  useTheme,
  PaperProvider,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { getBankTheme } from "@/assets/themes/paperTheme";
import { BankCode } from "@/models/enums/Request";

const BANKS = [
  {
    id: BankCode.DAVI,
    name: "Davivienda",
    description: "Soluciones digitales y tradicionales para tus clientes.",
    color: "#D91C23",
  },
  {
    id: BankCode.BCO,
    name: "Bancolombia",
    description: "Innovación financiera para empresas y personas.",
    color: "#0055A4",
  },
  {
    id: BankCode.COLT,
    name: "Coltefinanciera",
    description: "Crédito y ahorro pensados para crecer contigo.",
    color: "#FF8C00",
  },
] as const;



export default function SelectBankScreen() {
  const colorScheme = useColorScheme();
  const theme = getBankTheme(colorScheme);

  return (
    <PaperProvider theme={theme}>
      <SelectBankContent />
    </PaperProvider>
  );
}

function SelectBankContent() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleSelectBank = async (bankId: BankCode) => {
    console.log(bankId)
    await saveItem("role", "bank");
    await saveItem("selectedBank", bankId);

    router.push({
      pathname: "/(auth)/sign-in",
      params: { role: "bank" },
    });
  };

  return (
    <Navigation showBackButton={true} showExit={false}>
      <View style={styles.container}>
        <LinearGradient
          colors={[theme.colors.background,theme.colors.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <View style={styles.header}>
          <AppText style={styles.title}>Elige el banco que representas</AppText>
          <AppText style={styles.subtitle}>
            Personalizaremos el inicio de sesión y la experiencia según tu entidad.
          </AppText>
        </View>
        <View style={styles.bankList}>
          {BANKS.map((bank) => (
            <TouchableRipple
              key={bank.id}
              style={styles.bankRipple}
              borderless={false}
              onPress={() => handleSelectBank(bank.id)}
            >
              <Surface style={styles.bankCard} elevation={2}>
                <View style={[styles.bankAccent, { backgroundColor: bank.color }]} />
                <View style={styles.bankContent}>
                  <AppText style={styles.bankName}>{bank.name}</AppText>
                  <AppText style={styles.bankDescription}>
                    {bank.description}
                  </AppText>
                </View>
                <IconButton
                  icon="chevron-right"
                  size={20}
                  onPress={() => handleSelectBank(bank.id)}
                />
              </Surface>
            </TouchableRipple>
          ))}
        </View>
      </View>
    </Navigation>
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.md,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    header: {
      gap: spacing.sm,
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: typography.sizes.lg,
      color: theme.colors.secondary,
      fontWeight: typography.weights.bold,
    },
    subtitle: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
    },
    bankList: {
      gap: spacing.md,
    },
    bankRipple: {
      borderRadius: borderRadius.lg,
    },
    bankCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: spacing.md,
      borderRadius: borderRadius.lg,
      backgroundColor: theme.colors.background,
    },
    bankAccent: {
      width: 48,
      height: 48,
      borderRadius: borderRadius.md,
      marginRight: spacing.md,
    },
    bankContent: {
      flex: 1,
      gap: spacing.xs,
    },
    bankName: {
      fontSize: typography.sizes.md,
      color: theme.colors.secondary,
      fontWeight: typography.weights.bold,
    },
    bankDescription: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
    },
  });
