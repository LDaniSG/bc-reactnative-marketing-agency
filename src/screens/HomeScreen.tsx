import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = 'Apex Media Agency';
  const DOMAIN_SUBTITLE = 'Digital Marketing & Client Campaign Intelligence';

  function handleItemPress(item: Campaign): void {
    console.log('Selected Campaign:', item.title, 'for Client:', item.clientName);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>AGENCY DASHBOARD</Text>
        </View>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {MOCK_ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} onPress={handleItemPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#334155' },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: '#6366f120', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6, borderWidth: 1, borderColor: '#6366f140' },
  headerBadgeText: { color: '#818cf8', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#f8fafc' },
  headerSubtitle: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
  listContainer: { flex: 1 },
  listContent: { padding: 16 },
});
