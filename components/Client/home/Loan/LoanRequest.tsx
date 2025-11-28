import { AppText } from "@/components/AppText";
import { View, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useState } from "react";
import { AuthButton, AuthInput } from "@/components/auth";
import { formatAmount } from "@/utils/masks";

interface LoanRequestProps {
  onSubmit: (amount: string, installments: string) => void;
}

export const LoanRequest = ({ onSubmit }: LoanRequestProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const [amount, setAmount] = useState("");
  const [installments, setInstallments] = useState("");

  const handleSubmit = () => {
    if (amount && installments) {
      onSubmit(amount, installments);
    }
  };


  return (
    <View style={styles.loanContainer}>
      <View style={styles.requestContainer}>
        <AppText style={styles.requestTitle}>Solicita tu préstamo</AppText>
        <AppText style={styles.requestSubtitle}>
          Completa la información para encontrar las mejores ofertas
        </AppText>

        <View style={styles.formContainer}>
          <AuthInput
            onChangeText={(text) => formatAmount(text, setAmount)}
            keyboardType="numeric"
            icon="cash-plus"
            iconPosition="left"
            label="Monto del préstamo"
            value={amount ? new Intl.NumberFormat("es-CO").format(parseInt(amount)) : ""}
          />
          <AuthInput
            value={installments}
            onChangeText={setInstallments}
            keyboardType="numeric"
            icon="calendar-month"
            iconPosition="left"
            label="Número de cuotas"
          />


          <View style={styles.quickOptions}>
            <AppText style={styles.quickOptionsLabel}>Cuotas sugeridas:</AppText>
            <View style={styles.quickOptionsRow}>
              {["6", "12", "24", "36"].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.quickOption,
                    installments === option && styles.quickOptionActive,
                  ]}
                  onPress={() => setInstallments(option)}
                >
                  <AppText
                    style={[
                      styles.quickOptionText,
                      installments === option && styles.quickOptionTextActive,
                    ]}
                  >
                    {option}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      <AuthButton
        onPress={handleSubmit}
        disabled={!amount || !installments}
      >
        Buscar ofertas
      </AuthButton>
    </View>
  );
};

