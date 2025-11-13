import { createNavigationStyles } from "@/assets/styles/nav.styles";
import { ChildrenProps } from "@/models/childrenModel";
import { NavigationProps } from "@/models/navigationModels";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";


export const Steps: React.FC<NavigationProps> = ({ 
    currentStep,
    totalSteps,
    stepLabels = [],
}) => {
    const theme = useTheme();
    const styles = createNavigationStyles(theme);
    const renderSteps = () => {
        const steps = [];
        for (let i = 1; i <= (totalSteps || 0); i++) {
            const isActive = i === currentStep;
            const isCompleted = i < (currentStep || 0);
            const label = stepLabels[i - 1] || `Step ${i}`;
            
            steps.push(
                <View key={i} style={styles.stepItemContainer}>
                    <View style={styles.stepWrapper}>
                        {i > 1 && (
                            <View 
                                style={[
                                    styles.stepConnector,
                                    (isCompleted || isActive) && styles.stepConnectorActive
                                ]} 
                            />
                        )}
                        <View style={styles.stepCircleContainer}>
                            <View 
                                style={[
                                    styles.stepCircle,
                                    isActive && styles.stepCircleActive,
                                    isCompleted && styles.stepCircleCompleted
                                ]}
                            >
                                <Text 
                                    style={[
                                        styles.stepNumber,
                                        isCompleted && styles.stepNumberCompleted,
                                        isActive && styles.stepNumberActive,
                                    ]}
                                >
                                    {i}
                                </Text>
                            </View>
                            <Text 
                                style={[
                                    styles.stepLabel,
                                    isActive && styles.stepLabelActive
                                ]}
                            >
                                {label}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }
        return steps;
    };
    return (
        <View style={styles.progressContainer}>
            <View style={styles.stepsContainer}>
                {renderSteps()}
            </View>
        </View>
    );
}

