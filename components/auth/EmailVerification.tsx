import { View } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import { Text, useTheme } from "react-native-paper";
import { AuthLayout } from "./AuthLayout";
import { AuthButton } from "./AuthButton";
import { createAuthStyles } from "@/assets/styles/auth.styles";
import React from "react";

interface OtpProps {
  email: string;
  code: string;
  setCode: (code: string) => void;
  loading: boolean;
  handleVerify: (code: string) => void;
}

export const EmailVerificationStep: React.FC<OtpProps> = ({ email, code, setCode, loading, handleVerify }) => {
  const theme = useTheme();
  const styles = createAuthStyles(theme);
  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
    });
  
      return (
        <View style={styles.otp}>
          <AuthLayout
            title="Verify your email"
            subtitle={`We sent a verification code to ${email}`}
            icon="email"
          >
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
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
            <AuthButton onPress={() => handleVerify(code)} disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </AuthButton>
          </AuthLayout>
        </View>
      );
}