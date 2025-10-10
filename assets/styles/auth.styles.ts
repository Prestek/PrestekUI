import { StyleSheet } from 'react-native'
import { colors, spacing, borderRadius, typography } from './theme'

// Re-export theme for convenience
export * from './theme'

export const authStyles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: spacing.md,
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: typography.weights.bold,
    marginTop: spacing.sm,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },

  // OAuth
  oauthContainer: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    backgroundColor: colors.white,
    borderColor: colors.borderLight,
    width: '100%',
  },
  oauthIcon: {
    marginRight: spacing.sm,
  },
  oauthButtonText: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.gray800,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: spacing.sm,
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    fontSize: typography.sizes.md,
    backgroundColor: colors.white,
    width: '100%',
  },
  inputDisabled: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textDisabled,
  },

  // Buttons
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: colors.gray400,
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold,
  },

  // Links
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  link: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  disabledText: {
    color: colors.textDisabled,
    opacity: 0.5,
  },
  
  // Terms
  termsText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    textAlign: 'center',
    marginTop: spacing.sm,
    opacity: 0.7,
  },

  // Error
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: '#C62828',
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
})
