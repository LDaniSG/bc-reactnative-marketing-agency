import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ListRenderItemInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { CampaignsListScreenProps } from '../navigation/types';

export function HomeScreen({ navigation }: CampaignsListScreenProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_ITEMS;
    return MOCK_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.clientName.toLowerCase().includes(query) ||
      item.channel.toLowerCase().includes(query) ||
      item.industry.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleItemPress = useCallback((item: Campaign) => {
    navigation.navigate('CampaignDetail', { id: item.id, title: item.title });
  }, [navigation]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Campaign>) => (
    <ItemCard item={item} onPress={handleItemPress} />
  ), [handleItemPress]);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No campaigns found</Text>
      <Text style={styles.emptySubtitle}>No hay campañas que coincidan con "{searchQuery}". Prueba con un cliente, industria o canal.</Text>
    </View>
  ), [searchQuery]);

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);
  const keyExtractor = useCallback((item: Campaign) => item.id, []);
  const activeCampaigns = MOCK_ITEMS.filter((item) => item.status === 'active').length;
  const totalBudget = MOCK_ITEMS.reduce((total, item) => total + item.budget, 0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.eyebrowRow}>
            <View style={styles.logoMark}><Text style={styles.logoText}>A</Text></View>
            <Text style={styles.eyebrow}>APEX MEDIA AGENCY</Text>
          </View>
          <Text style={styles.headerTitle}>Hola, Dani</Text>
          <Text style={styles.headerSubtitle}>Este es el resumen de tus campañas.</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{activeCampaigns}</Text>
              <Text style={styles.summaryLabel}>ACTIVE CAMPAIGNS</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>${Math.round(totalBudget / 1000)}K</Text>
              <Text style={styles.summaryLabel}>TOTAL BUDGET</Text>
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
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.xl, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.xl },
  logoMark: { width: 28, height: 28, borderRadius: 9, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#ffffff', fontSize: 17, fontWeight: '900' },
  eyebrow: { color: COLORS.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.4 },
  headerTitle: { ...TYPOGRAPHY.title, fontSize: 28, letterSpacing: 0 },
  headerSubtitle: { ...TYPOGRAPHY.subtitle, marginTop: SPACING.xs, fontSize: 14 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', marginTop: SPACING.xl, paddingVertical: SPACING.md },
  summaryItem: { flex: 1 },
  summaryValue: { color: COLORS.textPrimary, fontSize: 19, fontWeight: '800' },
  positiveValue: { color: COLORS.accent },
  summaryLabel: { color: COLORS.textMuted, fontSize: 9, fontWeight: '800', letterSpacing: 0.6, marginTop: 3 },
  summaryDivider: { width: 1, height: 30, backgroundColor: COLORS.border, marginHorizontal: SPACING.md },
  searchContainer: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md },
  searchInput: { flex: 1, paddingVertical: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  listContent: { padding: SPACING.lg, paddingTop: SPACING.xl },
  separator: { height: 0 },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center', lineHeight: 20 },
});
