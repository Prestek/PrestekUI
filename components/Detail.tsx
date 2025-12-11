import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  Text,
  TextInput,
  useTheme,
  IconButton,
  Portal,
  Dialog,
  MD3Theme,
} from "react-native-paper";
import { router } from "expo-router";
import { AppText } from "@/components/AppText";
import {
  BankCodeLabel,
  LoanRequestStatus,
  LoanRequestStatusLabel,
} from "@/models/enums/Request";
import { spacing, borderRadius, typography } from "@/assets/styles/theme";
import { Navigation } from "@/components/Navigation";
import { DetailProps } from "@/models/creditModels";
import {
  getBackgroundColorByStatus,
  getColorByStatus,
} from "@/models/functions/color";
import { useUpdateApplication } from "@/hooks/useUpdateApplication";
import { formatDateTime } from "@/models/functions/date";

export const Detail: React.FC<DetailProps> = ({
  request,
  role,
  user,
  bankCode,
}) => {
  const theme = useTheme();
  const styles = createDetailStyles(theme);

  const [observations, setObservations] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<LoanRequestStatus | null>(
    null
  );
  const [dialogObservations, setDialogObservations] = useState("");
  const { updateApplicationRequest } = useUpdateApplication();

  const handleStatusChange = (newStatus: LoanRequestStatus) => {
    setPendingStatus(newStatus);
    setObservations("");
    setDialogObservations(observations);
    setDialogVisible(true);
  };

  const rejectApplication = async () => {
    await updateApplicationRequest(request.id, bankCode, {
      status: LoanRequestStatus.REJECTED,
      notes: dialogObservations,
    });
    setDialogVisible(false);
    setDialogObservations("");
  };

  const approveApplication = async () => {
    await updateApplicationRequest(request.id, bankCode, {
      status: LoanRequestStatus.APPROVED,
      notes: dialogObservations,
    });
    setDialogVisible(false);
    setDialogObservations("");
  };

  if (!request) {
    return (
      <View style={styles.container}>
        <AppText style={styles.errorText}>Solicitud no encontrada</AppText>
        <Button mode="contained" onPress={() => router.back()}>
          Volver
        </Button>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      {/* Header */}
      <Navigation
        header={true}
        headerChildren={
          <AppText style={styles.headerTitle}>Detalle de solicitud</AppText>
        }
        showElevated={true}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Applicant Info */}
          <Card
            style={[styles.card, { backgroundColor: theme.colors.background }]}
            mode="elevated"
          >
            <Card.Title
              title={
                role === "bank"
                  ? "Información del cliente"
                  : "Información del banco"
              }
              titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
              left={(props) => (
                <IconButton
                  {...props}
                  icon={role === "bank" ? "account" : "bank"}
                  iconColor={theme.colors.primary}
                  size={30}
                />
              )}
            />
            <Card.Content style={styles.cardContent}>
              {role === "bank" ? (
                <>
                  <View style={styles.infoRow}>
                    <Text
                      style={[styles.label, { color: theme.colors.onPrimary }]}
                    >
                      Nombre completo
                    </Text>
                    <AppText
                      style={[styles.value, { color: theme.colors.secondary }]}
                    >
                      {user?.firstName + " " + user?.lastName}
                    </AppText>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text
                      style={[styles.label, { color: theme.colors.onPrimary }]}
                    >
                      Identificación
                    </Text>
                    <AppText
                      style={[styles.value, { color: theme.colors.secondary }]}
                    >
                      {user?.documentNumber}
                    </AppText>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text
                      style={[styles.label, { color: theme.colors.onPrimary }]}
                    >
                      Ingresos mensuales
                    </Text>
                    <AppText
                      style={[styles.value, { color: theme.colors.secondary }]}
                    >
                      {user?.monthlyIncome.toLocaleString("es-CO")}
                    </AppText>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.infoRow}>
                    <Text
                      style={[styles.label, { color: theme.colors.onPrimary }]}
                    >
                      Egresos mensuales
                    </Text>
                    <AppText
                      style={[styles.value, { color: theme.colors.secondary }]}
                    >
                      {user?.monthlyExpenses.toLocaleString("es-CO")}
                    </AppText>
                  </View>
                </>
              ) : (
                <View style={styles.bankContainer}>
                  <View style={[styles.detailBankLogoContainer]}>
                    <AppText style={styles.detailBankLogoText}>
                      {request.bankName?.substring(0, 2).toUpperCase() ||
                        BankCodeLabel[bankCode]?.substring(0, 2).toUpperCase()}
                    </AppText>
                  </View>
                  <AppText style={styles.detailBankName}>
                    {request.bankName || BankCodeLabel[bankCode]}
                  </AppText>
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Request Info */}
          <Card style={styles.card} mode="elevated">
            <Card.Title
              title="Detalles de la solicitud"
              titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
              left={(props) => (
                <IconButton
                  {...props}
                  icon="file-document"
                  iconColor={theme.colors.primary}
                  size={30}
                />
              )}
            />
            <Card.Content style={styles.cardContent}>
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  ID Solicitud
                </Text>
                <AppText
                  style={[styles.value, { color: theme.colors.secondary }]}
                >
                  {request.id}
                </AppText>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Fecha de solicitud
                </Text>
                <AppText
                  style={[styles.value, { color: theme.colors.secondary }]}
                >
                  {formatDateTime(request.applicationDate)}
                </AppText>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Monto solicitado
                </Text>
                <AppText
                  style={[
                    styles.valueHighlight,
                    { color: theme.colors.primary },
                  ]}
                >
                  ${request.amount.toLocaleString("es-CO")}
                </AppText>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.infoRow}>
                <Text
                  style={[
                    styles.label,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  Estado
                </Text>
                <Chip
                  style={[
                    styles.statusChip,
                    {
                      backgroundColor: getBackgroundColorByStatus(
                        request.status
                      ),
                    },
                  ]}
                  textStyle={[
                    styles.chipText,
                    { color: getColorByStatus(request.status) },
                  ]}
                >
                  {LoanRequestStatusLabel[request.status]}
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Rejection Reason if exists */}
          {request.rejectionReason && (
            <Card style={styles.card} mode="elevated">
              <Card.Title
                title="Motivo de rechazo"
                titleStyle={[styles.cardTitle, { color: theme.colors.error }]}
                left={(props) => (
                  <IconButton
                    {...props}
                    icon="alert-circle"
                    iconColor={theme.colors.error}
                    size={30}
                  />
                )}
              />
              <Card.Content>
                <AppText
                  style={[styles.value, { color: theme.colors.onSurface }]}
                >
                  {request.rejectionReason}
                </AppText>
              </Card.Content>
            </Card>
          )}

          {/* Notes if exists */}
          {request.notes && !request.rejectionReason && (
            <Card style={styles.card} mode="elevated">
              <Card.Title
                title="Observaciones"
                titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
                left={(props) => (
                  <IconButton
                    {...props}
                    icon="note-text"
                    iconColor={theme.colors.primary}
                    size={30}
                  />
                )}
              />
              <Card.Content>
                <AppText
                  style={[styles.value, { color: theme.colors.onSurface }]}
                >
                  {request.notes}
                </AppText>
              </Card.Content>
            </Card>
          )}

          {/* Action Buttons */}
          {request.status === LoanRequestStatus.PENDING && role === "bank" && (
            <View style={styles.actionsContainer}>
              <Button
                mode="contained-tonal"
                onPress={() => handleStatusChange(LoanRequestStatus.REJECTED)}
                buttonColor={theme.colors.errorContainer}
                textColor={theme.colors.inversePrimary}
                icon="close"
                style={styles.actionButton}
              >
                Rechazar
              </Button>
              <Button
                mode="contained"
                onPress={() => handleStatusChange(LoanRequestStatus.APPROVED)}
                icon="check"
                style={styles.actionButton}
                textColor={theme.colors.inversePrimary}
              >
                Aprobar
              </Button>
            </View>
          )}

          {request.status !== LoanRequestStatus.PENDING && role === "bank" && (
            <View style={styles.statusInfoContainer}>
              <AppText
                style={[
                  styles.statusInfoText,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                Esta solicitud ya ha sido{" "}
                {request.status === LoanRequestStatus.APPROVED
                  ? "aprobada"
                  : "rechazada"}
                .
              </AppText>
            </View>
          )}
        </ScrollView>
      </Navigation>
      {/* Confirmation Dialog */}
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <Dialog.Title>
            {pendingStatus === LoanRequestStatus.APPROVED
              ? "Aprobar solicitud"
              : "Rechazar solicitud"}
          </Dialog.Title>
          <Dialog.Content style={{ gap: spacing.md }}>
            <AppText>
              ¿Estás seguro de que deseas{" "}
              {pendingStatus === LoanRequestStatus.APPROVED
                ? "aprobar"
                : "rechazar"}{" "}
              esta solicitud?
            </AppText>
            <TextInput
              mode="outlined"
              label={
                pendingStatus === LoanRequestStatus.REJECTED
                  ? "Motivo del rechazo *"
                  : "Observaciones (opcional)"
              }
              multiline
              numberOfLines={4}
              value={dialogObservations}
              onChangeText={setDialogObservations}
              placeholder={
                pendingStatus === LoanRequestStatus.REJECTED
                  ? "Describe el motivo del rechazo..."
                  : "Añade observaciones sobre esta decisión..."
              }
              outlineColor={theme.colors.outline}
              activeOutlineColor={theme.colors.primary}
            />
            {pendingStatus === LoanRequestStatus.REJECTED &&
              !dialogObservations.trim() && (
                <AppText style={{ color: theme.colors.error, fontSize: 12 }}>
                  El motivo del rechazo es obligatorio
                </AppText>
              )}
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setDialogVisible(false);
                setDialogObservations("");
              }}
            >
              Cancelar
            </Button>
            <Button
              onPress={
                pendingStatus === LoanRequestStatus.REJECTED
                  ? rejectApplication
                  : approveApplication
              }
            >
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export const createDetailStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    bankContainer: {
      alignItems: "center",
      gap: spacing.xs,
    },
    detailBankLogoContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    detailBankName: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.secondary,
      marginBottom: 8,
    },
    detailBankLogoText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.inversePrimary,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xs,
    },
    headerTitle: {
      fontSize: typography.sizes.lg,
      fontWeight: "600",
    },
    scrollContent: {
      padding: spacing.md,
      gap: spacing.md,
      paddingBottom: spacing.xl,
    },
    statusContainer: {
      marginBottom: spacing.sm,
    },
    statusChip: {
      paddingHorizontal: spacing.md,
      alignSelf: "flex-start",
    },
    chipText: {
      color: "#fff",
      fontWeight: "600",
    },
    card: {
      borderRadius: borderRadius.lg,
      backgroundColor: theme.colors.background,
    },
    cardTitle: {
      fontSize: typography.sizes.md,
    },
    cardContent: {
      gap: spacing.sm,
    },
    infoRow: {
      gap: spacing.xs,
    },
    label: {
      fontSize: typography.sizes.sm,
      fontWeight: "500",
    },
    value: {
      fontSize: typography.sizes.md,
      fontWeight: "400",
    },
    valueHighlight: {
      fontSize: typography.sizes.lg,
      fontWeight: "700",
    },
    divider: {
      marginVertical: spacing.xs,
      backgroundColor: theme.colors.primary,
    },
    textArea: {
      minHeight: 120,
    },
    actionsContainer: {
      flexDirection: "row",
      gap: spacing.md,
      marginTop: spacing.md,
    },
    actionButton: {
      flex: 1,
      borderRadius: borderRadius.lg,
      paddingVertical: spacing.xs,
    },
    statusInfoContainer: {
      padding: spacing.md,
      alignItems: "center",
    },
    statusInfoText: {
      fontSize: typography.sizes.md,
      textAlign: "center",
    },
    errorText: {
      fontSize: typography.sizes.lg,
      textAlign: "center",
      marginBottom: spacing.lg,
    },
  });
