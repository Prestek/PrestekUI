import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createStyles } from "@/assets/styles/bank.styles";
import Profile from "@/components/Client/home/profile/Profile";

export default function BankProfileScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Profile />
  );
}
