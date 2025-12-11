import { createScanStyles } from "@/assets/styles/scan.styles";
import { AppText } from "@/components/AppText";
import { AuthButton } from "@/components/auth";
import { Navigation } from "@/components/Navigation";
import { PermissionDeniedProps } from "@/models/scannerModels";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const PermissionDenied: React.FC<PermissionDeniedProps> = ({
  requestPermission,
}) => {
  const theme = useTheme();
  const styles = createScanStyles(theme);

  return (
    <Navigation showExit={false} showElevated={true} showBackButton={true}>
      <ScrollView
        contentContainerStyle={styles.permissionDeniedContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.colors.errorContainer },
            ]}
          >
            <MaterialCommunityIcons
              name="camera-off"
              size={64}
              color={theme.colors.error}
            />
          </View>

          {/* Título principal */}
          <AppText style={[styles.title, styles.mainTitle]}>
            Permiso Denegado
          </AppText>

          {/* Mensaje descriptivo */}
          <AppText style={[styles.subtitle, styles.description]}>
            No se otorgó permiso para acceder a la cámara. Para escanear tu
            cédula necesitas habilitar el acceso a la cámara.
          </AppText>

          {/* Instrucciones adicionales */}
          <View
            style={[
              styles.infoBox,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <MaterialCommunityIcons
              name="information"
              size={20}
              color={theme.colors.primary}
            />
            <AppText
              style={[
                styles.infoText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Si el problema persiste, verifica los permisos de la aplicación en
              la configuración de tu dispositivo.
            </AppText>
          </View>
        </View>

        {/* Botón para solicitar permiso */}
        <View style={styles.buttonContainer}>
          <AuthButton onPress={requestPermission}>
            Solicitar Permiso Nuevamente
          </AuthButton>
        </View>
      </ScrollView>
    </Navigation>
  );
};
