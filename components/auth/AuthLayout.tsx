import React from "react";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthLayoutProps } from "@/models/authModels";
import { AppText } from "../AppText";

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title = "Prestek",
  subtitle = "Conectando personas con oportunidades financieras",
  icon = "credit-card",
  introTitle = "Inicia sesión en tu cuenta",
  children,
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.introContainer}>
        <Image
          source={require("@/assets/logo/blanco.png")}
          style={styles.introBrandingLogo}
        />
        <AppText style={styles.subtitle}>{subtitle}</AppText>
      </View>
      {/* Form Section */}
      <View style={styles.formContainerWrapper}>
        <AppText style={styles.introTitle}>{introTitle}</AppText>
        {children}
      </View>
    </View>
  );
};
