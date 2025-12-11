import { getItem } from '@/utils/secureStorage';
import { useAuth } from '@clerk/clerk-expo'
import { Redirect } from 'expo-router'
import { useState, useEffect } from 'react'
import { LoadingTransition } from '@/components/LoadingTransition';

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
      <LoadingTransition
      />
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
