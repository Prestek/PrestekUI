import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { History } from "@/components/History";

export default function ClientApplicationsScreen() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  return (
    <History />
  );
}
