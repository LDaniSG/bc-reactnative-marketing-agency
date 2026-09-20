import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Campaign } from '../types';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

interface ItemCardProps {
  item: Campaign;
  onPress: (item: Campaign) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const isCompleted = item.status === 'completed';
  const isPaused = item.status === 'paused';
  const isDraft = item.status === 'draft';

  const statusColor = isCompleted
    ? COLORS.accent
    : isPaused
    ? COLORS.warning
    : isDraft
    ? COLORS.textMuted
    : COLORS.success;

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
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, marginBottom: SPACING.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.cardBorder },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: SPACING.lg, gap: SPACING.xs + 2 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: SPACING.sm + 2, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  channelText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  clientName: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  cardSubtitle: { ...TYPOGRAPHY.body, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.background, borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.xs, borderWidth: 1, borderColor: COLORS.border },
  statColumn: { alignItems: 'flex-start' },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700', letterSpacing: 0.5 },
  statValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '700', marginTop: 2 },
  actionButton: { backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, paddingVertical: SPACING.md - 2, alignItems: 'center', marginTop: SPACING.xs },
  actionButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
});
