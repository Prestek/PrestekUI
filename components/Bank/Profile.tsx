import { SignOutButton } from "@/components/auth/SignOutButton";
import { AppText } from "@/components/AppText";
import { useBank } from "@/hooks/useBank";
import { BankCode, BankCodeLabel } from "@/models/enums/Request";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { spacing, borderRadius, typography } from "@/assets/styles/theme";

export default function BankProfile() {
  const theme = useTheme();
  const styles = createBankProfileStyles(theme);
  const { bankCode } = useBank();
  const [bankName, setBankName] = useState<string>("");
  const [bankInitials, setBankInitials] = useState<string>("");

  useEffect(() => {
    if (bankCode) {
      setBankName(BankCodeLabel[bankCode] || bankCode);
      setBankInitials(getBankInitials(bankCode));
    }
  }, [bankCode]);

  const getBankInitials = (code: BankCode): string => {
    switch (code) {
      case BankCode.DAVI:
        return "DV";
      case BankCode.BCO:
        return "BC";
      case BankCode.COLT:
        return "CTF";
      default:
        return (code as string).substring(0, 2).toUpperCase();
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingHorizontal: spacing.md, justifyContent: "center" },
      ]}
    >
      {/* Header del banco */}
      <View style={styles.profileHeader}>
        <View
          style={[
            styles.avatarLarge,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <AppText style={styles.avatarText}>{bankInitials}</AppText>
        </View>
        <AppText style={[styles.bankName, { color: theme.colors.primary }]}>
          {bankName}
        </AppText>
        <View
          style={[
            styles.bankCodeBadge,
            { backgroundColor: theme.colors.tertiary },
          ]}
        >
          <AppText
            style={[styles.bankCodeText, { color: theme.colors.primary }]}
          >
            {bankCode}
          </AppText>
        </View>
      </View>

      {/* Info del banco */}
      <View
        style={[
          styles.infoCard,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons
            name="bank"
            size={24}
            color={theme.colors.primary}
          />
          <AppText style={[styles.cardTitle, { color: theme.colors.primary }]}>
            Información
          </AppText>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="identifier"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
            <View style={styles.infoContent}>
              <AppText
                style={[
                  styles.infoLabel,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                Código
              </AppText>
              <AppText
                style={[styles.infoValue, { color: theme.colors.secondary }]}
              >
                {bankCode}
              </AppText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="domain"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
            <View style={styles.infoContent}>
              <AppText
                style={[
                  styles.infoLabel,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                Entidad
              </AppText>
              <AppText
                style={[styles.infoValue, { color: theme.colors.secondary }]}
              >
                {bankName}
              </AppText>
            </View>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="shield-check"
              size={20}
              color={theme.colors.onSurfaceVariant}
            />
            <View style={styles.infoContent}>
              <AppText
                style={[
                  styles.infoLabel,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                Estado
              </AppText>
              <AppText style={[styles.infoValue, { color: "#22c55e" }]}>
                Activo
              </AppText>
            </View>
          </View>
        </View>
      </View>

      {/* Botón de cerrar sesión */}
      <View style={styles.signOutContainer}>
        <SignOutButton />
      </View>

      <View style={styles.bottomSpacing} />
    </View>
  );
}

const createBankProfileStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.lg,
      paddingBottom: spacing["4xl"],
    },
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.md,
    },
    loadingText: {
      fontSize: typography.sizes.md,
      color: theme.colors.onSurfaceVariant,
      marginTop: spacing.sm,
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    avatarLarge: {
      width: 80,
      height: 80,
      borderRadius: borderRadius.lg,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: spacing.md,
    },
    avatarText: {
      fontSize: 28,
      fontWeight: typography.weights.bold,
      color: "white",
    },
    bankName: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      marginBottom: spacing.sm,
    },
    bankCodeBadge: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
    },
    bankCodeText: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },
    statsCard: {
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.lg,
    },
    cardTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.semibold,
    },
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    statItem: {
      flex: 1,
      minWidth: "45%",
      alignItems: "center",
      padding: spacing.md,
      borderRadius: borderRadius.md,
      gap: spacing.xs,
    },
    statValue: {
      fontSize: typography.sizes.xxl,
      fontWeight: typography.weights.bold,
    },
    statLabel: {
      fontSize: typography.sizes.xs,
    },
    divider: {
      marginVertical: spacing.md,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    totalLabel: {
      fontSize: typography.sizes.md,
    },
    totalValue: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
    },
    infoCard: {
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginBottom: spacing.md,
    },
    infoList: {
      gap: spacing.md,
    },
    infoItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: typography.sizes.xs,
    },
    infoValue: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.medium,
    },
    signOutContainer: {
      marginTop: spacing.lg,
    },
    bottomSpacing: {
      height: spacing.xxl,
    },
  });
