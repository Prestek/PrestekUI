import React from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { OAuthButtonProps } from "@/models/authModels";
import { AppText } from "../AppText";

const PROVIDER_CONFIG = {
  google: {
    icon: "google",
    iconFamily: "AntDesign" as const,
    color: "#DB4437",
    label: "Google",
  },
  facebook: {
    icon: "facebook",
    iconFamily: "FontAwesome" as const,
    color: "#1877F2",
    label: "Facebook",
  },
  microsoft: {
    icon: "windows",
    iconFamily: "FontAwesome" as const,
    color: "#00A4EF",
    label: "Microsoft",
  },
};

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  onPress,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const config = PROVIDER_CONFIG[provider];
  const IconComponent =
    config.iconFamily === "AntDesign" ? AntDesign : FontAwesome;

  return (
    <TouchableOpacity
      onPress={() => onPress(provider)}
      style={[styles.oauthButton, disabled && styles.buttonDisabled]}
      disabled={disabled}
    >
      <IconComponent
        name={config.icon as any}
        size={20}
        color={config.color}
        style={styles.oauthIcon}
      />
      <AppText style={styles.oauthButtonText}>
        Continuar con {config.label}
      </AppText>
    </TouchableOpacity>
  );
};
