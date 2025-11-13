import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { borderRadius, spacing, typography } from "./theme";

export const createNavigationStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
          },
          appbar: {
            elevation: 0,
            backgroundColor: theme.colors.background,

          },
          appbarElevated: {
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          backButtonContainer: {
            backgroundColor: theme.colors.inverseOnSurface,
            borderRadius: borderRadius.lg,
            overflow: 'hidden',
          },
          titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: spacing.sm,
            justifyContent: 'space-between',
          },
          title: {
            fontSize: typography.sizes.lg,
            fontWeight: 'bold',
            
            color: theme.colors.primary,
          },
          progressContainer: {
            backgroundColor: theme.colors.background,
            paddingBottom: spacing.sm,
            paddingTop: spacing.xs,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.outlineVariant,
          },
          progressStepTitle: {
            fontSize: typography.sizes.md,
            
            color: theme.colors.onSurface,
            fontWeight: '600',
            marginBottom: spacing.sm,
            textAlign: 'center',
          },
          stepsContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
          },
          stepItemContainer: {
            alignItems: 'center',
          },
          stepWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          stepCircleContainer: {
            alignItems: 'center',
            minWidth: 60,
          },
          stepConnector: {
            width: spacing['4xl'],
            height: 1,
            backgroundColor: theme.colors.outlineVariant,
          },
          stepConnectorActive: {
            backgroundColor: theme.colors.primary,
          },
          stepCircle: {
            width: 30,
            height: 30,
            borderRadius: borderRadius.full,
            backgroundColor: theme.colors.surfaceVariant,
            borderWidth: 2,
            borderColor: theme.colors.outlineVariant,
            justifyContent: 'center',
            alignItems: 'center',
          },
          stepCircleActive: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          },
          stepCircleCompleted: {
            backgroundColor: 'transparent',
            borderColor: theme.colors.primary,
          },
          stepNumber: {
            fontSize: typography.sizes.sm,
            fontWeight: 'bold',
          },
          stepNumberActive: {
            color: theme.colors.surface,
          },
          stepNumberCompleted: {
            color: theme.colors.primary,
          },
          stepLabel: {
            fontSize: typography.sizes.xs,
            
            color: theme.colors.onSurfaceVariant,
            marginTop: spacing.xs,
            textAlign: 'center',
            maxWidth: 80,
          },
          stepLabelActive: {
            color: theme.colors.primary,
            fontWeight: '600',
          },
          titleContainerWithBackButton: {
            justifyContent: 'flex-start',
          },
          titleContainerWithExitButton: {
            justifyContent: 'flex-end',
          },
    });