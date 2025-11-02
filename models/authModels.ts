import { MaterialIcons } from "@expo/vector-icons";
import { TextInputProps } from "react-native-paper";

export interface AuthButtonProps {
    onPress: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export interface AuthDividerProps {
    text?: string;
}

export interface AuthInputProps extends TextInputProps {
    disabled?: boolean;
    icon?: string;
    iconPosition?: "left" | "right";
    label?: string;
    onIconPress?: () => void;
}

export interface AuthLayoutProps {
    title?: string;
    subtitle?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
    children: React.ReactNode;
}

export interface AuthLinkProps {
    href: string;
    text: string;
    disabled?: boolean;
    title?: string;
}

export interface EmailPasswordFormProps {
    email: string;
    password: string;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onSubmit: () => void;
    submitLabel: string;
    loading?: boolean;
}

export interface OtpProps {
    email: string;
    code: string;
    setCode: (code: string) => void;
    loading: boolean;
    handleVerify: (code: string) => void;
}

export type OAuthProvider = "google" | "facebook" | "microsoft";

export interface OAuthButtonProps {
  provider: OAuthProvider;
  onPress: (provider: OAuthProvider) => void;
  disabled?: boolean;
}

export interface OAuthButtonsProps {
    onPress: (provider: OAuthProvider) => void;
    disabled?: boolean;
}
  