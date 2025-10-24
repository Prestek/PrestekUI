import React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { OAuthButton } from "./OAuthButton";

interface OAuthButtonsProps {
  onPress: (provider: "google" | "facebook" | "microsoft") => void;
  disabled?: boolean;
}

export const OAuthButtons: React.FC<OAuthButtonsProps> = ({
  onPress,
  disabled,
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <View style={styles.oauthContainer}>
      <OAuthButton provider="google" onPress={onPress} disabled={disabled} />
      <OAuthButton provider="facebook" onPress={onPress} disabled={disabled} />
      <OAuthButton provider="microsoft" onPress={onPress} disabled={disabled} />
    </View>
  );
};
