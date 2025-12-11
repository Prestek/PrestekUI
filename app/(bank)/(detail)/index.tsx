import { AppText } from "@/components/AppText";
import { Detail } from "@/components/Detail";
import { LoadingTransition } from "@/components/LoadingTransition";
import { useApplication } from "@/hooks/useApplication";
import { BankCode } from "@/models/enums/Request";
import { User } from "@/models/userModels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function ApplicationDetailScreen() {
  const theme = useTheme();
  const { id, bankCode } = useLocalSearchParams<{
    id: string;
    bankCode: BankCode;
  }>();
  const { application, user, loading } = useApplication(id, bankCode);

  if (loading) {
    return <LoadingTransition />;
  }

  if (!application) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <MaterialCommunityIcons
          name="file-search-outline"
          size={64}
          color={theme.colors.onSurfaceVariant}
        />
        <AppText
          style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
        >
          Solicitud no encontrada
        </AppText>
      </View>
    );
  }

  return (
    <Detail
      request={application}
      role="bank"
      user={user as User}
      bankCode={bankCode}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});
