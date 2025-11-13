import { View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { useTheme } from "react-native-paper";
import { AuthButton } from "./AuthButton";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import React from "react";
import { OtpProps } from "@/models/authModels";
import { Navigation } from "../Navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { AppText } from "../AppText";


export const EmailVerificationStep: React.FC<OtpProps> = ({ email, code, setCode, loading, handleVerify }) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <Navigation
      showExit={true}
      showElevated={true}
      showBackButton={false}
    >
      <View style={styles.otp}>
        <View style={styles.otpContent}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="email" size={30} color={theme.colors.primary} />
            <AppText style={styles.introTitle}>Verify your email</AppText>
          </View>
          <AppText style={styles.termsText}>We sent a verification code to {email}</AppText>
          <View style={styles.otpContainer}>
            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={6}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}
                >
                  <AppText style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </AppText>
                </View>
              )}
            />
          </View>
        </View>
        <AuthButton onPress={() => handleVerify(code)} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </AuthButton>
      </View>
    </Navigation>
  );
}