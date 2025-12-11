import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthInputProps } from "@/models/authModels";
import { spacing } from "@/assets/styles/theme";

export const AuthInput: React.FC<AuthInputProps> = ({
  disabled = false,
  style,
  icon,
  iconPosition = "right",
  onIconPress,
  label,
  secureTextEntry,
  ...props
}) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getIconProps = () => {
    let iconProps = {
      iconColor: theme.colors.primary,
      size: 24,
    };

    if (secureTextEntry) {
      const iconPropsEye = {
        iconColor: theme.colors.onTertiary,
        size: 24,
      };
      return {
        left: <TextInput.Icon icon="lock" {...iconProps} />,
        right: (
          <TextInput.Icon
            icon={isPasswordVisible ? "eye-off" : "eye"}
            onPress={handlePasswordVisibility}
            {...iconPropsEye}
          />
        ),
      };
    }

    if (icon) {
      return {
        [iconPosition]: (
          <TextInput.Icon icon={icon} onPress={onIconPress} {...iconProps} />
        ),
      };
    }

    return {};
  };

  const inputTheme = {
    ...theme,
    roundness: spacing.lg,
    colors: {
      ...theme.colors,
      background: theme.colors.background,
    },
  };

  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        mode="outlined"
        style={[styles.input, style]}
        activeOutlineColor={theme.colors.primary}
        theme={inputTheme}
        outlineStyle={{ backgroundColor: theme.colors.surfaceVariant }}
        disabled={disabled}
        error={false}
        label={label}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        {...getIconProps()}
        {...props}
      />
    </View>
  );
};
