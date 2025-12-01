import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { borderRadius, spacing, typography } from "./theme";

export const createLoanStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    loanContainer: { flex: 1, justifyContent: "space-between", paddingBottom: spacing["3xl"], paddingHorizontal: spacing.md },
    requestContainer: {
      flex: 1,
      paddingTop: spacing.xl,
    },
    requestTitle: {
      fontSize: spacing.lg,
      fontWeight: "bold",
      color: theme.colors.secondary,
      marginBottom: 8,
    },
    requestSubtitle: {
      fontSize: 16,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 32,
    },
    formContainer: {
      flex: 1,
      gap: spacing.md,
    },
    inputGroup: {
      marginBottom: 24,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.onBackground,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      paddingHorizontal: 16,
      height: 56,
    },
    currencySymbol: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.onSurfaceVariant,
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 18,
      color: theme.colors.onSurface,
      fontWeight: "600",
    },
    installmentsText: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginLeft: 8,
    },
    quickOptions: {
      marginTop: spacing.xs,
    },
    quickOptionsLabel: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      marginBottom: 12,
    },
    quickOptionsRow: {
      flexDirection: "row",
      gap: 12,
    },
    quickOption: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
    },
    quickOptionActive: {
      backgroundColor: theme.colors.primaryContainer,
      borderColor: theme.colors.primary,
    },
    quickOptionText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.onSurface,
    },
    quickOptionTextActive: {
      color: theme.colors.primary,
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.md,
      alignItems: "center",
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
      opacity: 0.5,
    },
    submitButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.onPrimary,
    },

    searchingContainer: {
      alignItems: "center",
      justifyContent: "space-between",
    },
    searchingCircle: {
      width: spacing["3xl"],
      height: spacing["3xl"],
      borderRadius: borderRadius.full,
      backgroundColor: theme.colors.primaryContainer,
      justifyContent: "center",
      alignItems: "center",
    },
    searchingCircleContainer: {
      paddingTop: spacing.xl,
      paddingBottom: spacing.md,
      justifyContent: "center",
      alignItems: "center",
    },
    searchingTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.onPrimary,
      textAlign: "center",
      marginBottom: 12,
    },
    searchingSubtitle: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      marginBottom: 40,
      paddingHorizontal: 20,
    },
    stepsContainer: {
      width: "100%",
      marginBottom: spacing.sm,
    },
    stepCard: {
      flexDirection: "row",
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      alignItems: "center",
    },
    stepIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.tertiary,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 16,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.onPrimary,
      marginBottom: 4,
    },
    stepSubtitle: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
    },
    searchingFooter: {
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      paddingHorizontal: 32,
      marginTop: "auto",
    },

    // LoanOptions styles
    optionsHeader: {
      gap: spacing.xs,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    optionsTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
    },
    optionsSubtitle: {
      fontSize: 14,
      color: theme.colors.onSurfaceVariant,
    },
    optionsList: {
      flex: 1,
      backgroundColor: theme.colors.surfaceVariant,
    },
    optionsListContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing["4xl"],
      paddingTop: spacing.md,
    },
    resultsCount: {
      fontSize: typography.sizes.lg,
      color: theme.colors.secondary,
      marginBottom: spacing.md,
    },
    offerCard: {
      borderRadius: borderRadius.xl,
      padding: spacing.md,
      marginBottom: spacing.xl,
    },
    offerHeader: {
      marginBottom: 16,
    },
    bankInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    bankLogoContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: theme.colors.primaryContainer,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    bankLogoText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    bankName: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.onSurface,
      marginBottom: 4,
    },
    approvalBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    approvalText: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    offerDetails: {
      marginBottom: 16,
    },
    offerDetailRow: {
      flexDirection: "row",
      marginBottom: 12,
      gap: 16,
    },
    offerDetailItem: {
      flex: 1,
    },
    offerDetailLabel: {
      fontSize: typography.sizes.xs,
      color: theme.colors.onSecondary,
      marginBottom: 4,
    },
    offerDetailValue: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.secondary,
    },
    offerDetailValueHighlight: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    detailButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.tertiary,
      borderRadius: 8,
      paddingVertical: 12,
      gap: 8,
    },
    detailButtonText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.onPrimary,
    },

    // LoanDetail styles
    detailHeader: {
      flexDirection: "row",
      alignItems: "center",
      padding: 24,
      paddingTop: 16,
      gap: 16,
    },
    detailHeaderTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: "bold",
      color: theme.colors.secondary,
    },
    detailContent: {
      flex: 1,
    },
    detailContentContainer: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing["4xl"],
      paddingTop: spacing.md,
    },
    detailBankCard: {
      backgroundColor: theme.colors.tertiary,
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      marginBottom: 20,
    },
    detailBankLogoContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    detailBankLogoText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.inversePrimary,
    },
    detailBankName: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.secondary,
      marginBottom: 8,
    },
    detailApprovalBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    detailApprovalText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.colors.primary,
    },
    detailSummaryCard: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
    },
    detailSectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.secondary,
      marginBottom: 16,
    },
    detailSummaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    detailSummaryLabel: {
      fontSize: 14,
      color: theme.colors.secondary,
    },
    detailSummaryLabelBold: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.onPrimary,
    },
    detailSummaryValue: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.secondary,
    },
    detailSummaryValueHighlight: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.onPrimary,
    },
    detailDivider: {
      height: 1,
      backgroundColor: theme.colors.outlineVariant,
      marginVertical: 12,
    },
    detailBreakdownCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    detailBreakdownItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    detailBreakdownIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    detailBreakdownContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    detailBreakdownLabel: {
      fontSize: 14,
      color: theme.colors.secondary,
    },
    detailBreakdownValue: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.secondary,
    },
    detailBenefitsCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      elevation: 2,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    detailBenefitItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      gap: 12,
    },
    detailBenefitText: {
      fontSize: 14,
      color: theme.colors.onSurface,
    },
    detailFooter: {
      paddingTop: spacing.xl,
    },
    acceptButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: "center",
    },
    acceptButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.onPrimary,
    },
  });