import { Text, View, StyleSheet } from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";

export function Login() {
    const theme = useTheme();
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Avatar.Icon size={150} icon="folder" />
                <Text style={styles.title}>Prestek</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Button 
                    icon="login" 
                    mode="contained" 
                    onPress={() => console.log('Pressed')}
                    style={styles.button}
                >
                    Iniciar sesión con Microsoft
                </Button>
                <Text style={[styles.terms, { color: theme.colors.surfaceVariant }]}>
                    Al continuar, aceptas nuestros términos de servicio y política de privacidad
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 16,
    },
    bottomContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 32,
    },
    button: {
        width: '100%',
        marginBottom: 16,
    },
    terms: {
        textAlign: 'center',
        paddingHorizontal: 16,
    }
});
