import { MD3Theme } from "react-native-paper";
import { spacing, typography } from "./auth.styles";
import { StyleSheet } from "react-native";

export const createHomeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    logoContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: spacing.lg,
    },
    title: {
      fontSize: 23,
      fontWeight: typography.weights.bold,
      color: theme.colors.primary,
    },
    inputLabelContainer: {
      width: "100%",
      marginBottom: spacing.md,
    },
    subtitle: {
      fontSize: typography.sizes.md,
      color: theme.colors.onSecondary,
      marginTop: spacing.sm,
    },
    introContainer: {
      paddingVertical: spacing.md,
    },
    introTitle: {
      fontSize: 28,
      fontWeight: typography.weights.bold,
      color: theme.colors.secondary,
    },
  });
