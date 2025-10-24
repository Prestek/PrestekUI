import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SignOutButton } from '@/components/SignOutButton'
import { useCheckUserExists } from '@/hooks/useEmailAuth';
import { useTheme } from 'react-native-paper';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfilePage() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SignOutButton />
    </View>
  )
}
