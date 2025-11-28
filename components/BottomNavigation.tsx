import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, } from 'react-native';
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import { createBottomNavigationStyles } from '@/assets/styles/bottom.styles';
import { ResumeLayout } from './Client/home/Resume/ResumeLayout';
import { Loan } from './Client/home/Loan/Loan';
import Profile from './Client/home/profile/Profile';
import { getItem } from '@/utils/secureStorage';
import Resume from './Bank/Resume';
import { Applications } from './Bank/Applications';
import { History } from './History';


export const NavigationBottom = () => {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const styles = createBottomNavigationStyles(theme);
  const [role, setRole] = useState<string | null>(null);
  const [routes, setRoutes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'applications', title: 'Applications', icon: 'history' },
    { key: 'loan', title: 'Loan', icon: 'credit-card' },
    { key: 'profile', title: 'Profile', icon: 'account' }
  ]);
  useEffect(() => {
    const getRole = async () => {
      const role = await getItem('role');
      setRole(role);
      if (role === 'bank') {
        setRoutes([
          { key: 'home', title: 'Resumen', icon: 'home' },
          { key: 'applications', title: 'Solicitudes', icon: 'history' },
          { key: 'profile', title: 'Cuenta', icon: 'account' }
        ]);
      }
    };
    getRole();
  },[]);


  const renderUserRoutes = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'home':
        return <ResumeLayout />;
      case 'applications':
        return <History />;
      case 'loan':
        return <Loan />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  const renderBankRoutes = ({ route }: { route: any }) => {
    switch (route.key) {
      case 'home':
        return <Resume />;
      case 'applications':
        return <History />;
      case 'profile':
        return <Profile />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>

      {role === 'bank' ? renderBankRoutes({ route: routes[index] }) : renderUserRoutes({ route: routes[index] })}
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


