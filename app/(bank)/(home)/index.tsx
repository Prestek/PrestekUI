import React, { useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  BottomNavigation,
  Button,
  Card,
  Chip,
  IconButton,
  MD3Theme,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";
import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { AppText } from "@/components/AppText";
import { NavigationBottom } from "@/components/BottomNavigation";
import { createStyles } from "@/assets/styles/bank.styles";



export default function HomePage() {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={{ flex: 1 }}>
      <SignedOut>
        <View style={styles.signedOutContainer}>
          <AppText style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Debes iniciar sesión
          </AppText>
          <View style={styles.linkRow}>
            <Link href="/(auth)/sign-in" style={styles.authLink}>
              <AppText style={styles.authLinkText}>Iniciar sesión</AppText>
            </Link>
            <Link href="/(auth)/sign-up" style={styles.authLink}>
              <AppText style={styles.authLinkText}>Crear cuenta</AppText>
            </Link>
          </View>
        </View>
      </SignedOut>

      <SignedIn>
        <NavigationBottom />
      </SignedIn>
    </View>
  );
}

