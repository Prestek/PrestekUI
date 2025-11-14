import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthLayoutProps } from "@/models/authModels";
import Logo from "../Logo";
import { AppText } from "../AppText";

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title = "Prestek",
  subtitle = "Connecting people with financial opportunities",
  icon = "credit-card",
  introTitle = "Login to your account",
  children,
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Logo Section */}
        <View style={styles.introContainer}>
          <View style={styles.logoContainer}>
            {/*<Image source={require('@/assets/logoBlanco.png')} style={{ width: 60, height: 60 }} />*/}
            <Logo width={40} height={40} color={theme.colors.surface} />
           <AppText style={styles.title}>{title}</AppText>
          </View>
          <AppText style={styles.subtitle}>{subtitle}</AppText>
        </View>
        {/* Form Section */}
        <View style={styles.formContainerWrapper}>
          <AppText style={styles.introTitle}>{introTitle}</AppText>
          {children}
        </View>
      </View>
    </View>
  );
};
