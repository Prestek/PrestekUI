import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { Services } from "@/components/Client/home/Resume/Services";
import { UserHeader } from "@/components/Client/home/Resume/UserHeader";
import { Credit } from "@/components/Client/home/Resume/Credit";
import { spacing } from "@/assets/styles/theme";
import { LinearGradient } from "expo-linear-gradient";


const loanData = {
  bank: "Bancolombia",
  totalAmount: 25000.0,
  applicationDate: "15 de diciembre de 2025",
};

export default function HomePage() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing["4xl"] }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={[theme.colors.primaryContainer, theme.colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <UserHeader />
        <Credit bank={loanData.bank} totalAmount={loanData.totalAmount} applicationDate={loanData.applicationDate} />
      </View>
      <View style={[styles.gradientContainer, { gap: spacing.lg }]}>
        {/*<RecentRequests filteredRequests={creditUserRequests} role="client" />*/}
        <Services />
      </View>
    </ScrollView>
  );
}
