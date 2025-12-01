import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { borderRadius, spacing, typography } from "./theme";

export const createPaymentStyles = (theme: MD3Theme) =>
    StyleSheet.create({
      container: {
        flex: 1,
      },
      historyTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: theme.colors.secondary,
      },
      paymentItem: {
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: borderRadius.lg,
      },
      withoutElevantion:{
        borderWidth: 1,
        borderColor: theme.colors.outline,
        borderRadius: borderRadius.lg,
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
        fontWeight: typography.weights.bold,
        marginLeft: spacing.sm,
        color: theme.colors.secondary,
      },
      paymentDate: {
        fontSize: typography.sizes.sm,
        marginBottom: spacing.xs,
        color: theme.colors.secondary
      },
      paymentStatus: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
      },
      paymentAmount: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        color: theme.colors.secondary
      },
      historyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
      },
      historyContent: {
        paddingTop: spacing.sm,
        gap: spacing.lg,
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surfaceVariant,
      },
      horizontalItems: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      labelText: {
        color: theme.colors.onSecondary,
        fontSize: typography.sizes.xs,
      },
    });