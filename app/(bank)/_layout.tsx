import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { getBankTheme } from "@/assets/themes/paperTheme";
import { BankProvider } from "@/hooks/context/BankContext";

export default function Layout() {
  const colorScheme = useColorScheme();
  const theme = getBankTheme(colorScheme);

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </PaperProvider>
  );
}