import { SignOutButton } from "@/components/auth/SignOutButton";
import { AppText } from "@/components/AppText";
import { User } from "@/models/userModels";
import { getItem } from "@/utils/secureStorage";
import { useUser } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { useTheme, Divider, ActivityIndicator } from "react-native-paper";
import { createHomeStyles } from "@/assets/styles/home.styles";
import { spacing, borderRadius, typography } from "@/assets/styles/theme";
import { useRouter } from "expo-router";

export default function Profile() {
  const theme = useTheme();
  const styles = createHomeStyles(theme);
  const localStyles = createProfileStyles(theme);
  const { user: userClerk } = useUser();
  const router = useRouter();
  
  // Estado local para el usuario
  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Función para cargar datos del usuario
  const loadUser = useCallback(async () => {
    try {
      const storedUser = await getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    } finally {
      setIsChecking(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUser();
  }, [loadUser]);

  // Navegar a la pantalla de edición
  const handleEditProfile = () => {
    router.push("/(client)/(home)/edit-profile");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getEmploymentStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'Employed': 'Empleado',
      'Unemployed': 'Desempleado',
      'Self-Employed': 'Autónomo',
      'Student': 'Estudiante',
      'Retired': 'Retirado'
    };
    return labels[status] || status;
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 700) return '#22c55e'; // Verde
    if (score >= 600) return '#eab308'; // Amarillo
    if (score >= 500) return '#f97316'; // Naranja
    return '#ef4444'; // Rojo
  };

  const getCreditScoreLabel = (score: number) => {
    if (score >= 700) return 'Excelente';
    if (score >= 600) return 'Bueno';
    if (score >= 500) return 'Regular';
    return 'Bajo';
  };

  const getUserInitials = () => {
    const firstName = user?.firstName || userClerk?.firstName || '';
    const lastName = user?.lastName || userClerk?.lastName || '';
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  };

  if (isChecking) {
    return (
      <View style={[styles.container, localStyles.loadingContainer]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <AppText style={localStyles.loadingText}>Cargando perfil...</AppText>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.container, localStyles.loadingContainer]}>
        <MaterialCommunityIcons name="account-alert" size={64} color={theme.colors.error} />
        <AppText style={localStyles.errorText}>No se pudo cargar el perfil</AppText>
        <SignOutButton />
      </View>
    );
  }

  return (
    
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={localStyles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }
    >
      {/* Header del perfil */}
      <View style={localStyles.profileHeader}>
        <View style={[localStyles.avatarLarge, { backgroundColor: theme.colors.primary }]}>
          <AppText style={localStyles.avatarText}>{getUserInitials()}</AppText>
        </View>
        <AppText style={[localStyles.userName, { color: theme.colors.primary, textAlign: 'center' }]}>
          {user.firstName} {user.lastName}
        </AppText>
        <AppText style={[localStyles.userEmail, { color: theme.colors.onSurfaceVariant }]}>
          {user.email}
        </AppText>
      </View>

      {/* Información financiera */}
      <View style={[localStyles.infoCard, { backgroundColor: theme.colors.surfaceVariant }]}>
        <View style={localStyles.cardHeader}>
          <MaterialCommunityIcons name="wallet" size={24} color={theme.colors.primary} />
          <AppText style={[localStyles.cardTitle, { color: theme.colors.primary }]}>Información Financiera</AppText>
        </View>
        
        <View style={localStyles.infoRow}>
          <View style={localStyles.infoItem}>
            <AppText style={[localStyles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Ingresos mensuales</AppText>
            <AppText style={[localStyles.infoValue, { color: '#22c55e' }]}>
              {formatCurrency(user.monthlyIncome)}
            </AppText>
          </View>
          <View style={localStyles.infoItem}>
            <AppText style={[localStyles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Gastos mensuales</AppText>
            <AppText style={[localStyles.infoValue, { color: '#ef4444' }]}>
              {formatCurrency(user.monthlyExpenses)}
            </AppText>
          </View>
        </View>

        <Divider style={localStyles.divider} />

        <View style={localStyles.infoRowSingle}>
          <AppText style={[localStyles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Capacidad de ahorro</AppText>
          <AppText style={[localStyles.infoValueHighlight, { color: theme.colors.primary }]}>
            {formatCurrency(user.monthlyIncome - user.monthlyExpenses)}
          </AppText>
        </View>
      </View>

      {/* Información personal */}
      <View style={[localStyles.infoCard, { backgroundColor: theme.colors.surfaceVariant }]}>
        <View style={localStyles.cardHeaderWithAction}>
          <View style={localStyles.cardHeader}>
            <MaterialCommunityIcons name="account-details" size={24} color={theme.colors.primary} />
            <AppText style={[localStyles.cardTitle, { color: theme.colors.primary }]}>Información Personal</AppText>
          </View>
          <TouchableOpacity onPress={handleEditProfile} style={localStyles.editButton}>
              <MaterialCommunityIcons name="pencil" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
        </View>
 
          <View style={localStyles.infoList}>
            <View style={localStyles.infoListItem}>
              <MaterialCommunityIcons name="card-account-details" size={20} color={theme.colors.onSurfaceVariant} />
              <View style={localStyles.infoListContent}>
                <AppText style={[localStyles.infoListLabel, { color: theme.colors.onSurfaceVariant }]}>Documento</AppText>
                <AppText style={[localStyles.infoListValue, { color: theme.colors.secondary }]}>{user.documentNumber}</AppText>
              </View>
            </View>

            <View style={localStyles.infoListItem}>
              <MaterialCommunityIcons name="phone" size={20} color={theme.colors.onSurfaceVariant} />
              <View style={localStyles.infoListContent}>
                <AppText style={[localStyles.infoListLabel, { color: theme.colors.onSurfaceVariant }]}>Teléfono</AppText>
                <AppText style={[localStyles.infoListValue, { color: theme.colors.secondary }]}>{user.phone}</AppText>
              </View>
            </View>

            <View style={localStyles.infoListItem}>
              <MaterialCommunityIcons name="briefcase" size={20} color={theme.colors.onSurfaceVariant} />
              <View style={localStyles.infoListContent}>
                <AppText style={[localStyles.infoListLabel, { color: theme.colors.onSurfaceVariant }]}>Estado de empleo</AppText>
                <AppText style={[localStyles.infoListValue, { color: theme.colors.secondary}]}>
                  {getEmploymentStatusLabel(user.employmentStatus)}
                </AppText>
              </View>
            </View>
          </View>
      </View>

      {/* Botón de cerrar sesión */}
      <View style={localStyles.signOutContainer}>
        <SignOutButton />
      </View>

      <View style={localStyles.bottomSpacing} />
    </ScrollView>
  );
}

const createProfileStyles = (theme: any) => StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing["4xl"],
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: typography.sizes.md,
    color: theme.colors.onSurfaceVariant,
    marginTop: spacing.sm,
  },
  errorText: {
    fontSize: typography.sizes.lg,
    color: theme.colors.error,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: 'white',
  },
  userName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.sizes.md,
  },
  scoreCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,

  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  scoreTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  scoreContent: {
    alignItems: 'center',
  },
  scoreValueContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: typography.weights.bold,
  },
  scoreLabel: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  scoreBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.xs,
  },
  scoreRangeText: {
    fontSize: typography.sizes.xs,
    color: '#9ca3af',
  },
  infoCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardHeaderWithAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
  },
  editButton: {
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: typography.sizes.sm,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  infoValueHighlight: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  divider: {
    marginVertical: spacing.md,
  },
  infoRowSingle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoList: {
    gap: spacing.md,
  },
  infoListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoListContent: {
    flex: 1,
  },
  infoListLabel: {
    fontSize: typography.sizes.xs,
  },
  infoListValue: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
  },
  signOutContainer: {
    marginTop: spacing.lg,
  },
  bottomSpacing: {
    height: spacing.xxl,
  },
});
