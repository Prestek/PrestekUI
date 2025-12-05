import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Navigation } from "@/components/Navigation";

export default function ErrorScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ 
    message?: string;
    title?: string;
  }>();

  const errorTitle = params.title || "¡Ups! Algo salió mal";
  const errorMessage = params.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.";

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <Navigation>
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.errorContainer }]}>
        <MaterialCommunityIcons 
          name="alert-circle-outline" 
          size={80} 
          color={theme.colors.error} 
        />
      </View>
      
      <Text 
        variant="headlineMedium" 
        style={[styles.title, { color: theme.colors.error }]}
      >
        {errorTitle}
      </Text>
      
      <Text 
        variant="bodyLarge" 
        style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
      >
        {errorMessage}
      </Text>

      <View style={styles.buttonsContainer}>
        
        <Button
          mode="outlined"
          onPress={handleGoHome}
          style={[styles.button, styles.outlineButton]}
          labelStyle={[styles.buttonLabel, { color: theme.colors.primary }]}
          icon="home"
        >
          Ir al inicio
        </Button>
      </View>

      <View style={[styles.footer, { borderTopColor: theme.colors.outlineVariant }]}>
        <MaterialCommunityIcons 
          name="information-outline" 
          size={16} 
          color={theme.colors.onSurfaceVariant} 
        />
        <Text 
          variant="bodySmall" 
          style={[styles.footerText, { color: theme.colors.onSurfaceVariant }]}
        >
          Si el problema persiste, contacta a soporte técnico
        </Text>
      </View>
    </View>
    </Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 16,
    lineHeight: 24,
  },
  buttonsContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 4,
  },
  outlineButton: {
    borderWidth: 1.5,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  footerText: {
    textAlign: "center",
  },
});

