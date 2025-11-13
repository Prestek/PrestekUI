
import { SignOutButton } from '@/components/auth/SignOutButton'
import { useTheme } from 'react-native-paper';
import { createHomeStyles } from '@/assets/styles/home.styles';
import { Navigation } from '@/components/Navigation';
import { View } from 'react-native';

export default function ProfilePage() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  
  return (
    <Navigation>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <SignOutButton />
      </View>
    </Navigation>
  )
}
