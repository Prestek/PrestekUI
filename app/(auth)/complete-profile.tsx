import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { useEmailAuth } from "@/hooks/useEmailAuth";
import { useUser } from "@clerk/clerk-expo";
import { useTheme } from "react-native-paper";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import { router } from "expo-router";
import { SignOutButton } from "@/components/SignOutButton";

export default function CompleteProfileScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState<'empleado' | 'desempleado' | 'independiente' | 'estudiante' | 'jubilado'>('empleado');
  const [loading, setLoading] = useState(false);

  const { completeUserProfile } = useEmailAuth();
  const { user } = useUser();
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  
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
    } catch (error) {
      Alert.alert("Error", "No se pudo completar el perfil. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Completa tu perfil"
      subtitle="Necesitamos algunos datos adicionales para personalizar tu experiencia"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <AuthInput
            value={userEmail}
            placeholder="Email"
            editable={false}
            style={styles.inputDisabled}
          />
          
          <AuthInput
            value={firstName}
            placeholder="Nombre"
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          
          <AuthInput
            value={lastName}
            placeholder="Apellido"
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          
          <AuthInput
            value={documentNumber}
            placeholder="NIT"
            onChangeText={setDocumentNumber}
            keyboardType="numeric"
          />
          
          <AuthInput
            value={phone}
            placeholder="Número de teléfono"
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          
          <AuthInput
            value={monthlyIncome}
            placeholder="Ingresos mensuales"
            onChangeText={setMonthlyIncome}
            keyboardType="numeric"
          />
          
          <AuthInput
            value={monthlyExpenses}
            placeholder="Egresos mensuales"
            onChangeText={setMonthlyExpenses}
            keyboardType="numeric"
          />

          <View style={styles.selectContainer}>
            <Text style={styles.selectLabel}>Estado laboral:</Text>
            <View style={styles.selectOptions}>
              {(['empleado', 'desempleado', 'independiente', 'estudiante', 'jubilado'] as const).map((status) => (
                <Text
                  key={status}
                  style={[
                    styles.selectOption,
                    employmentStatus === status && styles.selectOptionActive
                  ]}
                  onPress={() => setEmploymentStatus(status)}
                >
                  {status === 'empleado' ? 'Empleado' :
                   status === 'desempleado' ? 'Desempleado' :
                   status === 'independiente' ? 'Independiente' :
                   status === 'estudiante' ? 'Estudiante' :
                   'Jubilado'}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <AuthButton onPress={handleSubmit} disabled={loading}>
          {loading ? "Completando perfil..." : "Completar perfil"}
        </AuthButton>
        <SignOutButton />
      </ScrollView>
    </AuthLayout>
  );
}
