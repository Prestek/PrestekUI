import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { getItem } from "@/utils/secureStorage";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [roleLoaded, setRoleLoaded] = useState(false);

  useEffect(() => {
    const loadRole = async () => {
      const storedRole = await getItem("role");
      setRole(storedRole);
      setRoleLoaded(true);
    };
    loadRole();
  }, []);

  if (!roleLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isSignedIn) {
    console.log("Redirecting authenticated user away from auth routes");
    if (role === "client") {
      return <Redirect href="/(client)/(home)" />;
    } else if (role === "bank") {
      return <Redirect href="/(bank)/(home)" />;
    } else {
      return <Redirect href="/" />;
    }
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
