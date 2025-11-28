import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
    Button,
    Card,
    Chip,
    Divider,
    Surface,
    Text,
    TextInput,
    useTheme,
    IconButton,
    Portal,
    Dialog,
    MD3Theme,
    shadow,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { AppText } from "@/components/AppText";
import { statusLabels } from "@/hooks/const/data";
import { LoanRequestStatus } from "@/models/enums/Request";
import { spacing, borderRadius, typography } from "@/assets/styles/theme";
import { Navigation } from "@/components/Navigation";

// Extended request model with additional fields
type ExtendedLoanRequest = {
    id: string;
    applicant: string;
    applicantId: string;
    requestedAt: string;
    amount: number;
    installments: number;
    status: LoanRequestStatus;
    reason: string;
    observations?: string;
    rejectionReason?: string;
};

// Mock extended data - in production this would come from an API
const extendedRequests: Record<string, ExtendedLoanRequest> = {
    "REQ-1201": {
        id: "REQ-1201",
        applicant: "María Gómez",
        applicantId: "CC-1023456789",
        requestedAt: "2025-11-10T09:30:00",
        amount: 35000000,
        installments: 48,
        status: LoanRequestStatus.PENDING,
        reason: "Capital de trabajo para Pyme",
        observations: "",
    },
    "REQ-1200": {
        id: "REQ-1200",
        applicant: "Carlos Pérez",
        applicantId: "CC-1098765432",
        requestedAt: "2025-11-08T14:15:00",
        amount: 15000000,
        installments: 36,
        status: LoanRequestStatus.APPROVED,
        reason: "Compra de vehículo de reparto",
        observations: "Cliente con buen historial crediticio. Aprobado con tasa preferencial.",
    },
    "REQ-1199": {
        id: "REQ-1199",
        applicant: "Lucía Torres",
        applicantId: "CC-1087654321",
        requestedAt: "2025-11-07T11:45:00",
        amount: 42000000,
        installments: 60,
        status: LoanRequestStatus.REJECTED,
        reason: "Consolidación de deudas",
        rejectionReason: "Ratio deuda/ingreso supera límite permitido",
        observations: "Cliente presenta mora en otros productos. Recomendado reevaluar en 6 meses.",
    },
    "REQ-1198": {
        id: "REQ-1198",
        applicant: "Julián Herrera",
        applicantId: "CC-1076543210",
        requestedAt: "2025-11-06T16:05:00",
        amount: 28000000,
        installments: 42,
        status: LoanRequestStatus.PENDING,
        reason: "Ampliación de local comercial",
        observations: "",
    },
};

export default function DetailScreen() {
    const theme = useTheme();
    const styles = createDetailStyles(theme);
    const params = useLocalSearchParams();
    const requestId = typeof params.id === "string" ? params.id : "";

    const [request, setRequest] = useState<ExtendedLoanRequest | null>(null);
    const [observations, setObservations] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [pendingStatus, setPendingStatus] = useState<LoanRequestStatus | null>(null);
    const [dialogObservations, setDialogObservations] = useState("");

    useEffect(() => {
        const foundRequest = extendedRequests[requestId];
        if (foundRequest) {
            setRequest(foundRequest);
            setObservations(foundRequest.observations || "");
        }
    }, [requestId]);

    const handleStatusChange = (newStatus: LoanRequestStatus) => {
        setPendingStatus(newStatus);
        setDialogObservations(observations);
        setDialogVisible(true);
    };

    const confirmStatusChange = () => {
        if (request && pendingStatus) {
            // In production, this would be an API call
            const updatedRequest = {
                ...request,
                status: pendingStatus,
                observations: dialogObservations,
                ...(pendingStatus === LoanRequestStatus.REJECTED && { rejectionReason: dialogObservations }),
            };
            setRequest(updatedRequest);
            setObservations(dialogObservations);
            setDialogVisible(false);
            setDialogObservations("");

            // Navigate back after a short delay
            setTimeout(() => {
                router.back();
            }, 500);
        }
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

    const statusColor = statusLabels[request.status]?.color || theme.colors.onSurface;

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <Navigation header={true} headerChildren={
                <AppText style={styles.headerTitle}>Detalle de solicitud</AppText>
            }
                showElevated={true}>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >

                    {/* Applicant Info */}
                    <Card style={[styles.card, { backgroundColor: theme.colors.tertiary }]} mode="contained" >
                        <Card.Title
                            title="Información del solicitante"
                            titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
                            left={(props) => <IconButton {...props} icon="account" iconColor={theme.colors.primary} size={30} />}
                        />
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onPrimary }]}>
                                    Nombre completo
                                </Text>
                                <AppText style={[styles.value, { color: theme.colors.secondary }]}>
                                    {request.applicant}
                                </AppText>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onPrimary }]}>
                                    Identificación
                                </Text>
                                <AppText style={[styles.value, { color: theme.colors.secondary }]}>
                                    {request.applicantId}
                                </AppText>
                            </View>
                        </Card.Content>
                    </Card>

                    {/* Request Info */}
                    <Card style={styles.card} mode="contained">
                        <Card.Title
                            title="Detalles de la solicitud"
                            titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
                            left={(props) => <IconButton {...props} icon="file-document" iconColor={theme.colors.primary} size={30} />}
                        />
                        <Card.Content style={styles.cardContent}>
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                                    ID Solicitud
                                </Text>
                                <AppText style={[styles.value, { color: theme.colors.secondary }]}>
                                    {request.id}
                                </AppText>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                                    Fecha de solicitud
                                </Text>
                                <AppText style={[styles.value, { color: theme.colors.secondary }]}>
                                    {new Date(request.requestedAt).toLocaleDateString("es-CO", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </AppText>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                                    Monto solicitado
                                </Text>
                                <AppText style={[styles.valueHighlight, { color: theme.colors.primary }]}>
                                    ${request.amount.toLocaleString("es-CO")}
                                </AppText>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                                    Número de cuotas
                                </Text>
                                <AppText style={[styles.value, { color: theme.colors.secondary }]}>
                                    {request.installments} meses
                                </AppText>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.infoRow}>
                                <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
                                    Estado
                                </Text>
                                <Chip
                                    style={[styles.statusChip, { backgroundColor: statusColor }]}
                                    textStyle={styles.chipText}
                                >
                                    {statusLabels[request.status as LoanRequestStatus]?.label}
                                </Chip>
                            </View>
                        </Card.Content>
                    </Card>

                    {/* Rejection Reason if exists */}
                    {request.rejectionReason && (
                        <Card style={styles.card} mode="contained">
                            <Card.Title
                                title="Motivo de rechazo"
                                titleStyle={[styles.cardTitle, { color: theme.colors.error }]}
                                left={(props) => <IconButton {...props} icon="alert-circle" iconColor={theme.colors.error} size={30} />}
                            />
                            <Card.Content>
                                <AppText style={[styles.value, { color: theme.colors.onSurface }]}>
                                    {request.rejectionReason}
                                </AppText>
                            </Card.Content>
                        </Card>
                    )}

                    {/* Observations 
                <Card style={styles.card} mode="contained">
                    <Card.Title
                        title="Observaciones del banco"
                        titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
                        left={(props) => <IconButton {...props} icon="bank" iconColor={theme.colors.primary} size={30} />}
                    />
                    <Card.Content>
                        <TextInput
                            mode="outlined"
                            multiline
                            numberOfLines={6}
                            value={observations}
                            onChangeText={setObservations}
                            placeholder="Añade observaciones sobre esta solicitud..."
                            style={styles.textArea}
                            outlineColor={theme.colors.outline}
                            activeOutlineColor={theme.colors.primary}
                        />
                    </Card.Content>
                </Card>*/}

                    {/* Action Buttons */}
                    {request.status === LoanRequestStatus.PENDING && (
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

                    {request.status !== LoanRequestStatus.PENDING && (
                        <View style={styles.statusInfoContainer}>
                            <AppText style={[styles.statusInfoText, { color: theme.colors.onSurfaceVariant }]}>
                                Esta solicitud ya ha sido {request.status === LoanRequestStatus.APPROVED ? "aprobada" : "rechazada"}.
                            </AppText>
                        </View>
                    )}
                </ScrollView>
            </Navigation>
            {/* Confirmation Dialog */}
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>
                        {pendingStatus === LoanRequestStatus.APPROVED ? "Aprobar solicitud" : "Rechazar solicitud"}
                    </Dialog.Title>
                    <Dialog.Content style={{ gap: spacing.md }}>
                        <AppText>
                            ¿Estás seguro de que deseas {pendingStatus === LoanRequestStatus.APPROVED ? "aprobar" : "rechazar"} esta
                            solicitud?
                        </AppText>
                        <TextInput
                            mode="outlined"
                            label={pendingStatus === LoanRequestStatus.REJECTED ? "Motivo del rechazo *" : "Observaciones (opcional)"}
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
                        {pendingStatus === LoanRequestStatus.REJECTED && !dialogObservations.trim() && (
                            <AppText style={{ color: theme.colors.error, fontSize: 12 }}>
                                El motivo del rechazo es obligatorio
                            </AppText>
                        )}
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setDialogVisible(false);
                            setDialogObservations("");
                        }}>
                            Cancelar
                        </Button>
                        <Button
                            onPress={confirmStatusChange}
                            disabled={pendingStatus === LoanRequestStatus.REJECTED && !dialogObservations.trim()}
                        >
                            Confirmar
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

export const createDetailStyles = (theme: MD3Theme) => StyleSheet.create({
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
        backgroundColor: theme.colors.surfaceVariant,
    },
    cardTitle: {
        fontSize: typography.sizes.md,
        fontFamily: typography.fontFamilyBold,
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
