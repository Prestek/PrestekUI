import { createAuthStyles } from '@/assets/styles/auth.styles'
import { useClerk } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'
import { AppText } from '../AppText';

export const SignOutButton: React.FC<{text?: string}> = ({text = 'Sign Out'}) => {
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
      <AppText style={styles.buttonText}>{text || "Sign Out"}</AppText>
    </TouchableOpacity>
  )
}

