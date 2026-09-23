import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Channel } from '../../types/marketing.types';
import { darkTheme } from '../../theme/colors';

interface ChannelChartProps {
  channels: Channel[];
}

export const ChannelBarChart: React.FC<ChannelChartProps> = ({ channels }) => {
  const getChannelColor = (platform: string) => {
    switch (platform) {
      case 'Meta Ads':
        return '#1877F2';
      case 'Google Ads':
        return '#EA4335';
      case 'TikTok Ads':
        return '#FE2C55';
      case 'LinkedIn Ads':
        return '#0A66C2';
      default:
        return darkTheme.primary;
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Distribución por Canales de Pauta</Text>
      {channels.map((ch) => {
        const barColor = getChannelColor(ch.platform);
        return (
          <View key={ch.id} style={styles.itemContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.platformName}>{ch.platform}</Text>
              <Text style={styles.shareText}>{ch.sharePercentage}% (${ch.spent.toLocaleString()} USD)</Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${ch.sharePercentage}%`, backgroundColor: barColor },
                ]}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: darkTheme.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
    marginBottom: 20,
  },
  heading: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  platformName: {
    color: darkTheme.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  shareText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});