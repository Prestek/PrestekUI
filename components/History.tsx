import { ScrollView, View, TouchableOpacity } from "react-native";
import { IconButton, useTheme, Searchbar, Chip } from "react-native-paper";
import { AppText } from "@/components/AppText";
import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { spacing, typography } from "@/assets/styles/theme";
import { useEffect, useState } from "react";
import { Topbar } from "@/components/Topbar";
import {
  creditUserRequests,
  initialRequests,
  LoanRequest,
} from "@/hooks/const/data";
import { getItem } from "expo-secure-store";
import { Applications } from "./Applications";

export const History = () => {
  const theme = useTheme();
  const paymentStyles = createPaymentStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("pending");
  const [creditRequests, setCreditRequests] = useState<LoanRequest[] | any[]>(
    creditUserRequests
  );
  const [role, setRole] = useState<string>("");
  useEffect(() => {
    const loadData = async () => {
      const role = await getItem("role");
      setRole(role || "");
      if (role !== "bank") {
        setCreditRequests(creditUserRequests);
      } else {
        setCreditRequests(initialRequests);
      }
    };
    loadData();
  }, []);

  const filteredRequests = creditRequests.filter((request) => {
    const matchesSearch =
      request.bank?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.amount.toString().includes(searchQuery) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      (selectedTab === "pending" && request.status === "Pendiente") ||
      (selectedTab === "approved" && request.status === "Aprobada") ||
      (selectedTab === "rejected" && request.status === "Rechazada");

    return matchesSearch && matchesTab;
  });

  return (
    <Topbar
      headerContent={
        <>
          <View style={{ width: "100%", gap: spacing.md }}>
            <View style={paymentStyles.historyHeader}>
              <AppText style={paymentStyles.historyTitle}>
                Solicitudes
              </AppText>
              <Chip
                mode="outlined"
                icon="file-document-outline"
                textStyle={{ color: theme.colors.primary, fontSize: 14 }}
              >
                Total: {filteredRequests.length}
              </Chip>
            </View>

            <View
              style={{
                paddingHorizontal: spacing.md,
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.sm,
              }}
            >
              <Searchbar
                placeholder="Buscar solicitudes..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.outline,
                  flex: 1,
                  height: 40,
                  justifyContent: "center",
                }}
                inputStyle={{
                  fontSize: 14,
                  minHeight: 0,
                  alignSelf: "center",
                }}
                iconColor={theme.colors.onSurfaceVariant}
              />
            </View>


            {/* Tabs para filtrar por estado */}
            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outlineVariant,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedTab("pending")}
                style={{
                  flex: 1,
                  paddingVertical: spacing.md,
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderBottomColor:
                    selectedTab === "pending"
                      ? theme.colors.primary
                      : "transparent",
                }}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    fontWeight: selectedTab === "pending" ? "600" : "400",
                    color:
                      selectedTab === "pending"
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  }}
                >
                  Pendientes
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedTab("approved")}
                style={{
                  flex: 1,
                  paddingVertical: spacing.md,
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderBottomColor:
                    selectedTab === "approved"
                      ? theme.colors.primary
                      : "transparent",
                }}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    fontWeight: selectedTab === "approved" ? "600" : "400",
                    color:
                      selectedTab === "approved"
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  }}
                >
                  Aprobadas
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setSelectedTab("rejected")}
                style={{
                  flex: 1,
                  paddingVertical: spacing.md,
                  alignItems: "center",
                  borderBottomWidth: 2,
                  borderBottomColor:
                    selectedTab === "rejected"
                      ? theme.colors.primary
                      : "transparent",
                }}
              >
                <AppText
                  style={{
                    fontSize: 14,
                    fontWeight: selectedTab === "rejected" ? "600" : "400",
                    color:
                      selectedTab === "rejected"
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  }}
                >
                  Rechazadas
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme.colors.surfaceVariant,
          paddingHorizontal: spacing.md,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: spacing["4xl"],
          paddingTop: spacing.md,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Applications
          filteredRequests={filteredRequests}
          showElevation={true}
          role={role}
        />
      </ScrollView>
    </Topbar>
  );
};
