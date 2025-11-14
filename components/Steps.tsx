import { createNavigationStyles } from "@/assets/styles/nav.styles";
import { ChildrenProps } from "@/models/childrenModel";
import { NavigationProps } from "@/models/navigationModels";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import { AppText } from "./AppText";


export const Steps: React.FC<NavigationProps> = ({ 
    currentStep,
    totalSteps,
    stepLabels = [],
    title,
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
                                ]}
                            />
                            <AppText 
                                style={[
                                    styles.stepLabel,
                                    isActive && styles.stepLabelActive
                                ]}
                            >
                                {label}
                            </AppText>
                        </View>
                    </View>
                </View>
            );
        }
        return steps;
    };
    return (
        <View style={styles.progressContainer}>
            <AppText style={styles.progressStepTitle}>{title}</AppText>
            <View style={styles.stepsContainer}>
                {renderSteps()}
            </View>
        </View>
    );
}

