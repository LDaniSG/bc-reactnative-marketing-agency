import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ListRenderItemInfo, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { CampaignsListScreenProps } from '../navigation/types';
import { useCampaigns } from '../hooks/useItems';

export function HomeScreen({ navigation }: CampaignsListScreenProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError, isFetching, refetch } = useCampaigns();
  const campaigns = data ?? [];

  const filteredCampaigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return campaigns;
    return campaigns.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.clientName.toLowerCase().includes(query) ||
      item.channel.toLowerCase().includes(query) ||
      item.industry.toLowerCase().includes(query)
    );
  }, [campaigns, searchQuery]);

  const handleItemPress = useCallback((item: Campaign) => {
    navigation.navigate('CampaignDetail', { id: item.id, title: item.title });
  }, [navigation]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Campaign>) => (
    <ItemCard item={item} onPress={handleItemPress} />
  ), [handleItemPress]);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.emptyTitle}>Cargando campañas...</Text>
        </>
      ) : isError ? (
        <>
          <Ionicons name="cloud-offline-outline" size={40} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>No pudimos cargar las campañas</Text>
          <Text style={styles.emptySubtitle}>Revisa tu conexión e inténtalo nuevamente.</Text>
          <Pressable style={styles.retryButton} onPress={() => { void refetch(); }}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.emptyTitle}>No encontramos campañas</Text>
          <Text style={styles.emptySubtitle}>No hay campañas que coincidan con "{searchQuery}". Prueba con un cliente, industria o canal.</Text>
        </>
      )}
    </View>
  ), [isError, refetch, searchQuery]);

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);
  const keyExtractor = useCallback((item: Campaign) => item.id, []);
  const activeCampaigns = campaigns.filter((item) => item.status === 'active').length;
  const totalBudget = campaigns.reduce((total, item) => total + item.budget, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.eyebrowRow}>
            <View style={styles.logoMark}><Text style={styles.logoText}>A</Text></View>
            <Text style={styles.eyebrow}>APEX MEDIA AGENCY</Text>
            <Pressable style={styles.createButton} onPress={() => navigation.navigate('CreateCampaign')}>
              <Ionicons name="add" size={18} color={COLORS.primaryDark} />
              <Text style={styles.createButtonText}>Nueva</Text>
            </Pressable>
          </View>
          <Text style={styles.headerTitle}>Hola, Dani</Text>
          <Text style={styles.headerSubtitle}>Este es el resumen de tus campañas.</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{activeCampaigns}</Text>
              <Text style={styles.summaryLabel}>CAMPAÑAS ACTIVAS</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${Math.round(totalBudget / 1000)}K</Text>
              <Text style={styles.summaryLabel}>PRESUPUESTO TOTAL</Text>
            </View>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={19} color={COLORS.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar campañas o clientes"
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <FlatList
          data={filteredCampaigns}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <View>
                <Text style={styles.listTitle}>Campañas en seguimiento</Text>
                <Text style={styles.listSubtitle}>Rendimiento de clientes y canales</Text>
              </View>
              <View style={styles.resultPill}><Text style={styles.resultPillText}>{filteredCampaigns.length}</Text></View>
            </View>
          }
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={isFetching && !isLoading} onRefresh={() => { void refetch(); }} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xxl, backgroundColor: COLORS.primaryDark, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.xl },
  logoMark: { width: 28, height: 28, borderRadius: 9, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: COLORS.primaryDark, fontSize: 17, fontWeight: '900' },
  eyebrow: { color: '#ffd4c8', fontSize: 11, fontWeight: '900', letterSpacing: 1.4 },
  createButton: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: COLORS.primaryLight, paddingHorizontal: SPACING.sm, paddingVertical: 6, borderRadius: RADIUS.full },
  createButtonText: { color: COLORS.primaryDark, fontSize: 12, fontWeight: '900' },
  headerTitle: { ...TYPOGRAPHY.title, color: '#ffffff', fontSize: 28, letterSpacing: 0 },
  headerSubtitle: { ...TYPOGRAPHY.subtitle, color: '#ffe8e1', marginTop: SPACING.xs, fontSize: 14 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.xl, paddingVertical: SPACING.md },
  summaryItem: { flex: 1 },
  summaryValue: { color: '#ffffff', fontSize: 19, fontWeight: '800' },
  positiveValue: { color: COLORS.accent },
  summaryLabel: { color: '#ffd4c8', fontSize: 9, fontWeight: '800', letterSpacing: 0.6, marginTop: 3 },
  summaryDivider: { width: 1, height: 30, backgroundColor: '#ffffff40', marginHorizontal: SPACING.md },
  searchContainer: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.surface, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, marginTop: SPACING.sm },
  searchInput: { flex: 1, paddingVertical: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  listContent: { padding: SPACING.lg, paddingTop: SPACING.md },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.md, marginBottom: SPACING.sm },
  listTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800' },
  listSubtitle: { color: COLORS.textMuted, fontSize: 12, marginTop: 3 },
  resultPill: { minWidth: 32, height: 32, borderRadius: RADIUS.full, backgroundColor: COLORS.activeBadge, alignItems: 'center', justifyContent: 'center' },
  resultPillText: { color: COLORS.accent, fontSize: 13, fontWeight: '900' },
  separator: { height: 0 },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center', lineHeight: 20 },
  retryButton: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.sm, marginTop: SPACING.md },
  retryButtonText: { color: '#ffffff', fontWeight: '800' },
});
