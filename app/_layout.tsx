import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper'
import { ScrollView, StatusBar, useColorScheme } from 'react-native'
import { LightScheme } from '../assets/themes/LightScheme'
import { DarkScheme } from '../assets/themes/DarkScheme'
import { createAuthStyles } from '@/assets/styles/auth.styles'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

const lightScheme = {
  ...DefaultTheme,
  colors: LightScheme
}
const darkScheme = {
  ...MD3DarkTheme,
  colors: DarkScheme
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkScheme : lightScheme
  const styles = createAuthStyles(theme);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['bottom']}>
          <StatusBar barStyle="dark-content"/>
          <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <Slot />
          </ClerkProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
