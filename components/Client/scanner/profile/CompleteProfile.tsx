import { AuthButton, AuthInput } from "@/components/auth";
import { useEmailAuth } from "@/hooks/useEmailAuth";
import {
  CompleteProfileProps,
  EmploymentStatus,
  EmploymentStatusLabel,
} from "@/models/scannerModels";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";
import { Navigation } from "@/components/Navigation";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Steps } from "@/components/Steps";
import { AppText } from "@/components/AppText";
import { formatAmount } from "@/utils/masks";
import { useUserProfile } from "@/hooks/useUser";

export const CompleteProfile: React.FC<CompleteProfileProps> = ({
  data,
  additionalInformation,
  isEditing,
  withScanner = false,
}) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [employmentStatus, setEmploymentStatus] =
    useState<EmploymentStatus>("Employed");
  const [loading, setLoading] = useState(false);
  const { completeUserProfile } = useEmailAuth();
  const { user: userClerk } = useUser();
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const { updateUser } = useUserProfile();

  const userEmail = userClerk?.emailAddresses?.[0]?.emailAddress || "";

  useEffect(() => {
    if ((data && !data.name && !data.lastName) || !data) {
      const userClerkName = userClerk?.firstName || "";
      const userClerkLastName = userClerk?.lastName || "";
      setFirstName(userClerkName || "");
      setLastName(userClerkLastName || "");
    }
    else if (data) {
      setFirstName(data.name || "");
      setLastName(data.lastName || "");
      setDocumentNumber(data.document || "");
    }
    if (additionalInformation) {
      setPhone(additionalInformation.phone || "");
      setMonthlyIncome(additionalInformation.monthlyIncome || "");
      setMonthlyExpenses(additionalInformation.monthlyExpenses || "");
      setEmploymentStatus(additionalInformation.employmentStatus || "Employed");
    }
  }, [data, additionalInformation]);
  const handleSubmit = async () => {
    if (
      !firstName ||
      !lastName ||
      !documentNumber ||
      !phone ||
      !monthlyIncome ||
      !monthlyExpenses
    ) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }

    if (
      Number.parseInt(monthlyIncome) === 0 ||
      Number.parseInt(monthlyExpenses) === 0
    ) {
      Alert.alert("Error", "Los ingresos y egresos deben ser mayores a cero");
      return;
    }

    setLoading(true);
    try {
      if (isEditing) {
        await updateUser({
          email: userEmail,
          firstName,
          lastName,
          documentNumber,
          phone,
          monthlyIncome: Number.parseInt(monthlyIncome) || 0,
          monthlyExpenses: Number.parseInt(monthlyExpenses) || 0,
          employmentStatus,
        });
        router.back();
        return;
      }

      await completeUserProfile({
        firstName,
        lastName,
        documentNumber,
        phone,
        monthlyIncome: Number.parseInt(monthlyIncome) || 0,
        monthlyExpenses: Number.parseInt(monthlyExpenses) || 0,
        employmentStatus,
      });
      router.replace("/(client)/(home)/(loan)");
      return;
    } catch (error) {
      console.error("Error completing profile:", error);
      Alert.alert(
        "Error",
        "No se pudo completar el perfil. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return "Guardando perfil...";
    if (isEditing) return "Actualizar perfil";
    return "Guardar perfil";
  };

  return (
    <Navigation
      showExit={false}
      showElevated={true}
      header={true}
      headerChildren={
        <Steps
          currentStep={2}
          totalSteps={2}
          stepTitle="Completar información"
          stepLabels={["Cédula", "Perfil"]}
          title="Completar información"
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainerWrapper}>
          <View style={styles.formLabel}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={18}
              color={theme.colors.primary}
            />
            <AppText
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.primary,
              }}
            >
              Información básica
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppText style={styles.subtitle}>
              {withScanner ? "Revisa la información de tu cédula, si está errónea, por favor corrígela en el siguiente formulario." : "Completa la siguiente información para continuar."}
            </AppText>
            <AuthInput
              value={userEmail}
              disabled={true}
              keyboardType="email-address"
              icon="email"
              iconPosition="left"
              label="Correo electrónico"
            />
            <AuthInput
              value={firstName}
              icon="account-cog"
              iconPosition="left"
              label="Nombre"
              onChangeText={setFirstName}
            />
            <AuthInput
              value={lastName}
              icon="account-cog"
              iconPosition="left"
              label="Apellido"
              onChangeText={setLastName}
            />
            <AuthInput
              value={documentNumber}
              icon="card-account-details"
              iconPosition="left"
              label="Cédula"
              onChangeText={setDocumentNumber}
            />
          </View>
        </View>
        <View style={styles.formContainerWrapper}>
          <View style={styles.formLabel}>
            <MaterialCommunityIcons
              name="file-document-edit-outline"
              size={18}
              color={theme.colors.primary}
            />
            <AppText
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.primary,
              }}
            >
              Información adicional
            </AppText>
          </View>
          <View style={styles.formContainer}>
            <AppText style={styles.subtitle}>
              Para ofrecerte los mejores préstamos, necesitamos conocerte mejor.
              Completa la siguiente información para continuar.
            </AppText>
            <AuthInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="phone"
              iconPosition="left"
              label="Número de teléfono"
            />
            <AuthInput
              onChangeText={(text) => formatAmount(text, setMonthlyIncome)}
              keyboardType="numeric"
              icon="cash-plus"
              iconPosition="left"
              label="Ingreso mensual"
              value={
                monthlyIncome
                  ? new Intl.NumberFormat("es-CO").format(
                      Number.parseInt(monthlyIncome)
                    )
                  : ""
              }
            />
            <AuthInput
              value={
                monthlyExpenses
                  ? new Intl.NumberFormat("es-CO").format(
                      Number.parseInt(monthlyExpenses)
                    )
                  : ""
              }
              onChangeText={(text) => formatAmount(text, setMonthlyExpenses)}
              keyboardType="numeric"
              icon="cash-minus"
              iconPosition="left"
              label="Egresos mensuales"
            />
            <View style={styles.selectContainer}>
              <AppText style={styles.selectLabel}>Estado de empleo:</AppText>
              <RadioButton.Group
                onValueChange={(value) =>
                  setEmploymentStatus(value as EmploymentStatus)
                }
                value={employmentStatus}
              >
                <View style={styles.radioContainer}>
                  {(
                    [
                      "Employed",
                      "Unemployed",
                      "Self-Employed",
                      "Student",
                      "Retired",
                    ] as const
                  ).map((status) => (
                    <View key={status} style={styles.radioItem}>
                      <RadioButton.Android value={status} />
                      <AppText
                        style={styles.radioLabel}
                        onPress={() => setEmploymentStatus(status)}
                      >
                        {EmploymentStatusLabel[status]}
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
            {getButtonText()}
          </AuthButton>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </Navigation>
  );
};
