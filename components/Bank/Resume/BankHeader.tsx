import { createStyles } from "@/assets/styles/bank.styles";
import { getItem } from "expo-secure-store";
import { Image, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppText } from "../../AppText";
import { useEffect, useState } from "react";

export const BankHeader: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [bank, setBank] = useState<string>("");
  const [bankInitials, setBankInitials] = useState<string>("");

  useEffect(() => {
    getBankInitials();
  }, []);
  const getBankInitials = async () => {
    const bank = await getItem("selectedBank");
    setBank(bank || "");
    switch (bank) {
      case "davivienda":
        setBankInitials("DV");
        break;
      case "bancolombia":
        setBankInitials("BC");
        break;
      case "coltefinanciera":
        setBankInitials("CTF");
        break;
      default:
        setBankInitials("BK");
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
