import { createScanStyles } from "@/assets/styles/scan.styles";
import { AppText } from "@/components/AppText";
import { CedulaScanner } from "@/components/Client/scanner/CedulaScanner";
import { PermissionDenied } from "@/components/Client/scanner/PermissionDenied";
import CompleteProfile from "@/components/Client/scanner/profile/CompleteProfile";
import { useScanner } from "@/hooks/useScanner";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function ScanCamera() {
  const theme = useTheme();
  const styles = createScanStyles(theme);
  const {
    hasPermission,
    requestPermission,
    lastData,
    handleBarCodeScanned,
    setScanned,
  } = useScanner();

  useEffect(() => {
    if (hasPermission === null) {
      requestPermission();
    }
  }, [hasPermission]);

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <AppText>Pidiendo permiso para usar la cámara...</AppText>
      </View>
    );
  }

  if (hasPermission === false) {
    return <PermissionDenied requestPermission={requestPermission} />;
  }

  return lastData ? (
    <CompleteProfile data={lastData.parsed} isEditing={false} />
  ) : (
    <CedulaScanner
      handleBarCodeScanned={handleBarCodeScanned}
      setScanned={setScanned}
    />
  );
}
