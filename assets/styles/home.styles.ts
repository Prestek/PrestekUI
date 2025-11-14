import { MD3Theme } from "react-native-paper";
import { borderRadius, spacing, typography } from "./auth.styles";
import { StyleSheet } from "react-native";

export const createHomeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    scrollViewContent: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.colors.background,
    },
    logoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: spacing.lg,
    },
    gradient: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    gradientContainer:{
      padding: spacing.md,
    },
    title: {
      fontSize: 23,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
    },
    inputLabelContainer: {
      width: "100%",
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: typography.sizes.md,
      color: theme.colors.onSecondary,
      flex: 1,
      flexShrink: 1,
    },
    introContainer: {
      gap: spacing.md,
      marginTop: spacing.md,
    },
    introTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.secondary,
    },
    itemsCarousel: {
      marginTop: spacing.md,
    },
    itemsCarouselContent: {
      flexDirection: "row",
    },
    itemSlide: {
      width: 200,
      marginRight: spacing.md,
    },
    itemSlideLast: {
      marginRight: 0,
    },
    formTitleContainer: {
      padding: spacing.md,
      backgroundColor: 'rgb(255, 252, 217)',
      borderRadius: borderRadius.lg,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.md,
    },
    homeContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    email: {
      fontSize: 18,
      
      marginBottom: 10,
      textAlign: 'center',
    },
    linkContainer: {
      flexDirection: 'row',
      gap: 20,
      marginTop: 20,
    },
    link: {
      padding: 15,
      borderRadius: 5,
      minWidth: 100,
    },
    linkText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      
      textAlign: 'center',
    },
    // Header styles
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
      marginTop: 15
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      
    },
    headerIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFD700',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: 12,
      
      color: '#8B4513',
    },
    headerSubtitle: {
      fontSize: 14,
      
      marginBottom: 24,
    },
    // Loan card styles
    loanCard: {
      borderRadius: 12,
      borderWidth: 1,
      padding: 20,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bankLabel: {
      fontSize: 14,
      marginBottom: 4,
    },
    bankName: {
      fontWeight: typography.weights.bold,
      fontFamily: typography.fontFamilyBold,
    },
    amountSection: {
      marginVertical: 3,
    },
    amountValue: {
      fontSize: 24,
      fontWeight: 'bold',
      
    },
    amountLabel: {
      fontSize: 14,
      
      marginTop: 4,
    },
    interestSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 8,
    },
    bankLogo: {
      width: spacing.xxl,
      height: spacing.xxl,
      borderRadius: borderRadius.md,
      backgroundColor: theme.colors.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      fontSize: spacing.lg,
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
    interestInfo: {
      alignItems: 'flex-end',
    },
    interestValue: {
      fontSize: 18,
      fontWeight: 'bold',
      
    },
    interestLabel: {
      fontSize: 12,
      
      marginTop: 2,
    },
    itemsHorizontal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dateItem: {
      flex: 1,
    },
    dateLabel: {
      fontSize: 12,
      
      marginBottom: 4,
    },
    dateValue: {
      fontSize: 14,
      fontWeight: '500',
      
    },
    dateItemLeft: {
      alignSelf: 'flex-end'
    },
    progressSection: {
      padding: spacing.md,
      borderRadius: borderRadius.lg,
    },
    progressContainer:{
      backgroundColor: theme.colors.primary,
      padding: spacing.md,
      borderRadius: borderRadius.lg,
    },
    progressTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      
      marginBottom: 12,
    },
    progressBar: {
      height: 8,
      backgroundColor: theme.colors.surface,
      borderRadius: 4,
      marginBottom: 12,
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    progressInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progressPercentage: {
      fontSize: 16,
      fontWeight: 'bold',
      
    },
    progressPaid: {
      fontSize: 14,
      
    },
    progressRemaining: {
      fontSize: 14,
      
    },

    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    seeAllLink: {
      fontSize: 14,
      fontWeight: '500',
      
    },
    // Next Payment card styles
    nextPaymentCard: {
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
    },
    nextPaymentTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 8,
    },
    nextPaymentLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    nextPaymentIcon: {
      width: 30,
      height: 30,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextPaymentIconText: {
      fontSize: 20,
      fontWeight: 'bold',
      
      color: '#FF3B30',
    },
    nextPaymentTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      
      color: 'white',
      marginLeft: 8
    },
    nextPaymentAmount: {
      fontSize: 18,
      fontWeight: 'bold',
      
      color: 'white',
    },
    nextPaymentMiddle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 8,
    },
    nextPaymentDueLabel: {
      fontSize: 14,
      
      color: 'white',
    },
    nextPaymentDueDate: {
      fontSize: 14,
      
      color: 'white',
    },
    nextPaymentBottom: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      alignItems: 'center',
    },
    nextPaymentCountdown: {
      fontSize: 14,
      
      color: 'white',
      fontWeight: '500',
    },
    // User Header styles
    userHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: spacing.xl,
      paddingTop: spacing.xs
    },
    profileSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    profileAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    profileInitials: {
      fontSize: 18,
      fontWeight: 'bold',
      
      color: 'white',
    },
    profileInfo: {
      flex: 1,
    },
    greetingText: {
      fontSize: 14,
      
      marginBottom: 2,
    },
    userNameText: {
      fontSize: 18,
      fontWeight: 'bold',
      
    },
    notificationButton: {
      padding: 8,
    },
    notificationIcon: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bellIcon: {
      fontSize: 24,
    },
    notificationBadge: {
      position: 'absolute',
      top: -4,
      right: -4,
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'white',
    },
    badgeText: {
      fontSize: 12,
      fontWeight: 'bold',
      
      color: 'white',
    },
    divider:{
      width: "100%",
      backgroundColor: theme.colors.primary,
    },
    formContainer: {
      flex: 1,
      width: "100%",
      gap: spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
    },
    inputDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
      color: theme.colors.onSurfaceDisabled,
    },
    selectContainer: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      padding: spacing.md,
      borderRadius: borderRadius.lg,
    },
    selectLabel: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      
      color: theme.colors.primary,
      marginBottom: spacing.xs,
    },
    selectOptions: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    selectOption: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.md,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surface,
      fontSize: typography.sizes.sm,
      
      color: theme.colors.onSurface,
      textAlign: "center",
      minWidth: 100,
    },
    selectOptionActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      color: theme.colors.surface,
    },
    basicInformation: {
      padding: spacing.md,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.md,
      backgroundColor: theme.colors.inverseOnSurface,
    },
    basicInformationTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: typography.weights.bold,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.primary,
      marginBottom: spacing.sm,
    },
    basicInformationContentText: {
      fontSize: typography.sizes.sm,
      color: theme.colors.onPrimary,
    },
    basicInformationContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.sm,
    },
    titleContainer: {
      flexDirection: "row",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    mainTitle:{
      alignItems: "center",
    },
    formContainerWrapper: {
      position: "relative",
      marginTop: spacing.lg,
    },
    formLabel: {
      position: "absolute",
      top: -12,
      left: spacing.md,
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.sm,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      
      color: theme.colors.primary,
      zIndex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    formButtonContainer: {
      marginTop: spacing.lg,
    },
    radioContainer: {
      gap: spacing.sm,
    },
    radioItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.xs,
    },
    radioLabel: {
      fontSize: typography.sizes.md,
      
      color: theme.colors.onSurface,
      marginLeft: spacing.xs,
    },
    resumeContrainer: {
      borderRadius: borderRadius.lg,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: spacing.md,
    },
    alignTextRight: {
      textAlign: "right",
    },
    cardHeader: {
      gap: spacing.xs,
    },
    headerContainer: {
      paddingHorizontal: spacing.md,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
    },
    cardContent: {
      paddingVertical: spacing.sm,
    },
    bankColor: {
      color: theme.colors.primary,
      fontSize: typography.sizes.md,
    },
    itemContainer: {
      gap: spacing.sm,
      justifyContent: "space-between",
      padding: spacing.md,
      borderRadius: borderRadius.lg,
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.outline,
    },
    itemTitle: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.primary,
    },
    itemContent: {
      gap: spacing.sm,

    },
  });

