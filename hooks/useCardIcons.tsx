import { useCallback } from "react";
import { Avatar, IconButton } from "react-native-paper";

type RenderProps = { size: number };

/**
 * Hook para crear un Avatar.Icon memorizado para usar en Card.Title left/right
 */
export const useAvatarIcon = (icon: string, size: number = 30) => {
  return useCallback(
    (props: RenderProps) => <Avatar.Icon {...props} icon={icon} size={size} />,
    [icon, size]
  );
};

/**
 * Hook para crear un IconButton memorizado para usar en Card.Title left/right
 */
export const useIconButton = (
  icon: string,
  options: {
    size?: number;
    iconColor?: string;
    onPress?: () => void;
  }
) => {
  const { size = 20, iconColor, onPress } = options;
  
  return useCallback(
    (props: RenderProps) => (
      <IconButton
        {...props}
        icon={icon}
        size={size}
        iconColor={iconColor}
        onPress={onPress}
      />
    ),
    [icon, size, iconColor, onPress]
  );
};

