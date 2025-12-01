import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { LoadingTransition } from "@/components/LoadingTransition";
import { useCheckUserExists } from "@/hooks/useEmailAuth";
import { ResumeLayout } from "@/components/Client/home/Resume/ResumeLayout";

export default function HomePage() {
  const { user } = useUser();
  const { isChecking } = useCheckUserExists(
    user?.emailAddresses[0].emailAddress || ""
  );
  const theme = useTheme();
  const styles = createHomeStyles(theme);

  if (isChecking) {
    return <LoadingTransition />;
  }

  return (
    <ResumeLayout />
  );
}
