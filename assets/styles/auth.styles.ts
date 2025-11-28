import { StyleSheet } from "react-native";
import { spacing, borderRadius, typography } from "./theme";
import { MD3Theme } from "react-native-paper";

export * from "./theme";

export const createAuthStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      paddingTop: spacing.lg,
    },
    gradient: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    introTitle: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.secondary,
    },
    logoContainer: {
    },
    // Typography
    title: {
      fontSize: typography.sizes.xl,
      fontWeight: typography.weights.bold,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.surface,
    },
    subtitle: {
      fontSize: typography.sizes.sm,
      color: theme.colors.inversePrimary,
      opacity: 0.9,
    },

    // OAuth
    oauthContainer: {
      marginBottom: spacing.xs,
      gap: spacing.sm,
      alignItems: "center",
    },
    oauthButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: borderRadius.lg,
      backgroundColor: theme.colors.surfaceVariant,
      padding: spacing.md,
      width: '100%',
    },
    oauthIcon: {
      marginRight: spacing.sm,
    },
    oauthButtonText: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      fontFamily: typography.fontFamilyBold,
      color: theme.colors.onSurfaceVariant,
    },
    oauthButtonTextDisabled: {
      color: theme.colors.onSurfaceDisabled,
    },

    // Divider
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: spacing.xs,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.outline,
    },
    dividerText: {
      marginHorizontal: spacing.sm,
      color: theme.colors.onSurfaceVariant,
      fontSize: typography.sizes.sm,
      
    },

    // Inputs
    inputContainer: {
      width: "100%",
      position: "relative",
    },
    inputLabel: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.medium,
      
      color: theme.colors.primary,
      marginBottom: spacing.xs,
      marginLeft: spacing.xs,
    },
    input: {
      width: "100%",
      overflow: "hidden",
    },

    inputWithLeftIcon: {
      paddingLeft: spacing.xxl,
    },
    inputWithRightIcon: {
      paddingRight: spacing.xxl,
    },
    iconLeft: {
      position: "absolute",
      left: spacing.md,
      top: "50%",
      transform: [{ translateY: -12 }],
      zIndex: 1,
    },
    iconRight: {
      position: "absolute",
      right: spacing.md,
      top: "50%",
      transform: [{ translateY: -12 }],
      zIndex: 1,
    },

    // Buttons
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      alignItems: "center",
      width: "100%",
    },
    buttonDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
      opacity: 0.6,
    },
    buttonText: {
      color: theme.colors.inversePrimary,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      
    },
    buttonTextDisabled: {
      color: theme.colors.onSurfaceDisabled
    },
    // Links
    linkContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    linkText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: typography.sizes.sm,
      
    },
    link: {
      color: theme.colors.primary,
      fontWeight: typography.weights.semibold,
      
    },
    disabledText: {
      color: theme.colors.onSurfaceDisabled,
      opacity: 0.5,
    },

    // Terms
    termsText: {
      color: theme.colors.onSurfaceVariant,
      fontSize: typography.sizes.md,
      
      width: '100%',
    },
    // Error
    errorContainer: {
      backgroundColor: theme.colors.errorContainer,
      padding: spacing.md,
      borderRadius: borderRadius.md,
      marginBottom: spacing.md,
    },
    errorText: {
      color: theme.colors.onErrorContainer,
      fontSize: typography.sizes.sm,
      
      textAlign: "center",
    },
    buttonOut: {
      backgroundColor: theme.colors.error,
      paddingVertical: 14,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      alignItems: "center",
      marginTop: 20,
    },
    buttonOutText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      
    },
    otpContainer: {
      paddingVertical: spacing.sm,
    },
    cellRoot: {
      width: 45,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: borderRadius.md,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      borderWidth: 1,
      marginHorizontal: 4,
    },
    cellText: {
      color: theme.colors.onSurface,
      fontSize: 24,
      
      textAlign: "center",
    },
    focusCell: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    otp: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.md,
    },
    innerContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
    formContainerWrapper: {
      flex: 1,
      gap: spacing.md,
      justifyContent: "space-between",
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
      marginTop: spacing.xl,
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: borderRadius.lg,
      borderTopRightRadius: borderRadius.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    introContainer: {
      paddingHorizontal: spacing.md,
    },
    introBranding: {

    },
    introBrandingLogo: {
      width: 150, height: 60, resizeMode: 'contain', margin: 0, padding: 0, marginBottom: -spacing.sm, marginLeft: -15, 
    },
    otpContent: {
      gap: spacing.md,
    },
  });
