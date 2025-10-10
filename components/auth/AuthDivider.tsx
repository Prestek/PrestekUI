import React from "react";
import { View, Text } from "react-native";
import { authStyles } from "@/assets/styles/auth.styles";

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({ text = "OR" }) => {
  return (
    <View style={authStyles.divider}>
      <View style={authStyles.dividerLine} />
      <Text style={authStyles.dividerText}>{text}</Text>
      <View style={authStyles.dividerLine} />
    </View>
  );
};
