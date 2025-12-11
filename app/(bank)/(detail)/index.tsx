import { AppText } from "@/components/AppText";
import { Detail } from "@/components/Detail";
import { LoadingTransition } from "@/components/LoadingTransition";
import { useApplication } from "@/hooks/useApplication";
import { BankCode } from "@/models/enums/Request";
import { User } from "@/models/userModels";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  mainCard: {
    margin: 16,
    marginTop: 8,
    borderRadius: 16,
    padding: 20,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankLogoLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  bankInitial: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bankInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bankName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bankCode: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    marginVertical: 16,
  },
  amountContainer: {
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 14,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 4,
  },
  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    maxWidth: "60%",
    textAlign: "right",
  },
  descriptionContainer: {
    marginTop: 8,
  },
  descriptionText: {
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
  },
  rejectionCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#C20000",
  },
  rejectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  bottomSpacer: {
    height: 32,
  },
});
