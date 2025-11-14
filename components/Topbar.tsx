import { createNavigationStyles } from "@/assets/styles/nav.styles";
import { ChildrenProps } from "@/models/childrenModel";
import React, { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, View, StyleSheet } from "react-native";
import { Appbar, useTheme, Surface } from "react-native-paper";
import { spacing } from "@/assets/styles/theme";

interface TopbarProps extends ChildrenProps {
    headerContent?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({ 
    children, 
    headerContent
}) => {
    const theme = useTheme();
    const styles = createNavigationStyles(theme);
    const [isScrolled, setIsScrolled] = useState(false);

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

    return (
        <View style={topbarStyles.container}>
            <Surface 
                elevation={isScrolled ? 4 : 0}
                style={[
                    topbarStyles.header,
                    { backgroundColor: theme.colors.background }
                ]}
            >
                {headerContent && (
                    <View style={topbarStyles.headerContent}>
                        {headerContent}
                    </View>
                )}
            </Surface>
            {childrenWithScroll}
        </View>
    );
}

const topbarStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingVertical: spacing.md,
    },
    headerContent: {
        width: '100%',
    },
});
