import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { spacing } from "./theme";

export const createScanStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
          appbar: {
            backgroundColor: theme.colors.background,
            elevation: 0,
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
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          },
          headerSection: {
            paddingHorizontal: spacing.md,
            paddingBottom: spacing.sm
          },
          title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.colors.secondary,
            marginBottom: 8,
            textAlign: 'center',
          },
          subtitle: {
            fontSize: 16,
            color: theme.colors.onSecondary,
            textAlign: 'center',
          },
          cameraWrapper: {
            flex: 1,
            paddingHorizontal: 20,
          },
          cameraContainer: {
            flex: 1,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
          },
          silhouetteOverlay: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
          },
          dashedBorder: {
            width: '85%',
            aspectRatio: 0.6,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: theme.colors.primary,
            borderRadius: 8,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          },
          instructionsSection: {
            paddingHorizontal: 20,
            paddingVertical: 16,
            gap: 12,
          },
          instructionItem: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
          },
          instructionText: {
            flex: 1,
            fontSize: 14,
            color: theme.colors.onSecondary,
            lineHeight: 20,
          },
          actionsSection: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingBottom: 20,
            gap: 12,
          },
          buttonSecondary: {
            flex: 1,
            backgroundColor: theme.colors.primary,
            borderWidth: 1,
            borderColor: '#E0E0E0',
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
            marginTop: 16,
            backgroundColor: '#007AFF',
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
          },
          buttonText: {
            color: 'white',
            fontWeight: '600',
          },
    });