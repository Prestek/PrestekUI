import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthLinkProps } from "@/models/authModels";


export const AuthLink: React.FC<AuthLinkProps> = ({
  title = "Don't have an account?",
  href,
  text,
  disabled = false,
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);

  return (
    <View style={styles.linkContainer}>
      <Text style={disabled ? styles.disabledText : styles.linkText}>
        {title}{" "}
      </Text>
      <TouchableOpacity disabled={disabled}>
        <Link href={href} disabled={disabled}>
          <Text style={[styles.link, disabled && styles.disabledText]}>
            {text}
          </Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};
