import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import type { ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const statusLabel = { active: 'ACTIVA', paused: 'PAUSADA', completed: 'COMPLETADA', draft: 'BORRADOR' }[item.status];

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onPress(item)}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.imageUri }} style={styles.cardImage as ImageStyle} resizeMode="cover" />
        <View style={styles.imageOverlay} />
        <View style={styles.imageLabel}><Ionicons name="sparkles-outline" size={13} color="#ffffff" /><Text style={styles.imageLabelText}>CAMPAÑA</Text></View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{statusLabel}</Text>
          </View>
          <View style={styles.channelWrap}><Ionicons name="radio-outline" size={14} color={COLORS.accent} /><Text style={styles.channelText}>{item.channel}</Text></View>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.clientName}>{item.clientName} • {item.industry}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>PRESUPUESTO</Text>
            <Text style={styles.statValue}>${item.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>INVERTIDO</Text>
            <Text style={styles.statValue}>${item.spent.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>ALCANCE EST.</Text>
            <Text style={styles.statValue}>{item.targetReach}</Text>
          </View>
        </View>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Ver campaña</Text>
          <Ionicons name="arrow-forward" size={16} color="#ffffff" />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, marginBottom: SPACING.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.cardBorder, shadowColor: '#172b3a', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  cardPressed: { opacity: 0.94, transform: [{ scale: 0.99 }] },
  imageWrap: { height: 170, position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#172b3a28' },
  imageLabel: { position: 'absolute', left: SPACING.md, bottom: SPACING.md, flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#172b3acc', paddingHorizontal: SPACING.sm, paddingVertical: 5, borderRadius: RADIUS.sm },
  imageLabelText: { color: '#ffffff', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  cardBody: { padding: SPACING.lg, gap: SPACING.sm },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: SPACING.sm + 2, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  channelWrap: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  channelText: { fontSize: 12, color: COLORS.accent, fontWeight: '700' },
  cardTitle: { fontSize: 19, fontWeight: '800', color: COLORS.textPrimary, lineHeight: 24 },
  clientName: { fontSize: 13, color: COLORS.primaryDark, fontWeight: '700' },
  cardSubtitle: { ...TYPOGRAPHY.body, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.inputBg, borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.xs, borderWidth: 1, borderColor: COLORS.border },
  statColumn: { alignItems: 'flex-start' },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700', letterSpacing: 0.5 },
  statValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '700', marginTop: 2 },
  actionButton: { backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, paddingVertical: SPACING.md - 2, paddingHorizontal: SPACING.md, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.xs },
  actionButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '800' },
});
