import { getAppTheme, getBankTheme } from "@/assets/themes/paperTheme";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export const useTheme = (userRole: string) => {
  const [role, setRole] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  useEffect(() => {
    const paramRole = typeof userRole === "string" ? userRole : null;
    if (paramRole) {
      setRole(paramRole);
    }
  }, [userRole]);

  const theme = useMemo(
    () =>
      role === "bank" ? getBankTheme(colorScheme) : getAppTheme(colorScheme),
    [role, colorScheme]
  );

  return theme;
};
