import { createStyles } from "@/assets/styles/bank.styles";
import { AppText } from "@/components/AppText";
import { Dimensions, View } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { BarChart } from "react-native-chart-kit";
import { spacing } from "@/assets/styles/theme";
import { GraphicProps } from "@/models/bankResumeModels";
import { useIconButton } from "@/hooks/useCardIcons";

export const Graphic: React.FC<GraphicProps> = ({ lastMonthData, currentMonthName, onPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const renderRightIcon = useIconButton("arrow-right", {
      size: 20,
      iconColor: theme.colors.primary,
      onPress
    });

    return (
        <Card style={styles.chartCard} mode="outlined">
          <Card.Title
            title={
              <View>
                <AppText style={styles.chartTitle}>Solicitudes del Último Mes</AppText>
                <AppText style={styles.chartSubtitle}>{currentMonthName}</AppText>
              </View>
            }
            right={renderRightIcon}
          />
          <Card.Content>
            <BarChart
              data={lastMonthData}
              width={Dimensions.get("window").width - spacing.md * 4}
              height={180}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                backgroundColor: theme.colors.background,
                backgroundGradientFrom: theme.colors.background,
                backgroundGradientTo: theme.colors.background,
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(27, 54, 93, ${opacity})`,
                labelColor: (opacity = 1) => theme.colors.onSurface,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeDasharray: "",
                  stroke: theme.colors.surfaceVariant,
                  strokeWidth: 1,
                },
                propsForLabels: {
                  fontSize: 12,
                },
              }}
              style={{
                borderRadius: 16,
              }}
              showValuesOnTopOfBars
              fromZero
            />
          </Card.Content>
        </Card>
    );
}