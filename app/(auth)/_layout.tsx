import { Redirect, Stack, usePathname } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  console.log("AuthLayout - isSignedIn:", isSignedIn, "pathname:", pathname);

  // Permitir acceso a complete-profile incluso si el usuario está autenticado
  if (isSignedIn && !pathname.includes('complete-profile')) {
    console.log("Redirecting authenticated user away from auth routes");
    return <Redirect href={'/'} />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
