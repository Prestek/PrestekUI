import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthLayoutProps } from "@/models/authModels";
import Logo from "../Logo";


export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title = "Prestek",
  subtitle = "Your credit management platform",
  icon = "credit-card",
  children,
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.inversePrimary, theme.colors.tertiary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <View style={styles.innerContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Logo width={100} height={100} color={theme.colors.primary} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>{children}</View>
      </View>
    </View>
  );
};
