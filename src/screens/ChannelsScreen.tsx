import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

const MARKETING_CHANNELS = [
  { id: '1', name: 'Meta Ads', activeCampaigns: 4, share: '35%' },
  { id: '2', name: 'Google Search', activeCampaigns: 3, share: '28%' },
  { id: '3', name: 'LinkedIn Ads', activeCampaigns: 2, share: '22%' },
  { id: '4', name: 'TikTok Ads', activeCampaigns: 2, share: '15%' },
];

export function ChannelsScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DISTRIBUCIÓN DE RESULTADOS</Text>
          <Text style={TYPOGRAPHY.title}>Canales de marketing</Text>
          <Text style={styles.headerSubtitle}>Consulta cómo se distribuyen tus campañas.</Text>
        </View>

        {MARKETING_CHANNELS.map((channel) => (
          <View key={channel.id} style={styles.channelCard}>
            <View style={styles.channelIcon}><Ionicons name="analytics-outline" size={20} color={COLORS.accent} /></View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.channelSubtitle}>{channel.activeCampaigns} campañas activas</Text>
              <View style={styles.progressTrack}><View style={[styles.progressFill, { width: channel.share as `${number}%` }]} /></View>
            </View>
            <View style={styles.shareBlock}>
              <Text style={styles.shareText}>{channel.share}</Text>
              <Text style={styles.shareLabel}>PARTICIPACIÓN</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingTop: SPACING.xl },
  header: { marginBottom: SPACING.lg },
  eyebrow: { color: COLORS.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1.2, marginBottom: SPACING.sm },
  headerSubtitle: { ...TYPOGRAPHY.subtitle, marginTop: SPACING.xs, fontSize: 14 },
  channelCard: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', alignItems: 'center', gap: SPACING.md, shadowColor: '#172b3a', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 1 },
  channelIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.activeBadge, alignItems: 'center', justifyContent: 'center' },
  channelInfo: { flex: 1 },
  channelName: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  channelSubtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 3 },
  progressTrack: { height: 5, backgroundColor: COLORS.inputBg, borderRadius: RADIUS.full, overflow: 'hidden', marginTop: SPACING.sm },
  progressFill: { height: '100%', backgroundColor: COLORS.accent, borderRadius: RADIUS.full },
  shareBlock: { alignItems: 'flex-end', minWidth: 42 },
  shareText: { color: COLORS.primaryDark, fontWeight: '900', fontSize: 16 },
  shareLabel: { color: COLORS.textMuted, fontWeight: '800', fontSize: 8, letterSpacing: 0.6, marginTop: 2 },
});
