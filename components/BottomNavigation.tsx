
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { BottomNavigation, Provider } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ProfilePage from '@/app/(home)/profile';
import HomePage from '@/app/(home)';


export const BottomNavigationMenu = () => {
    const [index, setIndex] = useState(0);
  const routes = [
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ];

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'home':
        return <HomePage />;
      case 'settings':
        return <ProfilePage />;
      default:
        return null;
    }
  };

  return (
    <Provider>
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
            <MaterialCommunityIcons name={route.icon as any} size={24} color={color} />
        )}
        getLabelText={({ route }) => route.title}
      />
    </Provider>
  );
};
