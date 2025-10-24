import { createAuthStyles } from "@/assets/styles/auth.styles";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";


export const InputLabel: React.FC<{ label: string, children: React.ReactNode }> = ({ label, children }) => {
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const authStyles = createAuthStyles(theme);
    return (
    <View style={styles.inputLabelContainer}>
      <Text style={authStyles.inputLabel}>{label}</Text>
      {children}
    </View>
  );
}