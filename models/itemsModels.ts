import { MaterialIcons } from "@expo/vector-icons";

export interface ItemsProps {
    icon: keyof typeof MaterialIcons.glyphMap;
    title: string;
    onPress?: () => void;
    description?: string;
}