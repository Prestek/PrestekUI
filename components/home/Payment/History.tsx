import { createHomeStyles } from "@/assets/styles/home.styles";
import { ScrollView, View } from "react-native";
import { Avatar, IconButton, MD3Colors, Text, useTheme, Searchbar, Button, Chip, Surface } from "react-native-paper";
import { AppText } from "@/components/AppText";
import { createPaymentStyles } from "@/assets/styles/payment.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { spacing, typography } from "@/assets/styles/theme";
import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Applications } from "./Applications";
import { creditRequests } from "@/hooks/const/data";


export const History = () => {
    const theme = useTheme();
    const paymentStyles = createPaymentStyles(theme);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRequests = creditRequests.filter(request =>
        request.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.amount.toString().includes(searchQuery) ||
        request.status.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <Topbar
            headerContent={
                <>
                    <View style={{ width: '100%', gap: spacing.md }}>
                        <View style={paymentStyles.historyHeader}>
                            <AppText style={paymentStyles.historyTitle}>Credit Applications</AppText>
                            <Chip
                                mode="outlined"
                                icon="file-document-outline"
                                textStyle={{ color: theme.colors.primary, fontSize: 14 }}
                            >
                                Applications: {filteredRequests.length}
                            </Chip>
                        </View>

                        <View style={{ 
                            paddingHorizontal: spacing.md, 
                            flexDirection: 'row', 
                            alignItems: 'center',
                            gap: spacing.sm
                        }}>
                            <Searchbar
                                placeholder="Search requests..."
                                onChangeText={setSearchQuery}
                                value={searchQuery}
                                style={{
                                    borderWidth: 1,
                                    borderColor: theme.colors.outline,
                                    flex: 1,
                                    height: 40,
                                    justifyContent: 'center',
                                }}
                                inputStyle={{ 
                                    fontSize: 14,
                                    minHeight: 0,
                                    alignSelf: 'center',
                                }}
                                iconColor={theme.colors.onSurfaceVariant}
                            />
                            <IconButton
                                icon="filter-variant"
                                iconColor={theme.colors.onSurfaceVariant}
                                size={24}
                                onPress={() => console.log('Abrir filtros')}
                                style={{ 
                                    margin: 0,
                                    borderWidth: 1,
                                    borderColor: theme.colors.outline,
                                    borderRadius: 8,
                                }}
                            />
                        </View>
                    </View>
                </>
            }
        >
            <ScrollView
                style={{ flex: 1, backgroundColor: theme.colors.surfaceVariant, paddingHorizontal: spacing.md }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: spacing["4xl"], paddingTop: spacing.md }}
                showsVerticalScrollIndicator={false}
            >
                <Applications filteredRequests={filteredRequests} showElevation={true} />
            </ScrollView>
        </Topbar>
    );
}