import { AppText } from "@/components/AppText";
import { View, Animated } from "react-native";
import { useTheme } from "react-native-paper";
import { createLoanStyles } from "@/assets/styles/loan.styles";
import { useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LoanSearchingProps {
  message?: string;
}

export const LoanSearching = ({ message }: LoanSearchingProps) => {
  const theme = useTheme();
  const styles = createLoanStyles(theme);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const animateSteps = () => {
      Animated.stagger(
        800,
        progressAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          })
        )
      ).start();
    };

    animateSteps();
  }, []);

  const steps = [
    {
      icon: "shield-check",
      title: "Verificación en proceso",
      subtitle: "Validando tu información",
    },
    {
      icon: "chart-line",
      title: "Analizando transacciones recientes",
      subtitle: "Revisando historial financiero",
    },
    {
      icon: "credit-card-outline",
      title: "Evaluando límites de crédito",
      subtitle: "Calculando disponibilidad",
    },
  ];

  return (
    <View style={styles.loanContainer}>
      <View style={styles.searchingContainer}>
        <View style={styles.searchingCircleContainer}>
          <Animated.View
            style={[
              styles.searchingCircle,
              {
                transform: [{ scale: pulseAnim }],
              },
            ]}
          >
            <MaterialCommunityIcons
              name="bank-outline"
              size={64}
              color={theme.colors.primary}
            />
          </Animated.View>
        </View>
        <AppText style={styles.searchingTitle}>
          {message || "Evaluando políticas financieras"}
        </AppText>
        <AppText style={styles.searchingSubtitle}>
          {message 
            ? "Estamos procesando tu solicitud de crédito"
            : "Estamos verificando las mejores ofertas de crédito disponibles para ti"
          }
        </AppText>

        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <Animated.View
              key={index}
              style={[
                styles.stepCard,
                {
                  opacity: progressAnims[index],
                  transform: [
                    {
                      translateY: progressAnims[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.stepIconContainer}>
                <MaterialCommunityIcons
                  name={step.icon as any}
                  size={28}
                  color={theme.colors.onPrimary}
                />
              </View>
              <View style={styles.stepContent}>
                <AppText style={styles.stepTitle}>{step.title}</AppText>
                <AppText style={styles.stepSubtitle}>{step.subtitle}</AppText>
              </View>
            </Animated.View>
          ))}
        </View>

        <AppText style={styles.searchingFooter}>
          Estamos preparando todo para ti... Este proceso puede tomar unos minutos.
        </AppText>
      </View>
    </View>
  );
};

