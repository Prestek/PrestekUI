import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation, Icon, useTheme } from 'react-native-paper';
import { Slot, usePathname, useRouter, useSegments } from 'expo-router';
import { createBottomNavigationStyles } from '@/assets/styles/bottom.styles';
import { getItem } from '@/utils/secureStorage';

type Role = 'client' | 'bank';

type RouteConfig = {
  key: string;
  title: string;
  icon: string;
  path: string;
  matchPath: string;
};

const CLIENT_ROUTES: RouteConfig[] = [
  { key: 'home', title: 'Home', icon: 'home', path: '/(client)/(home)', matchPath: '/' },
  { key: 'applications', title: 'Solicitudes', icon: 'history', path: '/(client)/(home)/applications', matchPath: '/applications' },
  { key: 'loan', title: 'Préstamos', icon: 'credit-card', path: '/(client)/(home)/loan', matchPath: '/loan' },
  { key: 'profile', title: 'Perfil', icon: 'account', path: '/(client)/(home)/profile', matchPath: '/profile' }
];

const BANK_ROUTES: RouteConfig[] = [
  { key: 'home', title: 'Resumen', icon: 'home', path: '/(bank)/(home)', matchPath: '/' },
  { key: 'applications', title: 'Solicitudes', icon: 'history', path: '/(bank)/(home)/applications', matchPath: '/applications' },
  { key: 'profile', title: 'Cuenta', icon: 'account', path: '/(bank)/(home)/profile', matchPath: '/profile' }
];

const normalizePath = (value: string) => {
  if (!value) {
    return '';
  }
  if (value === '/') {
    return value;
  }
  return value.replace(/\/+$/, '');
};

const isRouteMatch = (currentPath: string, targetPath: string) => {
  const normalizedCurrent = normalizePath(currentPath);
  const normalizedTarget = normalizePath(targetPath);

  if (!normalizedCurrent || !normalizedTarget) {
    return false;
  }

  return (
    normalizedCurrent === normalizedTarget ||
    normalizedCurrent.startsWith(`${normalizedTarget}/`)
  );
};

export const NavigationBottom = () => {
  const theme = useTheme();
  const styles = createBottomNavigationStyles(theme);
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const [index, setIndex] = useState(0);
  const [storedRole, setStoredRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getItem('role');
      if (role === 'client' || role === 'bank') {
        setStoredRole(role);
      }
    };

    fetchRole();
  }, []);

  const derivedRoleFromPath: Role = segments.includes('(bank)') ? 'bank' : 'client';
  const role = storedRole ?? derivedRoleFromPath;

  const routes = useMemo<RouteConfig[]>(() => {
    return role === 'bank' ? BANK_ROUTES : CLIENT_ROUTES;
  }, [role]);

  const activeIndex = useMemo(() => {
    if (!pathname) {
      return -1;
    }
    return routes.findIndex((route) => isRouteMatch(pathname, route.matchPath));
  }, [pathname, routes]);

  useEffect(() => {
    if (activeIndex >= 0) {
      setIndex(activeIndex);
    }
  }, [activeIndex]);

  const shouldShowBar = activeIndex >= 0;

  const handleTabPress = (routeKey: string) => {
    const targetRouteIndex = routes.findIndex((route) => route.key === routeKey);
    const targetRoute = routes[targetRouteIndex];

    if (!targetRoute || targetRouteIndex === -1) {
      return;
    }
    setIndex(targetRouteIndex);
    router.push(targetRoute.path as any);
  };

  return (
    <View style={{ flex: 1 }}>
      <Slot />
      {shouldShowBar && (
        <BottomNavigation.Bar
          navigationState={{ index, routes }}
          onTabPress={({ route }) => handleTabPress(route.key)}
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
      )}
    </View>
  );
};
