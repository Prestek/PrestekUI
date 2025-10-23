import { View, StyleSheet } from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";

export function Login() {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Avatar.Icon size={120} icon="credit-card" style={{ backgroundColor: theme.colors.primary }}/>
        <Text style={styles.title}>Prestek</Text>
        <Text style={styles.subtitle}>Tu plataforma de gestión de créditos</Text>
      </View>
      <View style={styles.bottomContainer}>
        <Button
          icon="login"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
        >
          Iniciar sesión con Microsoft
        </Button>
        <Text style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}>
          Al continuar, aceptas nuestros términos de servicio y política de privacidad
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  logoContainer: {
    flexGrow: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 20
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  terms: {
    textAlign: 'center'
  },
});
