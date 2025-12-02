import { createStyles } from "@/assets/styles/bank.styles";
import { BankHeader } from "@/components/Bank/Resume/BankHeader";
import { initialRequests, LoanRequest } from "@/hooks/const/data";
import { LoanRequestStatus } from "@/models/enums/Request";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { Resume } from "@/components/Bank/Resume/Resume";
import { Graphic } from "@/components/Bank/Resume/Graphic";
import { router } from "expo-router";

export default function BankHomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
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


  return (
    <View style={styles.container}>
      <BankHeader />
      <View style={styles.resumeContainer}>
        <Resume cards={overviewCards} />
        <Graphic lastMonthData={lastMonthData} currentMonthName={currentMonthName} onPress={() => router.push("/(bank)/(home)/applications")} />
      </View>
    </View>
  );
}