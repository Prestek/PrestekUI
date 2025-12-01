import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { History } from "@/components/History";
import { createStyles } from "@/assets/styles/bank.styles";

export default function BankApplicationsScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <History />
  );
}
