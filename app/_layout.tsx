import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { PaperProvider } from 'react-native-paper'
import { StatusBar, useColorScheme } from 'react-native'
import { getAppTheme } from '@/assets/themes/paperTheme'
import { BankProvider } from '@/hooks/context/BankContext'
import { ApplicationsProvider } from '@/hooks/context/ApplicationsContext'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = getAppTheme(colorScheme)

  return (
    <PaperProvider theme={theme}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ApplicationsProvider>
      <BankProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }} edges={['top', 'bottom']}>
          <StatusBar barStyle="dark-content"/>
            <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
      </BankProvider>
      </ApplicationsProvider>
      </ClerkProvider>
    </PaperProvider>
  );
}
