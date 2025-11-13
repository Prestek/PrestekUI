import { createHomeStyles } from "@/assets/styles/home.styles";
import { View, TouchableOpacity } from "react-native";
import { Badge, Text, useTheme } from "react-native-paper";
import { useUser } from '@clerk/clerk-expo';
import { AppText } from "@/components/AppText";
export const UserHeader: React.FC = () => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    const { user } = useUser();


    // Obtener el nombre del usuario (primera parte del email si no hay nombre completo)
    const getUserName = () => {
        if (user?.firstName && user?.lastName) {
            return `${user.firstName} ${user.lastName}`;
        } else if (user?.firstName) {
            return user.firstName;
        } else if (user?.emailAddresses[0]?.emailAddress) {
            return user.emailAddresses[0].emailAddress.split('@')[0];
        }
        return 'Usuario';
    };

    // Obtener las iniciales para el avatar
    const getUserInitials = () => {
        const name = getUserName();
        const words = name.split(' ');
        if (words.length >= 2) {
            return `${words[0][0]}${words[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Obtener saludo basado en la hora del día
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return 'Buenos días';
        } else if (hour < 18) {
            return 'Buenas tardes';
        } else {
            return 'Buenas noches';
        }
    };

    const userName = getUserName();
    const userInitials = getUserInitials();
    const greeting = getGreeting();

    return (
        <View style={styles.userHeader}>
            {/* Left side - Profile */}
            <View style={styles.profileSection}>
                <View style={[styles.profileAvatar, { backgroundColor: theme.colors.primary }]}>
                 <AppText style={styles.profileInitials}>{userInitials}</AppText>
                </View>
                <View style={styles.profileInfo}>
                    <AppText style={[styles.greetingText, { color: theme.colors.onSurface }]}>{greeting}</AppText>
                    <AppText style={[styles.userNameText, { color: theme.colors.onBackground }]}>{userName}</AppText>
                </View>
            </View>

            {/* Right side - Notifications */}
            <TouchableOpacity style={styles.notificationButton}>
                <View style={styles.notificationIcon}>
                <Badge>3</Badge>

                    
                </View>
            </TouchableOpacity>
        </View>
    );
};
