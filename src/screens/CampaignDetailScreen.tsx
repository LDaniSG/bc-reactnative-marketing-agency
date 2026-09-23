import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Campaign } from '../types/marketing.types';
import { ChannelBarChart } from '../components/metrics/ChannelBarChart';
import { darkTheme } from '../theme/colors';

export const CampaignDetailScreen = ({ route }: { route: any }) => {
  const { campaign }: { campaign: Campaign } = route.params;
  const progress = Math.min((campaign.spent / (campaign.budget || 1)) * 100, 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Banner */}
      <View style={styles.bannerWrapper}>
        <Image source={{ uri: campaign.bannerUrl }} style={styles.heroBanner} />
        <View style={styles.statusChip}>
          <Text style={styles.statusChipText}>
            {campaign.status === 'active' ? '● ACTIVE' : campaign.status.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Header info */}
      <Text style={styles.client}>👤 {campaign.clientName}</Text>
      <Text style={styles.title}>{campaign.title}</Text>
      <Text style={styles.objectiveBadge}>🎯 Objetivo: {campaign.objective}</Text>

      {/* Budget progress */}
      <View style={styles.budgetCard}>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>💰 Presupuesto consumido</Text>
          <Text style={styles.budgetValue}>
            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${progress}%`,
                backgroundColor: progress > 85 ? darkTheme.accent : darkTheme.primary,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{progress.toFixed(0)}% utilizado</Text>
      </View>

      {/* Metrics grid */}
      <Text style={styles.sectionTitle}>📊 Métricas clave</Text>
      <View style={styles.metricGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.boxEmoji}>👁️</Text>
          <Text style={styles.boxLabel}>Impresiones</Text>
          <Text style={styles.boxValue}>{campaign.metrics.impressions.toLocaleString()}</Text>
        </View>

        <View style={styles.metricBox}>
          <Text style={styles.boxEmoji}>🖱️</Text>
          <Text style={styles.boxLabel}>Clics</Text>
          <Text style={styles.boxValue}>{campaign.metrics.clicks.toLocaleString()}</Text>
        </View>

        <View style={[styles.metricBox, styles.metricBoxAccent]}>
          <Text style={styles.boxEmoji}>💵</Text>
          <Text style={styles.boxLabel}>CPC Medio</Text>
          <Text style={[styles.boxValue, { color: darkTheme.secondary }]}>
            ${campaign.metrics.cpc.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.metricBox, styles.metricBoxSuccess]}>
          <Text style={styles.boxEmoji}>📈</Text>
          <Text style={styles.boxLabel}>ROAS</Text>
          <Text style={[styles.boxValue, { color: darkTheme.success }]}>
            {campaign.metrics.roas}x
          </Text>
        </View>
      </View>

      {/* Extra metrics row */}
      <View style={styles.extraRow}>
        <View style={styles.extraItem}>
          <Text style={styles.extraLabel}>CTR</Text>
          <Text style={styles.extraValue}>{campaign.metrics.ctr}%</Text>
        </View>
        <View style={styles.extraDivider} />
        <View style={styles.extraItem}>
          <Text style={styles.extraLabel}>Conversiones</Text>
          <Text style={styles.extraValue}>{campaign.metrics.conversions.toLocaleString()}</Text>
        </View>
        <View style={styles.extraDivider} />
        <View style={styles.extraItem}>
          <Text style={styles.extraLabel}>Periodo</Text>
          <Text style={styles.extraValue}>
            {campaign.startDate.slice(5)} → {campaign.endDate.slice(5)}
          </Text>
        </View>
      </View>

      {/* Channels chart */}
      <Text style={styles.sectionTitle}>📡 Canales de pauta</Text>
      <ChannelBarChart channels={campaign.channels} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  bannerWrapper: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  heroBanner: {
    width: '100%',
    height: 180,
  },
  statusChip: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusChipText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  client: {
    color: darkTheme.secondary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    color: darkTheme.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 6,
  },
  objectiveBadge: {
    color: darkTheme.textSecondary,
    fontSize: 14,
    marginBottom: 16,
  },
  budgetCard: {
    backgroundColor: darkTheme.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    marginBottom: 20,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetLabel: {
    color: darkTheme.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  budgetValue: {
    color: darkTheme.textPrimary,
    fontSize: 13,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#E0E7FF',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    marginTop: 6,
    fontSize: 12,
    color: darkTheme.textMuted,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginBottom: 12,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricBox: {
    width: '47%',
    backgroundColor: darkTheme.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  metricBoxAccent: {
    borderColor: '#A5F3FC',
    backgroundColor: '#F0FDFA',
  },
  metricBoxSuccess: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
  },
  boxEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  boxLabel: {
    color: darkTheme.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  boxValue: {
    color: darkTheme.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  extraRow: {
    flexDirection: 'row',
    backgroundColor: darkTheme.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    paddingVertical: 14,
    marginBottom: 24,
  },
  extraItem: {
    flex: 1,
    alignItems: 'center',
  },
  extraLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: darkTheme.textMuted,
    textTransform: 'uppercase',
  },
  extraValue: {
    fontSize: 14,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginTop: 4,
  },
  extraDivider: {
    width: 1,
    backgroundColor: darkTheme.surfaceBorder,
  },
});