import { createNavigationStyles } from "@/assets/styles/nav.styles";
import { ChildrenProps } from "@/models/childrenModel";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";

interface NavigationProps extends ChildrenProps {
    showExit?: boolean;
    currentStep?: number;
    totalSteps?: number;
    stepLabels?: string[];
    stepTitle?: string;
    showBackButton?: boolean;
    showShadow?: boolean;
    showElevated?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ 
    children, 
    showExit = false,
    currentStep,
    totalSteps,
    stepLabels = [],
    showBackButton = true,
    showElevated = false
}) => {
    const router = useRouter();
    const theme = useTheme();
    const styles = createNavigationStyles(theme);
    const { signOut } = useClerk();
    const [isScrolled, setIsScrolled] = useState(false);


    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/(home)');
        }
    };

    const handleSignOut = async () => {
        console.log("Sign out button pressed")
        try {
            await signOut()
            router.replace("/(auth)/sign-in")
        } catch (err) {
            console.error(JSON.stringify(err, null, 2))
        }
    }

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolled(offsetY > 10);
    };

    // Clonar children e inyectar el handler de scroll si es un ScrollView
    const childrenWithScroll = React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === ScrollView) {
            return React.cloneElement(child as React.ReactElement<any>, {
                onScroll: handleScroll,
                scrollEventThrottle: 16
            });
        }
        return child;
    });

    const showProgressSteps = currentStep !== undefined && totalSteps !== undefined;

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
        <View style={styles.container}>
            <Appbar.Header 
                style={[
                    styles.appbar,
                    isScrolled && styles.appbarElevated
                ]}
                elevated={showElevated ? isScrolled : false}
            >
                <View style={[styles.titleContainer, showBackButton && !showExit && styles.titleContainerWithBackButton, showExit && !showBackButton && styles.titleContainerWithExitButton]}>
                    {showBackButton && <View style={styles.backButtonContainer}>
                        <Appbar.BackAction onPress={handleBack} color={theme.colors.primary} />
                    </View>}
                    {showExit && 
                    <View style={styles.backButtonContainer}>
                        <Appbar.Action icon="close" onPress={handleSignOut} color={theme.colors.primary} />
                    </View>
                    }
                </View>
            </Appbar.Header>
            
            {showProgressSteps && (
                <View style={styles.progressContainer}>
                    <View style={styles.stepsContainer}>
                        {renderSteps()}
                    </View>
                </View>
            )}
            
            {showElevated ? childrenWithScroll : children}
        </View>
    );
}