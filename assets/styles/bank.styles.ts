import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { borderRadius, spacing, typography } from "./theme";

export const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surfaceVariant,
      paddingHorizontal: spacing.md,
    },
    resumeContainer: {
      paddingBottom: spacing.lg,
      paddingTop: spacing.sm,
      gap: spacing.lg,
    },
    sectionTitle: {
      fontSize: typography.sizes.xl2,
      fontFamily: typography.fontFamilyBold,
    },
    requestTitle: {
      fontSize: typography.sizes.lg,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.secondary,
    },
    metricsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    metricCard: {
      flexBasis: "48%",
      borderColor: theme.colors.background,
      backgroundColor: theme.colors.background,
    },
    chartCard: {
      borderColor: theme.colors.background,
      backgroundColor: theme.colors.background,
    },
    chartTitle: {
      fontSize: typography.sizes.md,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.primary,
    },
    chartSubtitle: {
      fontSize: typography.sizes.sm,
      color: theme.colors.secondary,
      marginTop: 2,
    },
    lastRequestCard: {
      padding: 16,
      borderRadius: 16,
      gap: 8,
      backgroundColor: theme.colors.background,
    },
    lastRequestHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardText: {
      fontSize: typography.sizes.md,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.secondary,
    },
    cardValue: {
      fontSize: typography.sizes.xl,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.secondary,
    },
    lastRequestValue: {
      fontSize: typography.sizes.sm,
    },
    chipText: {
      color: "#fff",
    },
    searchbar: {
      marginBottom: 8,
    },
    segmentedButtons: {
      marginBottom: 8,
    },
    listContent: {
      paddingBottom: 120,
      gap: 12,
    },
    requestCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
      marginBottom: 8,
      backgroundColor: theme.colors.background,
      padding: spacing.md,
      borderRadius: borderRadius.lg,
    },
    modalContainer: {
      marginHorizontal: 16,
      padding: 20,
      borderRadius: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "700",
      marginBottom: 8,
    },
    modalDivider: {
      marginVertical: 16,
    },
    modalActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12,
    },
    settingsCard: {
      padding: 24,
      borderRadius: 16,
      gap: 12,
    },
    logoutButton: {
      marginTop: 12,
    },
    signedOutContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      padding: 16,
    },
    linkRow: {
      flexDirection: "row",
      gap: 12,
    },
    authLink: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: "#1B365D",
    },
    authLinkText: {
      color: "#fff",
      fontWeight: "600",
    },
    userHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: spacing.md,
    },
    profileSection: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    logoSection: {
      justifyContent: "center",
      alignItems: "flex-start",
      width: 160,
      maxWidth: "40%",
    },
    profileAvatar: {
      width: 40,
      height: 40,
      borderRadius: borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
    },
    profileInitials: {
      fontSize: 15,
      fontWeight: "bold",

      color: "white",
    },
    profileInfo: {
      flex: 1,
    },
    userNameText: {
      fontSize: 18,
      fontWeight: "bold",
    },
    appLogo: {
      height: 40,
      width: "100%",
      maxWidth: "70%",
      resizeMode: "contain",
      flexShrink: 1,
    },
    applicationsContainer: {
      backgroundColor: theme.colors.background,
    },
    bankLogo: {
      width: spacing.xxl,
      height: spacing.xxl,
      borderRadius: borderRadius.full,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surfaceVariant,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
  });
