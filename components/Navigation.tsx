import { createNavigationStyles } from "@/assets/styles/nav.styles";
import { NavigationProps } from "@/models/navigationModels";
import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import { Appbar, IconButton, useTheme } from "react-native-paper";
import { deleteItem } from "@/utils/secureStorage";

export const Navigation: React.FC<NavigationProps> = ({
  children,
  showExit = false,
  showBackButton = true,
  showElevated = false,
  header = false,
  headerChildren,
  backAction,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const styles = createNavigationStyles(theme);
  const { signOut } = useClerk();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleBack = () => {
    if (backAction) {
      backAction();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const handleSignOut = async () => {
    console.log("Sign out button pressed");
    try {
      await deleteItem("user");
      await deleteItem("role");
      await signOut();
      router.replace("/(auth)/role");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 10);
  };

  const childrenWithScroll = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ScrollView) {
      return React.cloneElement(child as React.ReactElement<any>, {
        onScroll: handleScroll,
        scrollEventThrottle: 16,
      });
    }
    return child;
  });

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={[styles.appbar, isScrolled && styles.appbarElevated]}
        elevated={showElevated ? isScrolled : false}
      >
        {header && headerChildren ? (
          <View style={styles.headerLayout}>
            <View style={styles.headerSide}>
              {showBackButton && (
                <View style={styles.backButtonContainer}>
                  <IconButton
                    icon="arrow-left"
                    onPress={handleBack}
                    iconColor={theme.colors.primary}
                    size={22}
                    style={styles.iconButtonStyle}
                  />
                </View>
              )}
            </View>
            <View style={styles.headerCenter}>{headerChildren}</View>
            <View style={styles.headerSide}>
              {showExit && (
                <View style={styles.backButtonContainer}>
                  <IconButton
                    icon="close"
                    onPress={handleSignOut}
                    iconColor={theme.colors.primary}
                    size={22}
                    style={styles.iconButtonStyle}
                  />
                </View>
              )}
            </View>
          </View>
        ) : (
          <View
            style={[
              styles.titleContainer,
              showBackButton &&
                !showExit &&
                styles.titleContainerWithBackButton,
              showExit &&
                !showBackButton &&
                styles.titleContainerWithExitButton,
            ]}
          >
            {showBackButton && (
              <View style={styles.backButtonContainer}>
                <IconButton
                  icon="arrow-left"
                  onPress={handleBack}
                  iconColor={theme.colors.primary}
                  size={22}
                  style={styles.iconButtonStyle}
                />
              </View>
            )}
            {showExit && (
              <View style={styles.backButtonContainer}>
                <IconButton
                  icon="close"
                  onPress={handleSignOut}
                  iconColor={theme.colors.primary}
                  size={22}
                  style={styles.iconButtonStyle}
                />
              </View>
            )}
          </View>
        )}
      </Appbar.Header>

      {showElevated ? childrenWithScroll : children}
    </View>
  );
};
