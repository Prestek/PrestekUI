import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  PaperProvider,
} from 'react-native-paper'
import { ScrollView, StatusBar, useColorScheme } from 'react-native'
import { LightScheme } from '../assets/themes/LightScheme'
import { DarkScheme } from '../assets/themes/DarkScheme'
import { createAuthStyles } from '@/assets/styles/auth.styles'
import { useFonts } from 'expo-font'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

const fontConfig = {
  config: {
    bodyLarge:   { fontFamily: 'Mulish-Regular' },
    bodyMedium:  { fontFamily: 'Mulish-Regular' },
    bodySmall:   { fontFamily: 'Mulish-Regular' },
    labelLarge:  { fontFamily: 'Mulish-Regular' },
    labelMedium: { fontFamily: 'Mulish-Regular' },
    titleLarge:  { fontFamily: 'Mulish-Bold' },
    titleMedium: { fontFamily: 'Mulish-Bold' },
  },
};

const lightScheme = {
  ...DefaultTheme,
  colors: LightScheme,
  fonts: configureFonts(fontConfig),
}
const darkScheme = {
  ...MD3DarkTheme,
  colors: DarkScheme,
  fonts: configureFonts(fontConfig),
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? darkScheme : lightScheme
  const [fontsLoaded] = useFonts({
    'Mulish-Regular': require('@/assets/Mulish-VariableFont_wght.ttf'),
    'Mulish-Bold': require('@/assets/Mulish-Bold.ttf'),
  });

  if (!fontsLoaded) {
    // aquí puedes mostrar tu Splash o un loader
    return null;
  }
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.onBackground }} edges={['top', 'bottom']}>
          <StatusBar barStyle="dark-content"/>
          <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <Slot />
          </ClerkProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
