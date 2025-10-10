import React from "react";
import { View } from "react-native";
import { OAuthButton } from "./OAuthButton";
import { authStyles } from "@/assets/styles/auth.styles";

interface OAuthButtonsProps {
  onPress: (provider: "google" | "facebook" | "microsoft") => void;
  disabled?: boolean;
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({
  onPress,
  disabled,
}) => {
  return (
    <View style={authStyles.oauthContainer}>
      <OAuthButton provider="google" onPress={onPress} disabled={disabled} />
      <OAuthButton provider="facebook" onPress={onPress} disabled={disabled} />
      <OAuthButton provider="microsoft" onPress={onPress} disabled={disabled} />
    </View>
  );
};
