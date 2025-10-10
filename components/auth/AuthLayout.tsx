import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { authStyles } from "@/assets/styles/auth.styles";

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title = "Prestek",
  subtitle = "Tu plataforma de gestión de créditos",
  children,
}) => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={authStyles.scrollContainer}>
      <View style={authStyles.container}>
        {/* Logo Section */}
        <View style={authStyles.logoContainer}>
          <Avatar.Icon
            size={120}
            icon="credit-card"
            style={{ backgroundColor: theme.colors.primary }}
          />
          <Text style={authStyles.title}>{title}</Text>
          <Text style={authStyles.subtitle}>{subtitle}</Text>
        </View>

        {/* Form Section */}
        <View style={authStyles.formContainer}>{children}</View>
      </View>
    </ScrollView>
  );
};
