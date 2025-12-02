import { createHomeStyles } from "@/assets/styles/home.styles";
import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { useUser } from '@clerk/clerk-expo';
import { useUserExists } from "@/hooks/useUserExists";

export const UserHeader: React.FC = () => {
    const theme = useTheme();
    const styles = createHomeStyles(theme);
    const { user: userClerk } = useUser();
    const { user, isChecking } = useUserExists();

    if(isChecking){
        return null;
    }

    const getUserName = () => {
        let name = user?.firstName ? user.firstName : userClerk?.firstName ? userClerk.firstName : '';
        const firstName = name.split(' ');
        const selectedName = firstName.length >= 0 ? firstName[0] : name;
        return selectedName.toUpperCase();
    };

    const getUserInitials = () => {
        const name = getUserName();
        const lastName = user?.lastName ? user.lastName : userClerk?.lastName ? userClerk.lastName  : '';
        return `${name[0]}${lastName[0]}`.toUpperCase();
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
                    <Text style={styles.profileInitials}>{userInitials}</Text>
                </View>
                <View style={styles.profileInfo}>
                    <Text style={[styles.greetingText, { color: theme.colors.primary}]}>{greeting + ","}</Text>
                    <Text style={[styles.userNameText, { color: theme.colors.onPrimary }]}>{userName}</Text>
                </View>
            </View>
        </View>
    );
};
