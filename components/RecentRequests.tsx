
import { ApplicationProps } from "@/models/applicationModels"
import { createHomeStyles } from "@/assets/styles/home.styles"
import { View } from "react-native"
import { useTheme } from "react-native-paper";
import { AppText } from "./AppText";
import { Applications } from "./Applications";

export const RecentRequests: React.FC<ApplicationProps> = ({ filteredRequests = [],role }) => {
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  return (
    <View>
      <View style={styles.applicationHeader}>
        <AppText style={styles.introTitle}>Solicitudes</AppText>
        <AppText style={styles.seeAllLink}>Ver todas</AppText>
      </View>
      <Applications
        filteredRequests={filteredRequests}
        showElevation={false}
        limit={2}
        role={role}
      />
    </View>
  );
};