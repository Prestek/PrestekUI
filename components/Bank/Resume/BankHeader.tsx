import { createStyles } from "@/assets/styles/bank.styles";
import { getItem } from "expo-secure-store";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppText } from "../../AppText";
import { useEffect, useState } from "react";
import { BankCode, BankCodeLabel } from "@/models/enums/Request";

export const BankHeader: React.FC<{ bankCode: BankCode }> = ({ bankCode }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [bankInitials, setBankInitials] = useState<string>("");

  useEffect(() => {
    getBankInitials();
  }, []);
  const getBankInitials = async () => {
    const bankName = BankCodeLabel[bankCode];
    switch (bankName) {
      case BankCodeLabel.DAVI:
        setBankInitials("DV");
        break;
      case BankCodeLabel.BCO:
        setBankInitials("BC");
        break;
      case BankCodeLabel.COLT:
        setBankInitials("CTF");
        break;
    }
  };

  return (
    <View style={styles.userHeader}>
      <View style={styles.logoSection}>
        <Image
          source={require("@/assets/logo/purple.png")}
          style={styles.appLogo}
        />
      </View>
      <View
        style={[
          styles.profileAvatar,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <AppText style={styles.profileInitials}>{bankInitials}</AppText>
      </View>

    </View>
  );
};
