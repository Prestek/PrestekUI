import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import Profile from "@/components/Client/home/profile/Profile";

export default function ClientProfileScreen() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  return (
    <Profile />
  );
}
