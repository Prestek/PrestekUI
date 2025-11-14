import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SignOutButton } from '@/components/auth/SignOutButton'
import { useCheckUserExists } from '@/hooks/useEmailAuth';
import { BottomNavigation, useTheme } from 'react-native-paper';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { ResumeLayout } from '@/components/home/Resume/ResumeLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createAuthStyles, spacing } from '@/assets/styles/auth.styles';
import { AppText } from '@/components/AppText';
import { LoadingTransition } from '@/components/LoadingTransition';
import { NavigationBottom } from '@/components/BottomNavigation';

export default function HomePage() {
  const { user } = useUser();
  const { isChecking } = useCheckUserExists(user?.emailAddresses[0].emailAddress || '');
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  // Mostrar loading mientras se verifica la existencia del usuario
  if (isChecking) {
    return (
      <LoadingTransition />
    );
  }

  return (
    <View style={[styles.homeContainer]}>
      <SignedIn>
        <NavigationBottom />
      </SignedIn>
      <SignedOut>
        <AppText style={[styles.title, { color: theme.colors.onBackground }]}>You are signed out</AppText>
        <View style={styles.linkContainer}>
          <Link href="/(auth)/sign-in" style={[styles.link, { backgroundColor: theme.colors.primary }]}>
            <AppText style={styles.linkText}>Sign in</AppText>
          </Link>
          <Link href="/(auth)/sign-up" style={[styles.link, { backgroundColor: theme.colors.primary }]}>
            <AppText style={styles.linkText}>Sign up</AppText>
          </Link>
        </View>
      </SignedOut>
    </View>
  );
}

