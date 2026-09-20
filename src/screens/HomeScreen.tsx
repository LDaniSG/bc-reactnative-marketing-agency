import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ListRenderItemInfo } from 'react-native';
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
      <Text style={styles.emptySubtitle}>No digital marketing campaigns match "{searchQuery}". Try searching by client name, industry, or ad channel.</Text>
    </View>
  ), [searchQuery]);

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);
  const keyExtractor = useCallback((item: Campaign) => item.id, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>APEX MARKETING DASHBOARD</Text>
          </View>
          <Text style={styles.headerTitle}>Campaign Intelligence</Text>
          <Text style={styles.headerSubtitle}>Filter through {MOCK_ITEMS.length} active client marketing campaigns</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search campaigns, clients, channels..."
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
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.lg, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: COLORS.activeBadge, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, marginBottom: SPACING.xs, borderWidth: 1, borderColor: COLORS.primary + '40' },
  headerBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { ...TYPOGRAPHY.title },
  headerSubtitle: { ...TYPOGRAPHY.subtitle, marginTop: 2 },
  searchContainer: { marginTop: SPACING.md },
  searchInput: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  listContent: { padding: SPACING.lg },
  separator: { height: SPACING.xs },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center', lineHeight: 20 },
});
