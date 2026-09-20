import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { CampaignDetailScreenProps } from '../navigation/types';
import { MOCK_ITEMS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

export function DetailScreen({ route, navigation }: CampaignDetailScreenProps): React.JSX.Element {
  const { id } = route.params;
  const campaign = MOCK_ITEMS.find((item) => item.id === id) || MOCK_ITEMS[0];
  const spentPercentage = Math.round((campaign.spent / campaign.budget) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image source={{ uri: campaign.imageUri }} style={styles.image} resizeMode="cover" />
        <View style={styles.headerBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.channelText}>{campaign.channel}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{campaign.status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.client}>{campaign.clientName} • {campaign.industry}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Summary</Text>
          <Text style={styles.description}>{campaign.subtitle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget & Expenditure</Text>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Spent ${campaign.spent.toLocaleString()} of ${campaign.budget.toLocaleString()}</Text>
            <Text style={styles.progressValue}>{spentPercentage}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${Math.min(spentPercentage, 100)}%` }]} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>TARGET REACH</Text>
              <Text style={styles.statValue}>{campaign.targetReach}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>AVG. CTR</Text>
              <Text style={styles.statValue}>3.42%</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>COST PER CLICK</Text>
              <Text style={styles.statValue}>$0.84</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>ESTIMATED ROI</Text>
              <Text style={styles.statValue}>320%</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Campaigns</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  image: { width: '100%', height: 200, borderRadius: RADIUS.lg },
  headerBox: { gap: SPACING.xs },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  channelText: { fontSize: 13, color: COLORS.accent, fontWeight: '700' },
  badge: { backgroundColor: COLORS.activeBadge, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  badgeText: { fontSize: 11, color: COLORS.success, fontWeight: '800' },
  title: { ...TYPOGRAPHY.title, fontSize: 24 },
  client: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
  section: { backgroundColor: COLORS.card, padding: SPACING.lg, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  description: { ...TYPOGRAPHY.body, lineHeight: 22 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xs },
  progressLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  progressValue: { fontSize: 12, color: COLORS.accent, fontWeight: '700' },
  progressBarBg: { height: 10, backgroundColor: COLORS.background, borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  statBox: { width: '48%', backgroundColor: COLORS.background, padding: SPACING.md, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.border },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  statValue: { fontSize: 16, color: COLORS.textPrimary, fontWeight: '800', marginTop: 4 },
  backButton: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center' },
  backButtonText: { color: COLORS.textPrimary, fontWeight: '700' },
});
