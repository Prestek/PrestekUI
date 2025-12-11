import { Card, useTheme } from "react-native-paper";
import { createStyles } from "@/assets/styles/bank.styles";
import { AppText } from "@/components/AppText";
import { typography } from "@/assets/styles/theme";
import { CardResumeProps } from "@/models/bankResumeModels";
import { useAvatarIcon } from "@/hooks/useCardIcons";

export const CardResume: React.FC<CardResumeProps> = ({
  title,
  value,
  icon,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const renderLeftIcon = useAvatarIcon(icon, 30);

  return (
    <Card style={styles.metricCard} mode="outlined">
      <Card.Title
        title={title}
        left={renderLeftIcon}
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
