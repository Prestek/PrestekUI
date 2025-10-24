import { StyleSheet } from "react-native";
import { spacing, borderRadius, typography } from "./theme";
import { MD3Theme } from "react-native-paper";

// Re-export theme for convenience
export * from "./theme";

// Function to create auth styles based on the current theme
export const createAuthStyles = (theme: MD3Theme) => StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: spacing.md,
  },

  // Typography
  title: {
    fontSize: 25,
    fontWeight: typography.weights.bold,
    marginTop: spacing.xs,
    textAlign: "center",
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: theme.colors.onSurfaceVariant,
    marginTop: spacing.sm,
    opacity: 0.7,
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
    borderWidth: 1.5,
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.outline,
    width: "100%",
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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.md,
    backgroundColor: theme.colors.surface,
    color: theme.colors.onSurface,
    width: "100%",
  },
  inputDisabled: {
    backgroundColor: theme.colors.surfaceDisabled,
    color: theme.colors.onSurfaceDisabled,
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
    color: theme.colors.onPrimary,
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
    color: theme.colors.onBackground,
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
    color: theme.colors.onPrimary,
  },
});

// Default export for backward compatibility (will use light theme)
export const authStyles = createAuthStyles({
  colors: {
    primary: "rgba(0, 0, 0, 1)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(223, 224, 255)",
    onPrimaryContainer: "rgb(0, 13, 95)",
    secondary: "rgb(0, 99, 154)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(206, 229, 255)",
    onSecondaryContainer: "rgb(0, 29, 50)",
    tertiary: "rgb(0, 104, 116)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(151, 240, 255)",
    onTertiaryContainer: "rgb(0, 31, 36)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(255, 255, 255)",
    onBackground: "rgb(27, 27, 31)",
    surface: "rgb(255, 255, 255)",
    onSurface: "rgb(27, 27, 31)",
    surfaceVariant: "rgb(227, 225, 236)",
    onSurfaceVariant: "rgb(173, 173, 173)",
    outline: "rgb(118, 118, 128)",
    outlineVariant: "rgb(199, 197, 208)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(243, 240, 244)",
    inversePrimary: "rgb(187, 195, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(255, 255, 255)",
      level2: "rgb(255, 255, 255)",
      level3: "rgb(255, 255, 255)",
      level4: "rgb(255, 255, 255)",
      level5: "rgb(255, 255, 255)",
    },
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    backdrop: "rgba(47, 48, 56, 0.4)",
  },
  roundness: 4,
  version: 3,
  isV3: true,
} as MD3Theme);
