import { createStyles } from "@/assets/styles/bank.styles";
import { BankHeader } from "@/components/Bank/Resume/BankHeader";
import { BankCode, LoanRequestStatus } from "@/models/enums/Request";
import { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Resume } from "@/components/Bank/Resume/Resume";
import { Graphic } from "@/components/Bank/Resume/Graphic";
import { router } from "expo-router";
import { useBank } from "@/hooks/useBank";

// Convierte fecha (string o array) a Date
const dateToDate = (date: string | number[] | undefined): Date => {
  if (!date) return new Date(0);
  if (typeof date === "string") {
    return new Date(date);
  }
  if (Array.isArray(date)) {
    return new Date(
      date[0],
      date[1] - 1,
      date[2],
      date[3] || 0,
      date[4] || 0,
      date[5] || 0
    );
  }
  return new Date(0);
};

export default function BankHomeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { applications, total, totalPending, totalApproved, totalRejected, bankCode } = useBank();

  // Cards de resumen con datos del backend
  const overviewCards = useMemo(() => [
    { title: "Total solicitudes", value: total, icon: "file-document-multiple" },
    { title: "Pendientes", value: totalPending, icon: "clock-outline" },
    { title: "Aprobadas", value: totalApproved, icon: "check-circle-outline" },
    { title: "Rechazadas", value: totalRejected, icon: "close-circle-outline" },
  ], [total, totalPending, totalApproved, totalRejected]);

  const lastMonthData = useMemo(() => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const lastMonthRequests = applications.filter((r) => {
      const requestDate = dateToDate(r.applicationDate);
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
  }, [applications]);

  const currentMonthName = useMemo(() => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[new Date().getMonth()];
  }, []);


  return (
    <View style={styles.container}>
      <BankHeader bankCode={bankCode as BankCode} />
      <View style={styles.resumeContainer}>
        <Resume cards={overviewCards} />
        <Graphic lastMonthData={lastMonthData} currentMonthName={currentMonthName} onPress={() => router.push("/(bank)/(home)/applications")} />
      </View>
    </View>
  );
}