import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthInputProps } from "@/models/authModels";


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
        left: <TextInput.Icon 
          icon="lock"
          {...iconProps}
        />,
        right: <TextInput.Icon 
          icon={isPasswordVisible ? "eye-off" : "eye"}
          onPress={handlePasswordVisibility}
          {...iconPropsEye}
        />
      };
    }
    
    if (icon) {
      return {
        [iconPosition]: <TextInput.Icon 
          icon={icon} 
          onPress={onIconPress}
          {...iconProps}
        />
      };
    }

    return {};
  };

  const inputTheme = {
    ...theme,
    roundness: 16,
    colors: {
      ...theme.colors,
      background: theme.colors.surface,
    },
  };

  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        mode="outlined"
        style={[styles.input, disabled && styles.inputDisabled, style]}
        theme={inputTheme}
        disabled={disabled}
        error={false}
        label={label}
        outlineStyle={{ borderRadius: 12 }}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        {...getIconProps()}
        {...props}
      />
    </View>
  );
};
