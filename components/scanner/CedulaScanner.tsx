import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView } from 'expo-camera';
import { useScanner } from '@/hooks/useScanner';
import { useCallback, useEffect } from 'react';
import CompleteProfileScreen from './profile/CompleteProfile';

export default function CedulaScanner() {
  // Usar useCallback para estabilizar el callback y evitar re-renders
  const { 
    hasPermission, 
    requestPermission,
    scanned, 
    lastData, 
    handleBarCodeScanned, 
    setScanned 
  } = useScanner();

  // Solicitar permisos automáticamente cuando el componente se monta
  useEffect(() => {
    if (hasPermission === null) {
      requestPermission();
    }
    // Solo dependemos de hasPermission, requestPermission es estable
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    lastData ? (<CompleteProfileScreen data={lastData.parsed} />) : 
    (
    <View style={styles.container}>
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

      <View style={styles.info}>
        <Text style={styles.title}>Apunta la cámara a la cédula (PDF417)</Text>

        {scanned ? (
          <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
            <Text style={styles.buttonText}>Escanear otra vez</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ marginTop: 8 }}>Escaneando...</Text>
        )}
      </View>
    </View>));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
  },
  info: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
