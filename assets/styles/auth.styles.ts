import { StyleSheet } from "react-native";
import { spacing, borderRadius, typography } from "./theme";
import { MD3Theme } from "react-native-paper";

export * from "./theme";

export const createAuthStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      backgroundColor: theme.colors.background,
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
      paddingBottom: spacing.xl,
    },
    logoContainer: {
      paddingTop: spacing.xl,
      paddingBottom: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 200,
    },
    formContainer: {
      width: "100%",
      alignItems: "center",
      paddingBottom: spacing.sm,
    },

    // Typography
    title: {
      fontSize: 28,
      fontWeight: typography.weights.bold,
      marginTop: spacing.xs,
      textAlign: "center",
      color: theme.colors.primary,
    },
    subtitle: {
      fontSize: typography.sizes.md,
      color: theme.colors.onSecondary,
      marginTop: spacing.sm,
      opacity: 0.9,
      textAlign: "center",
      paddingHorizontal: spacing.lg,
    },

    // OAuth
    oauthContainer: {
      width: "100%",
      marginBottom: spacing.sm,
    },
    oauthButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 14,
      paddingHorizontal: spacing.md,
      borderRadius: borderRadius.lg,
      marginBottom: spacing.sm,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.outline,
      width: "100%",
      borderWidth: 1,
      borderStyle: "solid",
    },
    oauthIcon: {
      marginRight: spacing.sm,
    },
    oauthButtonText: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: theme.colors.onSurfaceVariant,
    },

    // Divider
    divider: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: spacing.md,
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
      marginBottom: spacing.sm,
    },
    inputLabel: {
      fontSize: typography.sizes.sm,
      fontWeight: typography.weights.medium,
      color: theme.colors.primary,
      marginBottom: spacing.xs,
      marginLeft: spacing.xs,
    },
    input: {
      backgroundColor: theme.colors.surface,
      width: "100%",
      borderRadius: borderRadius.lg,
      overflow: "hidden",
    },

    inputWithLeftIcon: {
      paddingLeft: spacing.xxl,
    },
    inputWithRightIcon: {
      paddingRight: spacing.xxl,
    },
    inputDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
      color: theme.colors.onSurfaceDisabled,
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
      marginTop: spacing.md,
      width: "100%",
    },
    buttonDisabled: {
      backgroundColor: theme.colors.surfaceDisabled,
      opacity: 0.6,
    },
    buttonText: {
      color: theme.colors.surface,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
    },

    // Links
    linkContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacing.md,
      marginBottom: spacing.md,
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
      fontSize: typography.sizes.xs,
      textAlign: "center",
      marginTop: spacing.sm,
      opacity: 0.7,
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

    // Profile form
    selectContainer: {
      width: "100%",
      marginBottom: spacing.md,
    },
    selectLabel: {
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.semibold,
      color: theme.colors.primary,
      marginBottom: spacing.sm,
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
      paddingHorizontal: 20,
      paddingVertical: 30,
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
      justifyContent: "center",
      alignItems: "center",
    },
    innerContainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
  });
