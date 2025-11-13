import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SignOutButton } from '@/components/auth/SignOutButton'
import { useCheckUserExists } from '@/hooks/useEmailAuth';
import { useTheme } from 'react-native-paper';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { ResumeLayout } from '@/components/home/Resume/ResumeLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAuthStyles } from '@/assets/styles/auth.styles';

export default function HomePage() {
  const { user } = useUser();
  const { isChecking } = useCheckUserExists(user?.emailAddresses[0].emailAddress || '');
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const authStyles = createAuthStyles(theme);
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
      <SafeAreaView style={{ flex: 1 }}>
        <SignedIn>
          <ResumeLayout />
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
      </SafeAreaView>       
    </View>
  );
}

