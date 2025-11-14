import React from 'react';
import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import { ResumeLayout } from './home/Resume/ResumeLayout';
import { createBottomNavigationStyles } from '@/assets/styles/bottom.styles';
import { spacing } from '@/assets/styles/theme';
import { History } from './home/Payment/History';
import { Loan } from './home/Loan/Loan';
import Profile from './home/profile/Profile';


export const NavigationBottom = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const styles = createBottomNavigationStyles(theme);
  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'history', title: 'History', icon: 'history' },
    { key: 'loan', title: 'Loan', icon: 'credit-card' },
    { key: 'profile', title: 'Profile', icon: 'account' }
  ];

  const renderScene = ({ route }: { route: any }) => {
    
    switch (route.key) {
      case 'home':
        return <ResumeLayout />;
      case 'history':
        return <History />;
      case 'loan':
        return <Loan />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      
        {renderScene({ route: routes[index] })}
      <BottomNavigation.Bar
        navigationState={{ index, routes }}
        onTabPress={({ route }) => {
          const newIndex = routes.findIndex((r) => r.key === route.key);
          if (newIndex !== -1) {
            setIndex(newIndex);
          }
        }}
        renderIcon={({ route, color }) => (
          <Icon source={route.icon} size={24} color={color} />
        )}
        getLabelText={({ route }) => route.title}
        style={styles.bottomBar}
        safeAreaInsets={{ bottom: 0 }}
        compact={true}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onSurface}
        activeIndicatorStyle={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}


