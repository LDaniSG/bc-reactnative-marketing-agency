import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
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
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={TYPOGRAPHY.title}>Marketing Channels</Text>
          <Text style={TYPOGRAPHY.subtitle}>Active acquisition networks and campaign distribution</Text>
        </View>

        {MARKETING_CHANNELS.map((channel) => (
          <View key={channel.id} style={styles.channelCard}>
            <View>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.channelSubtitle}>{channel.activeCampaigns} Active Client Campaigns</Text>
            </View>
            <View style={styles.shareBadge}>
              <Text style={styles.shareText}>{channel.share}</Text>
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
  content: { padding: SPACING.lg, gap: SPACING.md },
  header: { marginBottom: SPACING.md },
  channelCard: { backgroundColor: COLORS.card, padding: SPACING.lg, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  channelName: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  channelSubtitle: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  shareBadge: { backgroundColor: COLORS.primary + '20', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.primary },
  shareText: { color: COLORS.primary, fontWeight: '800', fontSize: 14 },
});
