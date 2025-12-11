import { View } from "react-native";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useTheme } from "react-native-paper";
import { LoanRequest } from "@/components/Client/home/Loan/LoanRequest";
import { router } from "expo-router";
import { InformationRequired } from "@/components/Client/home/Loan/InformationRequired";
import { useUserExists } from "@/hooks/useUserExists";

export default function ClientLoanScreen() {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const { user, isChecking } = useUserExists();
  const handleLoanRequest = (amount: string, installments: string) => {
    router.push({
      pathname: "/(client)/(loan)",
      params: {
        amount,
        installments,
      },
    });
  };

  if (isChecking) {
    return null;
  }

  if (!user) {
    return <InformationRequired />;
  }

  return (
    <View style={styles.container}>
      <LoanRequest onSubmit={handleLoanRequest} disabled={!user} />
    </View>
  );
}
