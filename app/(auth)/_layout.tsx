import { Redirect, Stack, usePathname } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  console.log("AuthLayout - isSignedIn:", isSignedIn, "pathname:", pathname);

  // Permitir acceso a complete-profile y scan incluso si el usuario está autenticado
  const allowedRoutesForAuthenticated = ['complete-profile', 'scan'];
  const isAllowedRoute = allowedRoutesForAuthenticated.some(route => pathname.includes(route));
  
  if (isSignedIn && !isAllowedRoute) {
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
