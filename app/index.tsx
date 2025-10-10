import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth()

  // Mostrar loading mientras Clerk carga
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href="/(home)" />
  }

  return <Redirect href="/(auth)/sign-in" />
}
