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
      case 'Email Marketing':
        return '#8B5CF6';
      default:
        return darkTheme.primary;
    }
  };

  const getChannelEmoji = (platform: string) => {
    switch (platform) {
      case 'Meta Ads':
        return '📘';
      case 'Google Ads':
        return '🔍';
      case 'TikTok Ads':
        return '🎵';
      case 'LinkedIn Ads':
        return '💼';
      case 'Email Marketing':
        return '📧';
      default:
        return '📡';
    }
  };

  return (
    <View style={styles.card}>
      {(channels || []).map((ch) => {
        const barColor = getChannelColor(ch.platform);
        return (
          <View key={ch.id} style={styles.itemContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.platformName}>
                {getChannelEmoji(ch.platform)} {ch.platform}
              </Text>
              <Text style={styles.shareText}>
                {ch.sharePercentage}% · ${ch.spent.toLocaleString()}
              </Text>
            </View>
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${ch.sharePercentage}%`, backgroundColor: barColor },
                ]}
              />
            </View>
            <Text style={styles.scoreText}>Score: {ch.performanceScore}/100</Text>
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
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    marginBottom: 12,
  },
  itemContainer: { marginBottom: 16 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  platformName: { color: darkTheme.textPrimary, fontSize: 13, fontWeight: '700' },
  shareText: { color: darkTheme.textSecondary, fontSize: 12, fontWeight: '700' },
  track: { height: 10, backgroundColor: '#E0E7FF', borderRadius: 6, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 6 },
  scoreText: { marginTop: 4, fontSize: 11, color: darkTheme.textMuted, fontWeight: '600' },
});