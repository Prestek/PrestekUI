import { createAuthStyles, spacing } from "@/assets/styles/auth.styles";
import { AuthInputProps } from "@/models/authModels";
import { View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import MaskInput, { Mask } from 'react-native-mask-input';

export const MaskedInput: React.FC<AuthInputProps> = ({
    disabled = false,
    style,
    icon,
    iconPosition = "right",
    onIconPress,
    label,
    mask,
    value,
    onChangeText,
    ...props
  }) => {
    const theme = useTheme();
    const styles = createAuthStyles(theme);
  
    const inputTheme = {
      ...theme,
      roundness: spacing.lg,
      colors: {
        ...theme.colors,
        background: theme.colors.surface,
      },
    };

    const resolvedMask: Mask | undefined =
      typeof mask === 'function'
        ? (text?: string) => mask(text ?? '')
        : mask;
        let iconProps = {
            iconColor: theme.colors.primary,
            size: 24,
          };
    return (
      <View style={[styles.inputContainer]}>
        <TextInput
          mode="outlined"
          style={[styles.input, style]}
          theme={inputTheme}
          outlineStyle={{ backgroundColor: theme.colors.surfaceVariant }}
          activeOutlineColor={theme.colors.primary}
          outlineColor="transparent"
          disabled={disabled}
          error={false}
          label={label}
          value={value}
          left={icon ? <TextInput.Icon icon={icon} {...iconProps} /> : undefined}
          {...props}
          render={(renderProps) => {
            const { ref, onChangeText: paperOnChangeText, ...restProps } = renderProps;
            return (
              <MaskInput
                {...restProps}
                ref={ref}
                mask={resolvedMask}
                onChangeText={(masked, unmasked) => {
                  paperOnChangeText?.(masked);
                  onChangeText?.(masked);
                }}
                value={value?.toString()}
              />
            );
          }}
        />
      </View>
    );
  };