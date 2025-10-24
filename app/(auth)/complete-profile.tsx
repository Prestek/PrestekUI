import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { useEmailAuth } from "@/hooks/useEmailAuth";
import { useUser } from "@clerk/clerk-expo";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { SignOutButton } from "@/components/SignOutButton";
import { useRouter } from "expo-router";
import { TopBar } from "@/components/TopBar";
import { LinearGradient } from "expo-linear-gradient";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { InputLabel } from "@/components/home/Inputs/InputLabel";

export default function CompleteProfileScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState<'Employed' | 'Unemployed' | 'Self-Employed' | 'Student' | 'Retired'>('Employed');
  const [loading, setLoading] = useState(false);

  const { completeUserProfile } = useEmailAuth();
  const { user } = useUser();
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const homeStyles = createHomeStyles(theme);
  
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";

  const handleSubmit = async () => {
    if (!firstName || !lastName || !documentNumber || !phone || !monthlyIncome || !monthlyExpenses) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    const monthlyIncomeValue = parseFloat(monthlyIncome);
    const monthlyExpensesValue = parseFloat(monthlyExpenses);

    if (isNaN(monthlyIncomeValue) || isNaN(monthlyExpensesValue)) {
      Alert.alert("Error", "Los ingresos y egresos deben ser números válidos");
      return;
    }

    setLoading(true);
    try {
      await completeUserProfile({
        firstName,
        lastName,
        documentNumber,
        phone,
        monthlyIncome: monthlyIncomeValue,
        monthlyExpenses: monthlyExpensesValue,
        employmentStatus,
      });
      router.replace("/(home)");
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el perfil. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopBar
    >
        <View style={styles.formContainer}>
          <InputLabel label="User Address">
            <AuthInput
              value={userEmail}
              editable={false}
              style={styles.inputDisabled}
              icon="email"
              iconPosition="left"
            />
          </InputLabel>
          <InputLabel label="First Name">
          <AuthInput
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            icon="account"
            iconPosition="left"
          />
          </InputLabel>
          <InputLabel label="Last Name">
          <AuthInput
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            icon="account"
            iconPosition="left"
          />
          </InputLabel>
          <InputLabel label="Document Number">
          <AuthInput
            value={documentNumber}
            onChangeText={setDocumentNumber}
            keyboardType="numeric"
            icon="card-account-details"
            iconPosition="left"
          />
          </InputLabel>
          <InputLabel label="Phone Number">
          <AuthInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="phone"
            iconPosition="left"
          />
          </InputLabel>
          <InputLabel label="Monthly Income">
          <AuthInput
            value={monthlyIncome}
            onChangeText={setMonthlyIncome}
            keyboardType="numeric"
            icon="cash-plus"
            iconPosition="left"
          />
          </InputLabel>
          <InputLabel label="Monthly Expenses">
          <AuthInput
            value={monthlyExpenses}
            onChangeText={setMonthlyExpenses}
            keyboardType="numeric"
            icon="cash-minus"
            iconPosition="left"
          />
          </InputLabel>
          <View style={styles.selectContainer}>
            <Text style={styles.selectLabel}>Employment Status:</Text>
            <View style={styles.selectOptions}>
              {(['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired'] as const).map((status) => (
                <Text
                  key={status}
                  style={[
                    styles.selectOption,
                    employmentStatus === status && styles.selectOptionActive
                  ]}
                  onPress={() => setEmploymentStatus(status)}
                >
                  {status === 'Employed' ? 'Employed' :
                   status === 'Unemployed' ? 'Unemployed' :
                   status === 'Self-Employed' ? 'Self-Employed' :
                   status === 'Student' ? 'Student' :
                   'Retired'}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <AuthButton onPress={handleSubmit} disabled={loading}>
          {loading ? "Saving Profile..." : "Save Profile"}
        </AuthButton>
        <SignOutButton text={"Go back"}/>
        </TopBar>

      </ScrollView>
  );
}
