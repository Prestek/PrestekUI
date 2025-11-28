import { createStyles } from "@/assets/styles/bank.styles";
import { initialRequests, LoanRequest } from "@/hooks/const/data";
import { useEffect, useMemo, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  useTheme,
} from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { AppText } from "../AppText";
import { BankHeader } from "./BankHeader";
import { LoanRequestStatus } from "@/models/enums/Request";
import { RecentRequests } from "../RecentRequests";
import { spacing, typography } from "@/assets/styles/theme";
import { getItem } from "@/utils/secureStorage";

export default function Resume() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [role, setRole] = useState<string>("");
  const [requests, setRequests] = useState<LoanRequest[]>(initialRequests);


  const overviewCards = useMemo(() => {
    const pending = requests.filter((r) => r.status === LoanRequestStatus.PENDING).length;
    const approved = requests.filter((r) => r.status === LoanRequestStatus.APPROVED).length;
    const rejected = requests.filter((r) => r.status === LoanRequestStatus.REJECTED).length;
    return [
      {
        title: "Total",
        value: requests.length,
        icon: "clipboard-list",
      },
      { title: "Pendientes", value: pending, icon: "timer-sand" },
      { title: "Aprobadas", value: approved, icon: "check-circle" },
      { title: "Rechazadas", value: rejected, icon: "close-circle" },
    ];
  }, [requests]);

  const lastMonthData = useMemo(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const lastMonthRequests = requests.filter((r) => {
      const requestDate = new Date(r.requestedAt);
      return requestDate >= oneMonthAgo;
    });

    const pending = lastMonthRequests.filter((r) => r.status === LoanRequestStatus.PENDING).length;
    const approved = lastMonthRequests.filter((r) => r.status === LoanRequestStatus.APPROVED).length;
    const rejected = lastMonthRequests.filter((r) => r.status === LoanRequestStatus.REJECTED).length;

    return {
      labels: ["Pendientes", "Aprobadas", "Rechazadas"],
      datasets: [
        {
          data: [pending, approved, rejected],
        },
      ],
    };
  }, [requests]);

  const currentMonthName = useMemo(() => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[new Date().getMonth()];
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const role = await getItem("role");
      setRole(role || "");
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <BankHeader />

      <View style={styles.resumeContainer}>
        <View style={styles.metricsGrid}>
          {overviewCards.map((card) => (
            <Card key={card.title} style={styles.metricCard} mode="outlined">
              <Card.Title
                title={card.title}
                left={(props) => <Avatar.Icon {...props} icon={card.icon} size={30} />}
                leftStyle={{ marginRight: -2 }}
                titleStyle={{ color: theme.colors.primary, fontSize: typography.sizes.sm }}
                style={{ paddingBottom: 0, marginBottom: -10 }}
              />
              <Card.Content style={{ paddingTop: 0 }}>
                <AppText style={styles.cardValue}>{card.value}</AppText>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Card style={styles.chartCard} mode="outlined">
          <Card.Title
            title={
              <View>
                <AppText style={styles.chartTitle}>Solicitudes del Último Mes</AppText>
                <AppText style={styles.chartSubtitle}>{currentMonthName}</AppText>
              </View>
            }
            right={(props) => (
              <IconButton
                {...props}
                icon="arrow-right"
                size={20}
                iconColor={theme.colors.primary}
                onPress={() => {
                  // Aquí puedes agregar la navegación a ver todas las solicitudes
                  console.log("Ver todas las solicitudes");
                }}
              />
            )}
          />
          <Card.Content>
            <BarChart
              data={lastMonthData}
              width={Dimensions.get("window").width - spacing.md * 4}
              height={180}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(27, 54, 93, ${opacity})`,
                labelColor: (opacity = 1) => theme.colors.onSurface,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                  stroke: theme.colors.surfaceVariant,
                  strokeWidth: 1,
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              style={{
                borderRadius: 16,
              }}
              showValuesOnTopOfBars
              fromZero
            />
          </Card.Content>
        </Card>

      </View>
    </View>
  );
}
