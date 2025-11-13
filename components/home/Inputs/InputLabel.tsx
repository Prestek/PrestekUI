import { createAuthStyles } from "@/assets/styles/auth.styles";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { AppText } from "@/components/AppText";
import { View } from "react-native";
import { useTheme } from "react-native-paper";


export const InputLabel: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => {
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const authStyles = createAuthStyles(theme);
    return (
    <View style={styles.inputLabelContainer}>
      <AppText style={authStyles.inputLabel}>{label}</AppText>
      {children}
    </View>
  );
}