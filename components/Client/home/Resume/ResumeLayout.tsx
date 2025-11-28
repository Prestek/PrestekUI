import { createHomeStyles } from "@/assets/styles/home.styles";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Credit } from "./Credit";
import { UserHeader } from "./UserHeader";
import { LinearGradient } from "expo-linear-gradient";
import { Items } from "./Items";
import { AppText } from "@/components/AppText";
import { ItemsProps } from "@/models/itemsModels";
import { spacing } from "@/assets/styles/auth.styles";
import { creditUserRequests } from "@/hooks/const/data";
import { RecentRequests } from "@/components/RecentRequests";

export const ResumeLayout = () => {
  const loanData = {
    bank: "National Bank",
    totalAmount: 25000.0,
    interestRate: 12.5,
    startDate: "15 March 2023",
    endDate: "15 December 2025",
    paidAmount: 10500.0,
    remainingAmount: 14500.0,
    progressPercentage: 42,
  };

  const quickActions: ItemsProps[] = [
    {
      icon: "credit-card",
      title: "Request loan",
      description: "Request a new loan",
      onPress: () => {},
    },
    {
      icon: "history",
      title: "Credit applications",
      description: "View your applications",
      onPress: () => {},
    },
    {
      icon: "help-outline",
      title: "Need help",
      description: "Contact support",
      onPress: () => {},
    },
  ];

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

        <Credit loan={loanData} />
      </View>
      <View style={[styles.gradientContainer, { gap: spacing.lg }]}>
        <RecentRequests filteredRequests={creditUserRequests} />
        <View>
          <AppText style={styles.introTitle}>Services</AppText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemsCarouselContent}
            style={styles.itemsCarousel}
          >
            {quickActions.map((item, index) => (
              <View
                key={item.title}
                style={[
                  styles.itemSlide,
                  index === quickActions.length - 1 && styles.itemSlideLast,
                ]}
              >
                <Items {...item} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};
