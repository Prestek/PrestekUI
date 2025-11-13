import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthDividerProps } from "@/models/authModels";
import { AppText } from "../AppText";


export const AuthDivider: React.FC<AuthDividerProps> = ({ text = "OR" }) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <AppText style={styles.dividerText}>{text}</AppText>
      <View style={styles.dividerLine} />
    </View>
  );
};
