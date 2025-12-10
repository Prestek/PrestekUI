import { View, StyleSheet } from "react-native";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useState } from "react";
import { useTheme, Text, Button, Card } from "react-native-paper";
import { LoanRequest } from "@/components/Client/home/Loan/LoanRequest";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useCheckUserExists } from "@/hooks/useEmailAuth";
import { InformationRequired } from "@/components/Client/home/Loan/InformationRequired";
import { useUserExists } from "@/hooks/useUserExists";
import { useSimulation } from "@/hooks/useSimulation";
import { LoanSearching } from "@/components/Client/home/Loan/LoanSearching";


export default function ClientLoanScreen() {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const {user, isChecking} = useUserExists();
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
    return (
      <InformationRequired />
    );
  }

  return (
    <View style={styles.container}>
      <LoanRequest onSubmit={handleLoanRequest} disabled={!user} />
    </View>
  );
}


