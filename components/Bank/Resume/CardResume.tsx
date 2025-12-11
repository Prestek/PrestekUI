import { Avatar, Card, useTheme } from "react-native-paper";
import { createStyles } from "@/assets/styles/bank.styles";
import { AppText } from "@/components/AppText";
import { typography } from "@/assets/styles/theme";
import { CardResumeProps } from "@/models/bankResumeModels";

export const CardResume: React.FC<CardResumeProps> = ({
  title,
  value,
  icon,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Card style={styles.metricCard} mode="outlined">
      <Card.Title
        title={title}
        left={(props) => <Avatar.Icon {...props} icon={icon} size={30} />}
        leftStyle={{ marginRight: -2 }}
        titleStyle={{
          color: theme.colors.primary,
          fontSize: typography.sizes.sm,
        }}
        style={{ paddingBottom: 0, marginBottom: -10 }}
      />
      <Card.Content style={{ paddingTop: 0 }}>
        <AppText style={styles.cardValue}>{value}</AppText>
      </Card.Content>
    </Card>
  );
};
