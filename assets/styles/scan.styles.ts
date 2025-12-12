import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { borderRadius, spacing, typography } from "./theme";

export const createScanStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
          titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            flex: 1,
            marginLeft: 8,
          },
          appbarTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            
            color: theme.colors.primary,
          },
          center: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          headerSection: {
            gap: spacing.md,
            paddingTop: spacing.lg,
          },
          title:{
            fontSize: typography.sizes.xl,
            fontWeight: 'bold',    
            color: theme.colors.secondary,
          },
          subtitle: {
            fontSize: typography.sizes.md, 
            color: theme.colors.secondary,
          },
          cameraWrapper: {
            flex: 1,
          },
          cameraContainer: {
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
          },
          topOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.md,
            paddingTop: spacing.xxl,
            paddingBottom: spacing.md,
            pointerEvents: 'box-none',
          },
          topButton: {
            width: 48,
            height: 48,
            borderRadius: borderRadius.lg,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'auto',
          },
          bottomOverlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            paddingTop: spacing.sm,
            pointerEvents: 'box-none',
          },
          bottomPanel: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: spacing.md,
            gap: spacing.md,
          },
          silhouetteOverlay: {
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
            paddingBottom: spacing.xxl,
          },
          dashedBorder: {
            width: '70%',
            aspectRatio: 0.63,
            borderWidth: 3,
            borderStyle: 'dashed',
            borderColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 12,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          },
          silhouetteText: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: typography.sizes.md,
            fontWeight: '600',
            
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            borderRadius: borderRadius.md,
            transform: [{ rotate: '90deg' }],
          },
          instructionsSection: {
            gap: spacing.md,
            paddingBottom: spacing.md,
          },
          instructionSectionCamera:{
            gap: spacing.md,
          },
          instructionItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: spacing.md,
          },
          instructionText: {
            flex: 1,
            fontSize: typography.sizes.sm,
            
            color: theme.colors.inversePrimary,
            lineHeight: 20,
          },
          actionsSection: {
            gap: spacing.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: spacing.md,

          },
          buttonSecondary: {
            flex: 1,
            backgroundColor: theme.colors.primary,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          },
          buttonSecondaryText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            
          },

          button: {
            width: '100%',
          },
          fullWidthButton: {
            width: '100%',
            alignSelf: 'stretch',
          },
          buttonLabelStyle: {
            fontSize: typography.sizes.md,
            fontWeight: '600',
            
            lineHeight: 24,
            textAlign: 'center',
          },
          buttonText: {
            color: 'white',
            fontWeight: '600',
            
          },
          contentContainer: {
            flex: 1,
          },
          instructionItemContainer:{
            backgroundColor: theme.colors.primary,
            padding: spacing.lg,
            borderRadius: borderRadius.lg,
            gap: spacing.md,
          },
          buttonWarning:{
            backgroundColor: theme.colors.inverseOnSurface,
            borderWidth: 1,
            borderColor: theme.colors.primary,
          },
          warningContainer:{
            flex: 1,
            paddingHorizontal: spacing.md,
            gap: spacing.md,
            backgroundColor: theme.colors.background,
          },
          loadingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.md,
          },
          permissionDeniedContainer: {
            flex: 1,
            paddingHorizontal: spacing.md,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.background,
          },
          contentWrapper: {
            alignItems: 'center',
            paddingHorizontal: 24,
            gap: 20,
        },
        iconContainer: {
            width: 120,
            height: 120,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
        },
        mainTitle: {
            textAlign: 'center',
            fontSize: typography.sizes.xl,
        },
        description: {
            textAlign: 'center',
            lineHeight: 22,
            opacity: 0.8,
        },
        infoBox: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: spacing.md,
            padding: spacing.md,
            borderRadius: borderRadius.lg,
            marginTop: 8,
        },
        infoText: {
            flex: 1,
            fontSize: typography.sizes.sm,
            lineHeight: 20,
        },
        buttonContainer: {
            width: '100%',
            paddingHorizontal: spacing.md,
            marginTop: spacing.md,
        },
    });