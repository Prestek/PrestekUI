import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { useScanner } from '@/hooks/useScanner';
import { useEffect } from 'react';
import CompleteProfile from './profile/CompleteProfile';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import { createScanStyles } from '@/assets/styles/scan.styles';

export default function CedulaScanner() {
  const theme = useTheme();
  const styles = createScanStyles(theme);
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
        <Text>Pidiendo permiso para usar la cámara...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 16 }}>
          No se otorgó permiso a la cámara.
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Solicitar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    lastData ? (<CompleteProfile data={lastData.parsed} />) : 
    (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>Captura de cedula</Text>
        <Text style={styles.subtitle}>Toma una foto clara de la parte trase del documento de identidad</Text>
      </View>

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
        </View>
      </View>

      {/* Instructions Section */}
      <View style={styles.instructionsSection}>
        <View style={styles.instructionItem}>
          <MaterialIcons name="info" size={20} color={theme.colors.primary} />
          <Text style={styles.instructionText}>
            Asegúrate que la cédula esté completamente visible y bien iluminada.
          </Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialIcons name="check-circle" size={20} color={theme.colors.primary} />
          <Text style={styles.instructionText}>
            Evita reflejos y sombras sobre el documento.
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonSecondaryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    </View>));
}


