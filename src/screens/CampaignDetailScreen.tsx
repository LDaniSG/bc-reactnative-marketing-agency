import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Campaign } from '../types/marketing.types';
import { ChannelBarChart } from '../components/metrics/ChannelBarChart';
import { darkTheme } from '../theme/colors';

export const CampaignDetailScreen = ({ route }: { route: any }) => {
  const { campaign }: { campaign: Campaign } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Image source={{ uri: campaign.bannerUrl }} style={styles.heroBanner} />

      <Text style={styles.client}>{campaign.clientName}</Text>
      <Text style={styles.title}>{campaign.title}</Text>
      <Text style={styles.objectiveBadge}>🎯 Objetivo: {campaign.objective}</Text>

      <View style={styles.metricGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.boxLabel}>Impresiones</Text>
          <Text style={styles.boxValue}>{campaign.metrics.impressions.toLocaleString()}</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.boxLabel}>Clics</Text>
          <Text style={styles.boxValue}>{campaign.metrics.clicks.toLocaleString()}</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.boxLabel}>CPC Medio</Text>
          <Text style={styles.boxValue}>${campaign.metrics.cpc.toFixed(2)} USD</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.boxLabel}>ROAS</Text>
          <Text style={[styles.boxValue, { color: darkTheme.success }]}>{campaign.metrics.roas}x</Text>
        </View>
      </View>

      <ChannelBarChart channels={campaign.channels} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  heroBanner: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 16,
  },
  client: {
    color: darkTheme.secondary,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 8,
  },
  objectiveBadge: {
    color: darkTheme.textSecondary,
    fontSize: 14,
    marginBottom: 20,
  },
  metricGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metricBox: {
    width: '47%',
    backgroundColor: darkTheme.surface,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
  },
  boxLabel: {
    color: darkTheme.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  boxValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
});