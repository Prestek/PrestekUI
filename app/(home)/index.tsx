import { createHomeStyles } from '@/assets/styles/home.styles';
import { AppText } from '@/components/AppText';
import { NavigationBottom } from '@/components/BottomNavigation';
import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper';



export default function HomePage() {
  //const { user } = useUser();
  //const { isChecking } = useCheckUserExists(user?.emailAddresses[0].emailAddress || '');
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  /*if (isChecking) {
    return (
      <LoadingTransition />
    );
  }*/

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

