import { createHomeStyles } from "@/assets/styles/home.styles";
import { Image, View } from "react-native";
import { Text, TouchableRipple, useTheme } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";
import { useUserExists } from "@/hooks/useUserExists";
import { router } from "expo-router";

export const UserHeader: React.FC = () => {
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const { user: userClerk } = useUser();
  const { user, isChecking } = useUserExists();

  if (isChecking) {
    return null;
  }

  const getUserName = () => {
    let name = user?.firstName || userClerk?.firstName || "";
    if (!name) {
      let correo = userClerk?.emailAddresses?.[0]?.emailAddress
        ? userClerk.emailAddresses[0].emailAddress
        : "";
      correo = correo.split("@")[0];
      name = correo;
    }
    const firstName = name.split(" ");
    const selectedName = firstName.length > 0 ? firstName[0] : name;
    return selectedName.toUpperCase();
  };

  const getUserInitials = () => {
    const name = getUserName();
    const lastName = user?.lastName || userClerk?.lastName || "";
    console.log(name, lastName);
    const fullName = lastName ? `${name} ${lastName}` : name;
    return `${fullName[0]}${fullName[0]}`.toUpperCase();
  };

  // Obtener saludo basado en la hora del día
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Buenos días";
    } else if (hour < 18) {
      return "Buenas tardes";
    } else {
      return "Buenas noches";
    }
  };

  const userName = getUserName();
  const userInitials = getUserInitials();
  const greeting = getGreeting();

  return (
    <View style={styles.userHeader}>
      {/* Left side - Profile */}
      <View style={styles.profileSection}>
        <TouchableRipple
          borderless={false}
          onPress={() => router.push("/(client)/(home)/profile")}
        >
          <View
            style={[
              styles.profileAvatar,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <Text style={styles.profileInitials}>{userInitials}</Text>
          </View>
        </TouchableRipple>
        <View style={styles.profileInfo}>
          <Text style={[styles.greetingText, { color: theme.colors.primary }]}>
            {greeting + ","}
          </Text>
          <Text
            style={[styles.userNameText, { color: theme.colors.onPrimary }]}
          >
            {userName}
          </Text>
        </View>
      </View>
      <Image
        source={require("@/assets/logo/azul.png")}
        style={{ width: 100, height: 40, resizeMode: "contain" }}
      />
    </View>
  );
};
