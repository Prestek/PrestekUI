import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { Main } from './components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper';
import { LightScheme } from './themes/LightScheme';
import { DarkScheme } from './themes/DarkScheme';

const lightScheme = {
  ...DefaultTheme,
  colors: LightScheme
}
const darkScheme = {
  ...MD3DarkTheme,
  colors: DarkScheme
}

export default function App() {
  const colorScheme = useColorScheme(); 
  const theme = colorScheme === 'dark' ? darkScheme : lightScheme;
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Main />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
