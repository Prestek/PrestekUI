import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { authStyles } from "@/assets/styles/auth.styles";

type OAuthProvider = "google" | "facebook" | "microsoft";

interface OAuthButtonProps {
  provider: OAuthProvider;
  onPress: (provider: OAuthProvider) => void;
  disabled?: boolean;
}

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
  const config = PROVIDER_CONFIG[provider];
  const IconComponent =
    config.iconFamily === "AntDesign" ? AntDesign : FontAwesome;

  return (
    <TouchableOpacity
      onPress={() => onPress(provider)}
      style={[authStyles.oauthButton, disabled && authStyles.buttonDisabled]}
      disabled={disabled}
    >
      <IconComponent
        name={config.icon as any}
        size={20}
        color={config.color}
        style={authStyles.oauthIcon}
      />
      <Text style={authStyles.oauthButtonText}>
        Continue with {config.label}
      </Text>
    </TouchableOpacity>
  );
};
