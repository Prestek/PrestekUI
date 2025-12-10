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
            alignItems: 'center',
            padding: 0,
            marginTop: -20,
            paddingVertical: spacing.md,
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
          iconButtonStyle: {
            margin: 0,
            padding: 0,
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

          },
          progressStepTitle: {
            fontSize: typography.sizes.lg,
            color: theme.colors.secondary,
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
            width: 12,
            height: 12,
            borderRadius: borderRadius.full,
            backgroundColor: theme.colors.outlineVariant,
            borderWidth: 2,
            borderColor: theme.colors.outlineVariant,
          },
          stepCircleActive: {
            width: 16,
            height: 16,
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          },
          stepCircleCompleted: {
            backgroundColor: theme.colors.primary,
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
          titleContainerCentered: {
            justifyContent: 'center',
          },
          headerLayout: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: spacing.sm,
          },
          headerSide: {
            minWidth: 48,
            alignItems: 'center',
          },
          headerCenter: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          },
    });