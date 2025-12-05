import { ApplicationsProvider } from '@/hooks/context/ApplicationsContext'
import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  )
}
