import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { useScanner } from '@/hooks/useScanner';
import { useEffect } from 'react';
import CompleteProfile from './profile/CompleteProfile';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { createScanStyles } from '@/assets/styles/scan.styles';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/AppText';

export default function CedulaScanner() {
  const theme = useTheme();
  const styles = createScanStyles(theme);
  const router = useRouter();
  const { 
    hasPermission, 
    requestPermission,
    scanned, 
    lastData, 
    handleBarCodeScanned, 
    setScanned 
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
    return (
      <View style={styles.center}>
        <AppText style={{ marginBottom: 16 }}>
          No se otorgó permiso a la cámara.
        </AppText>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <AppText style={styles.buttonText}>Solicitar permiso</AppText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    lastData ? (<CompleteProfile data={lastData.parsed} />) : 
    (
    <View style={styles.container}>

      {/* Camera Container */}
      <View style={styles.cameraWrapper}>
        <View style={styles.cameraContainer}>
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ["pdf417"],
            }}
            onBarcodeScanned={handleBarCodeScanned}
          />

          {/* Top Action Buttons */}
          <View style={styles.topOverlay}>
            <TouchableOpacity 
                style={styles.topButton} 
                onPress={() => setScanned(false)}
              >
                <MaterialIcons name="refresh" size={28} color={theme.colors.surface} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.topButton} 
                onPress={() => router.back()}
              >
                <MaterialIcons name="close" size={28} color={theme.colors.surface} />
              </TouchableOpacity>
          </View>

          {/* Document Silhouette Overlay */}
          <View style={[StyleSheet.absoluteFillObject, styles.silhouetteOverlay]}>
            <View style={styles.dashedBorder}>
              <AppText style={styles.silhouetteText}>Place your ID card here</AppText>
            </View>
          </View>

          {/* Floating Instructions */}
          <View style={styles.bottomOverlay}>
            <View style={styles.bottomPanel}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} color={theme.colors.primary} />
                  <AppText style={styles.instructionText}>
                    Scanning document...
                  </AppText>
              </View>
              <View style={styles.instructionSectionCamera}>
                <View style={styles.instructionItem}>
                  <MaterialIcons name="info" size={20} color={theme.colors.primary} />
                  <AppText style={styles.instructionText}>
                      Make sure the ID card is fully visible and well lit
                  </AppText>
                </View>
                <View style={styles.instructionItem}>
                  <MaterialIcons name="check-circle" size={20} color={theme.colors.primary} />
                  <AppText style={styles.instructionText}>
                    Avoid reflections and shadows on the document
                  </AppText>
                </View>
              </View>
            

            </View>
          </View>
        </View>
      </View>
    </View>));
}


