import { getItem } from '@/utils/secureStorage';
import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth()
  const [role, setRole] = useState<string | null>(null)
  const [roleLoaded, setRoleLoaded] = useState(false)

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await getItem("role");
      setRole(storedRole);
      setRoleLoaded(true);
    }
    loadRole();
  }, [])

  // Mostrar loading mientras Clerk carga o el role carga
  if (!isLoaded || !roleLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isSignedIn) {
    if (role === "client") {
      return <Redirect href="/(client)/(home)" />
    } else if (role === "bank") {
      return <Redirect href="/(bank)/(home)" />
    } else {
      return <Redirect href="/" />
    }
  }

  return <Redirect href="/(auth)/role" />
}
