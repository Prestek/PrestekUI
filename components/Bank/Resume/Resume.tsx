import { createStyles } from "@/assets/styles/bank.styles";
import { CardsResumeProps } from "@/models/bankResumeModels";
import { View } from "react-native";
import {
  useTheme,
} from "react-native-paper";
import { CardResume } from "./CardResume";


export const Resume: React.FC<CardsResumeProps> = ({ cards }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.metricsGrid}>
      {cards.map((card) => (
        <CardResume key={card.title} title={card.title} value={card.value} icon={card.icon} />
      ))}
    </View>
  );
}
