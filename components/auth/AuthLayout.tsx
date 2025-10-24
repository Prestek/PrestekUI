import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { MaterialIcons } from "@expo/vector-icons";

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
  const styles = createAuthStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <MaterialIcons
            name="credit-card"
            size={60}
            color={theme.colors.primary}
          />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>{children}</View>
      </View>
    </ScrollView>
  );
};
