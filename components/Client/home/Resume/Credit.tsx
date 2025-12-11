import { createHomeStyles } from "@/assets/styles/home.styles";
import { AppText } from "@/components/AppText";
import { View, TouchableOpacity } from "react-native";
import { Chip, TouchableRipple, useTheme } from "react-native-paper";
import { router } from "expo-router";
import { Application } from "@/models/creditModels";
import {
  getBackgroundColorByStatus,
  getColorByStatus,
} from "@/models/functions/color";
import { LoanRequestStatusLabel } from "@/models/enums/Request";
import { formatDate } from "@/models/functions/date";

export const Credit: React.FC<{ lastApplication: Application | null }> = ({
  lastApplication,
}) => {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  if (!lastApplication) {
    return (
      <View
        style={[
          styles.basicInformation,
          styles.resumeContrainer,
          { alignItems: "center", paddingVertical: 24 },
        ]}
      >
        <AppText
          style={[
            styles.basicInformationTitle,
            { marginBottom: 16, textAlign: "center" },
          ]}
        >
          No tienes ninguna solicitud de prestamo
        </AppText>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
          onPress={() => router.push("/(client)/(home)/loan")}
        >
          <AppText style={{ color: "#fff", fontWeight: "bold" }}>
            Solicitar
          </AppText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableRipple
      borderless={false}
      onPress={() =>
        router.push({
          pathname: "/(client)/(detail)",
          params: {
            id: lastApplication?.id,
            bankCode: lastApplication?.bankCode,
          },
        })
      }
    >
      <View style={[styles.basicInformation, styles.resumeContrainer]}>
        <View style={[styles.itemsHorizontal]}>
          <View style={styles.itemsHorizontal}>
            <View style={styles.bankLogo}>
              <AppText style={styles.logoText}>
                {lastApplication?.bankName.charAt(0)}
              </AppText>
            </View>
            <View style={styles.headerContainer}>
              <AppText style={styles.basicInformationTitle}>Reciente</AppText>
              <AppText
                style={[styles.basicInformationContentText, styles.bankColor]}
              >
                {lastApplication?.bankName}
              </AppText>
            </View>
          </View>
          <Chip
            textStyle={{ color: getColorByStatus(lastApplication?.status) }}
            style={{
              backgroundColor: getBackgroundColorByStatus(
                lastApplication?.status
              ),
            }}
          >
            {LoanRequestStatusLabel[lastApplication?.status]}
          </Chip>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.itemsHorizontal}>
            <View style={styles.amountSection}>
              <AppText
                style={[styles.amountLabel, styles.basicInformationContentText]}
              >
                Total solicitado
              </AppText>
              <AppText
                style={[styles.amountValue, styles.basicInformationContentText]}
              >
                $
                {lastApplication?.amount.toLocaleString("es-CO", {
                  minimumFractionDigits: 2,
                })}
              </AppText>
            </View>
            <View style={styles.amountSection}>
              <AppText style={styles.basicInformationContentText}>
                Fecha de solicitud
              </AppText>
              <AppText
                style={[
                  styles.basicInformationContentText,
                  styles.bankName,
                  styles.leftText,
                ]}
              >
                {formatDate(lastApplication?.applicationDate)}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};
