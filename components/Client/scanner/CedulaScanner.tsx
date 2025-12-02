import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { createScanStyles } from '@/assets/styles/scan.styles';
import { router } from 'expo-router';
import { AppText } from '@/components/AppText';
import { CedulaScannerProps } from '@/models/scannerModels';

export const CedulaScanner: React.FC<CedulaScannerProps> = ({ handleBarCodeScanned, setScanned }) => {
  const theme = useTheme();
  const styles = createScanStyles(theme);

  return (
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
              <AppText style={styles.silhouetteText}>Coloca tu cédula aquí</AppText>
            </View>
          </View>

          {/* Floating Instructions */}
          <View style={styles.bottomOverlay}>
            <View style={styles.bottomPanel}>
            <View style={styles.loadingContainer}>
                <ActivityIndicator animating={true} color={theme.colors.primary} />
                  <AppText style={styles.instructionText}>
                    Escaneando documento...
                  </AppText>
              </View>
              <View style={styles.instructionSectionCamera}>
                <View style={styles.instructionItem}>
                  <MaterialIcons name="info" size={20} color={theme.colors.primary} />
                  <AppText style={styles.instructionText}>
                      Asegura que la cédula de identidad esté completamente visible y bien iluminada.
                  </AppText>
                </View>
                <View style={styles.instructionItem}>
                  <MaterialIcons name="check-circle" size={20} color={theme.colors.primary} />
                  <AppText style={styles.instructionText}>
                    Evita reflejos y sombras en el documento.
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>);
}


