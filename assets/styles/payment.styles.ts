import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { borderRadius, spacing, typography } from "./theme";

export const createPaymentStyles = (theme: MD3Theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
      },
      historyTitle: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        fontFamily: typography.fontFamilyBold,
        color: theme.colors.onPrimary,
      },
      paymentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: spacing.md,
      },
      paymentIndicator: {
        width: 4,
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
        marginRight: 12,
      },
      paymentContent: {
        flex: 1,
      },
      paymentType: {
        fontSize: typography.sizes.md,
        fontWeight: typography.weights.semibold,
        marginBottom: spacing.xs,
      },
      paymentDate: {
        fontSize: typography.sizes.sm,
        marginBottom: spacing.xs,
      },
      paymentStatus: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
      },
      paymentAmount: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        fontFamily: typography.fontFamilyBold,
      },
      historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        backgroundColor: theme.colors.tertiary,
      },
      historyContent: {
        padding: spacing.md,
        paddingTop: spacing.xl,
        borderTopRightRadius: borderRadius.xl,
        borderTopLeftRadius: borderRadius.xl,
      },
      filterButton: {
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: theme.colors.onPrimary,
      },
      bankLogo: {
        width: spacing.xxl,
        height: spacing.xxl,
        borderRadius: borderRadius.full,
        backgroundColor: theme.colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });