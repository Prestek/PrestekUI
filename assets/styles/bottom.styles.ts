import { MD3Theme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { spacing } from "./theme";

export const createBottomNavigationStyles = (theme: MD3Theme) =>
    StyleSheet.create({
        bottomBar: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 68,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderColor: theme.colors.outline,
          }
    });