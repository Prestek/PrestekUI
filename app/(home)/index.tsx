import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useCheckUserExists } from '@/hooks/useEmailAuth';
import { useTheme } from 'react-native-paper';

export default function HomePage() {
  const { user } = useUser();
  const { isChecking } = useCheckUserExists(user?.emailAddresses[0].emailAddress || '');
  const theme = useTheme();

  // Mostrar loading mientras se verifica la existencia del usuario
  if (isChecking) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center' }]}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Verificando perfil...</Text>
      </View>
    );
  }
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SignedIn>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Welcome!</Text>
        <Text style={[styles.email, { color: theme.colors.onBackground }]}>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>You are signed out</Text>
        <View style={styles.linkContainer}>
          <Link href="/(auth)/sign-in" style={[styles.link, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up" style={[styles.link, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  link: {
    padding: 15,
    borderRadius: 5,
    minWidth: 100,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
