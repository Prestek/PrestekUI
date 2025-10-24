import { createAuthStyles } from '@/assets/styles/auth.styles'
import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export const SignOutButton = ({text}: {text: string}) => {
  const { signOut } = useClerk()
  const router = useRouter()
  const theme = useTheme()
  const styles = createAuthStyles(theme)

  const handleSignOut = async () => {
    console.log("Sign out button pressed")
    try {
      await signOut()
      router.replace("/(auth)/sign-in")
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.buttonOut}>
      <Text style={styles.buttonText}>{text || "Sign Out"}</Text>
    </TouchableOpacity>
  )
}

