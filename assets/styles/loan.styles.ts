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
    informationContent: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.md,
      paddingBottom: spacing["3xl"],
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
      backgroundColor: theme.colors.surfaceVariant,
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
      backgroundColor: theme.colors.outline,
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
    informationContentText: {
      justifyContent: "center",
      paddingTop: spacing.xl,
    },
    bottomContent: {
      marginTop: 'auto',
    },
    checkboxContainer: {
      width: '100%',
      marginVertical: 20,
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      width: '100%',
    },
    checkboxText: {
      flex: 1,
      marginLeft: 8,
      marginTop: 8,
      lineHeight: 20,
    },

    // LoanConfirmation styles
    confirmationIconContainer: {
      alignItems: "center",
      marginBottom: spacing.lg,
      marginTop: spacing.md,
    },
    confirmationTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
      textAlign: "center",
      marginBottom: spacing.xs,
    },
    confirmationSubtitle: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      marginBottom: spacing.lg,
    },
    confirmationItemRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    confirmationItemContent: {
      flex: 1,
    },
    infoCard: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.sm,
    },
    infoText: {
      flex: 1,
      fontSize: typography.sizes.sm,
      color: theme.colors.onPrimaryContainer,
      lineHeight: 20,
    },

    // Recommendation card styles
    recommendationCard: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.xl,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    recommendationHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    recommendationTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
    },
    recommendationBank: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
      marginBottom: spacing.xs,
    },
    recommendationReason: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onPrimaryContainer,
      marginBottom: spacing.sm,
      lineHeight: 20,
    },
    riskBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
      alignSelf: "flex-start",
    },
    riskText: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.semibold,
    },

    // Offer card recommended styles
    offerCardRecommended: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    recommendedBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
      alignSelf: "flex-start",
      marginBottom: spacing.sm,
    },
    recommendedBadgeText: {
      fontSize: typography.sizes.xs,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
    },
    bankLogoContainerRecommended: {
      backgroundColor: theme.colors.primary,
    },
    detailButtonRecommended: {
      backgroundColor: theme.colors.primary,
    },

    // Summary card styles
    summaryCard: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.xl,
      padding: spacing.md,
      marginTop: spacing.lg,
      marginBottom: spacing.md,
    },
    summaryHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    summaryTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
    },
    summaryText: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 22,
    },

    // Detail recommended styles
    detailRecommendedBadge: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
      backgroundColor: theme.colors.primaryContainer,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: borderRadius.full,
      marginBottom: spacing.md,
    },
    detailRecommendedText: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
    },
    detailBankLogoRecommended: {
      borderWidth: 3,
      borderColor: "#FFD700",
    },

    // Pros and Cons styles
    prosConsHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    prosConsItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.sm,
      marginBottom: spacing.sm,
      paddingRight: spacing.sm,
    },
    prosConsText: {
      flex: 1,
      fontSize: typography.sizes.sm,
      color: theme.colors.secondary,
      lineHeight: 20,
    },

    // LoanNoOffers styles
    noOffersContentContainer: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing["4xl"],
      paddingTop: spacing.xl,
      alignItems: "center",
    },
    noOffersIconContainer: {
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    noOffersIcon: {
      backgroundColor: theme.colors.primaryContainer,
    },
    noOffersTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
      textAlign: "center",
      marginBottom: spacing.sm,
    },
    noOffersSubtitle: {
      fontSize: typography.sizes.md,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.md,
      lineHeight: 24,
    },
    noOffersSummaryCard: {
      width: "100%",
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    noOffersSummaryTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
      marginBottom: spacing.md,
    },
    noOffersSummaryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    noOffersSummaryLabel: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
      flex: 1,
    },
    noOffersSummaryValue: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: theme.colors.secondary,
    },
    noOffersTipsCard: {
      width: "100%",
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginBottom: spacing.xl,
    },
    noOffersTipsHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    noOffersTipsTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
    },
    noOffersTipItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    noOffersTipText: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onPrimaryContainer,
      flex: 1,
    },
    noOffersButtonsContainer: {
      width: "100%",
      gap: spacing.md,
    },
    riskContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    // Modal de análisis de IA - Dialog de React Native Paper
    dialogContainer: {
      maxHeight: "65%",
      marginHorizontal: spacing.md,
    },
    dialogTitle: {
      paddingBottom: 0,
    },
    dialogScrollArea: {
      maxHeight: 300,
      paddingHorizontal: spacing.md,
    },
    modalHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    modalTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
    },
    modalSection: {
      marginBottom: spacing.lg,
    },
    modalSectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
      paddingTop: spacing.sm,
    },
    modalSectionTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: theme.colors.secondary,
    },
    modalBestOption: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
      marginBottom: spacing.xs,
    },
    modalReason: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurfaceVariant,
      lineHeight: 22,
    },
    modalRiskBadge: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.md,
      alignSelf: "flex-start",
    },
    modalRiskText: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
    },
    modalSummaryText: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurface,
      lineHeight: 24,
    },
    modalFooter: {
      padding: spacing.lg,
      borderTopWidth: 1,
      borderTopColor: theme.colors.outlineVariant,
    },
    detailAspectsCard: {
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
    },

    // LoanSuccess styles
    successIconContainer: {
      alignItems: "center",
      marginBottom: spacing.lg,
      marginTop: spacing.md,
    },
    successIconCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: "rgba(76, 175, 80, 0.15)",
      alignItems: "center",
      justifyContent: "center",
    },
    successTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
      textAlign: "center",
      marginBottom: spacing.sm,
    },
    successSubtitle: {
      fontSize: typography.sizes.md,
      color: theme.colors.onSurfaceVariant,
      textAlign: "center",
      marginBottom: spacing.lg,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.full,
      alignSelf: "center",
      marginBottom: spacing.xl,
    },
    statusText: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
    },
    creditScoreCard: {
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginBottom: spacing.md,
      alignItems: "center",
    },
    creditScoreHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      marginBottom: spacing.sm,
    },
    creditScoreTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: theme.colors.primary,
    },
    creditScoreValue: {
      fontSize: 48,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
      marginBottom: spacing.xs,
    },
    creditScoreDescription: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onPrimaryContainer,
      textAlign: "center",
    },
    nextStepsCard: {
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginBottom: spacing.md,
    },
    nextStepsTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
      marginBottom: spacing.md,
    },
    nextStepItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    nextStepNumber: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    nextStepNumberText: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.bold,
      color: theme.colors.inversePrimary,
    },
    nextStepText: {
      flex: 1,
      fontSize: typography.sizes.sm,
      color: theme.colors.onSurface,
    },
  });