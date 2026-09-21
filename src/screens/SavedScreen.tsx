import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar, Pressable, ListRenderItemInfo } from 'react-native';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { useSavedCampaignsStore } from '../stores/savedStore';
import { SavedScreenProps } from '../navigation/types';

export function SavedScreen({ navigation }: SavedScreenProps): React.JSX.Element {
  const savedCampaigns = useSavedCampaignsStore((state) => state.savedCampaigns);
  const clearSaved = useSavedCampaignsStore((state) => state.clearSaved);

  const handleItemPress = useCallback(
    (item: Campaign) => {
      navigation.navigate('CampaignsTab', {
        screen: 'CampaignDetail',
        params: { id: item.id, title: item.title },
      });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Campaign>) => (
      <ItemCard item={item} onPress={handleItemPress} />
    ),
    [handleItemPress]
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No hay campañas guardadas</Text>
        <Text style={styles.emptySubtitle}>Guarda campañas desde su detalle para consultarlas rápidamente aquí.</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={TYPOGRAPHY.title}>Campañas guardadas</Text>
            <Text style={TYPOGRAPHY.subtitle}>Registros guardados ({savedCampaigns.length})</Text>
          </View>
          {savedCampaigns.length > 0 && (
            <Pressable style={styles.clearButton} onPress={clearSaved}>
              <Text style={styles.clearButtonText}>Borrar todo</Text>
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={savedCampaigns}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.lg, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clearButton: { backgroundColor: COLORS.error + '20', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.error },
  clearButtonText: { color: COLORS.error, fontWeight: '700', fontSize: 12 },
  listContent: { padding: SPACING.lg },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center' },
});
