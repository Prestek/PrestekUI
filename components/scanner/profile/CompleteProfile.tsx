import { createAuthStyles } from "@/assets/styles/auth.styles";
import { AuthButton, AuthInput } from "@/components/auth";
import { InputLabel } from "@/components/home/Inputs/InputLabel";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { TopBar } from "@/components/TopBar";
import { useEmailAuth } from "@/hooks/useEmailAuth";
import { ParsedCedula } from "@/models/scannerModels";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { RadioButton, Surface, Text, useTheme } from "react-native-paper";
import { Navigation } from "@/components/Navigation";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Steps } from "@/components/Steps";
import { AppText } from "@/components/AppText";
import { MaskedInput } from "@/components/MaskInput";
import { createCurrencyMask, parseCurrency } from "@/utils/masks";


export default function CompleteProfile({ data }: { data: ParsedCedula | null }) {
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
  const styles = createHomeStyles(theme);

  const userEmail = user?.emailAddresses?.[0]?.emailAddress || "";

  useEffect(() => {
    if (data) {
      setFirstName(data.name || "");
      setLastName(data.lastName || "");
      setDocumentNumber(data.document || "");
    }
  }, [data]);
  const handleSubmit = async () => {
    if (!firstName || !lastName || !documentNumber || !phone || !monthlyIncome || !monthlyExpenses) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    // Parsear valores de moneda (remover $ y puntos)
    const monthlyIncomeValue = parseCurrency(monthlyIncome);
    const monthlyExpensesValue = parseCurrency(monthlyExpenses);

    if (monthlyIncomeValue === 0 || monthlyExpensesValue === 0) {
      Alert.alert("Error", "Los ingresos y egresos deben ser mayores a cero");
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
    <Navigation 
      showExit={true}
      showElevated={true}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
      <Steps 
      currentStep={2}
      totalSteps={2}
      stepTitle="Profile"
      stepLabels={["Scan ID", "Profile"]} />
      <View style={styles.container}>
        <View style={styles.introContainer}>
          <View style={[styles.titleContainer, styles.mainTitle]}>
            <MaterialCommunityIcons name="account-plus" size={24} color={theme.colors.primary} />
            <AppText style={styles.introTitle}>Complete your profile</AppText>
          </View>
          <View style={styles.basicInformation}>
            <AppText style={styles.basicInformationTitle}>Basic Information</AppText>
            <View style={styles.basicInformationContent}>
              <AppText style={styles.basicInformationContentText}>Email</AppText>
              <AppText style={styles.basicInformationContentText}>{userEmail}</AppText>
            </View>
            <View style={styles.basicInformationContent}>
              <AppText style={styles.basicInformationContentText}>Name</AppText>
              <AppText style={styles.basicInformationContentText}>{firstName}</AppText>
            </View>
            <View style={styles.basicInformationContent}>
              <AppText style={styles.basicInformationContentText}>Last Name</AppText>
              <AppText style={styles.basicInformationContentText}>{lastName}</AppText>
            </View>
            <View style={styles.basicInformationContent}>
              <AppText style={styles.basicInformationContentText}>Document Number</AppText>
              <AppText style={styles.basicInformationContentText}>{documentNumber}</AppText>
            </View>
          </View>
        </View>
        <View style={styles.formContainerWrapper}>
          <View style={styles.formLabel}>
            <MaterialCommunityIcons name="file-document-edit" size={18} color={theme.colors.primary} />
            <AppText style={{ fontSize: 16, fontWeight: '600', color: theme.colors.primary }}>Additional Information</AppText>
          </View>
          <View style={styles.formContainer}>
          <AppText style={styles.subtitle}>To offer you the best loans, we need to know you better. Complete the following information to continue.</AppText>
            <AuthInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="phone"
              iconPosition="left"
              label="Phone Number"
            />
          <MaskedInput
              value={monthlyIncome}
              onChangeText={setMonthlyIncome}
              keyboardType="numeric"
              icon="cash-plus"
              iconPosition="left"
              label="Monthly Income"
              mask={createCurrencyMask}
            />
          <MaskedInput
              value={monthlyExpenses}
              onChangeText={setMonthlyExpenses}
              keyboardType="numeric"
              icon="cash-minus"
              iconPosition="left"
              label="Monthly Expenses"
              mask={createCurrencyMask}
            />
          <View style={styles.selectContainer}>
            <AppText style={styles.selectLabel}>Employment Status:</AppText>
            <RadioButton.Group onValueChange={value => setEmploymentStatus(value as 'Employed' | 'Unemployed' | 'Self-Employed' | 'Student' | 'Retired')} value={employmentStatus}>
              <View style={styles.radioContainer}>
                {(['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired'] as const).map((status) => (
                  <View key={status} style={styles.radioItem}>
                    <RadioButton.Android value={status} />
                    <AppText style={styles.radioLabel} onPress={() => setEmploymentStatus(status)}>
                      {status === 'Employed' ? 'Employed' :
                        status === 'Unemployed' ? 'Unemployed' :
                          status === 'Self-Employed' ? 'Self-Employed' :
                            status === 'Student' ? 'Student' :
                              'Retired'}
                    </AppText>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>
          </View>
        </View>
        <View style={styles.formButtonContainer}>
          <AuthButton onPress={handleSubmit} disabled={loading}>
            {loading ? "Saving Profile..." : "Save Profile"}
          </AuthButton>
        </View>
      </View>
      </ScrollView>
    </Navigation>
  );
}