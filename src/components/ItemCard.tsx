import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Campaign } from '../types';

interface ItemCardProps {
  item: Campaign;
  onPress: (item: Campaign) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const isCompleted = item.status === 'completed';
  const isPaused = item.status === 'paused';
  const statusColor = isCompleted ? '#38bdf8' : isPaused ? '#f59e0b' : '#22c55e';

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onPress(item)}>
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.channelText}>{item.channel}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.clientName}>{item.clientName} • {item.industry}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>BUDGET</Text>
            <Text style={styles.statValue}>${item.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>SPENT</Text>
            <Text style={styles.statValue}>${item.spent.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>EST. REACH</Text>
            <Text style={styles.statValue}>{item.targetReach}</Text>
          </View>
        </View>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Campaign Analytics</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1e293b', borderRadius: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#334155' },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 16, gap: 8 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  channelText: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  clientName: { fontSize: 13, color: '#6366f1', fontWeight: '600' },
  cardSubtitle: { fontSize: 14, color: '#cbd5e1', lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0f172a', borderRadius: 12, padding: 12, marginTop: 8, borderWidth: 1, borderColor: '#1e293b' },
  statColumn: { alignItems: 'flex-start' },
  statLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', letterSpacing: 0.5 },
  statValue: { fontSize: 13, color: '#f1f5f9', fontWeight: '700', marginTop: 2 },
  actionButton: { backgroundColor: '#6366f1', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 6 },
  actionButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
});
