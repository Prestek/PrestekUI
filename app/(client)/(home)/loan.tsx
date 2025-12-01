import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { Loan } from "@/components/Client/home/Loan/Loan";

export default function ClientLoanScreen() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  return (
    <Loan />
  );
}
