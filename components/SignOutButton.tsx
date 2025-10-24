import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()
  const theme = useTheme()

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
    <TouchableOpacity onPress={handleSignOut} style={[styles.button, { backgroundColor: theme.colors.error }]}>
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
