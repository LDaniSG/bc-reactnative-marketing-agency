import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
} from 'react-native';
import { Campaign } from '../../types/marketing.types';
import { darkTheme } from '../../theme/colors';
import { useHaptics } from '../../hooks/useHaptics';

interface CardProps {
  campaign: Campaign;
  onPress: () => void;
  onToggleStatus: (id: string) => void;
}

export const CampaignCard: React.FC<CardProps> = ({ campaign, onPress, onToggleStatus }) => {
  const scale = useRef(new Animated.Value(1)).current;
  const { triggerImpact } = useHaptics();

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleShareReport = async () => {
    triggerImpact();
    await Share.share({
      title: `Reporte: ${campaign.title}`,
      message: `📊 Informe de Rendimiento - ${campaign.title}\nCliente: ${campaign.clientName}\nROAS: ${campaign.metrics.roas}x\nConversiones: ${campaign.metrics.conversions.toLocaleString()}\nInversión: $${campaign.spent.toLocaleString()} / $${campaign.budget.toLocaleString()} USD`,
    });
  };

  const progress = Math.min((campaign.spent / (campaign.budget || 1)) * 100, 100);
  const isActive = campaign.status === 'active';

  return (
    <Animated.View style={[{ transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.card}
      >
        <Image source={{ uri: campaign.bannerUrl }} style={styles.banner} />

        <View style={styles.badgeRow}>
          <TouchableOpacity
            onPress={() => onToggleStatus(campaign.id)}
            style={[styles.statusBadge, isActive ? styles.badgeActive : styles.badgePaused]}
          >
            <Text style={styles.statusText}>
              {isActive ? '● ACTIVE' : '⏸ PAUSED'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareBtn} onPress={handleShareReport}>
            <Text style={styles.shareIcon}>📤 Compartir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.client}>👤 {campaign.clientName}</Text>
          <Text style={styles.title}>{campaign.title}</Text>

          <View style={styles.budgetRow}>
            <Text style={styles.budgetLabel}>Presupuesto consumido</Text>
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

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statSub}>ROAS</Text>
              <Text style={[styles.statValue, { color: darkTheme.success }]}>
                {campaign.metrics.roas}x
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statSub}>CTR</Text>
              <Text style={[styles.statValue, { color: darkTheme.secondary }]}>
                {campaign.metrics.ctr}%
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statSub}>Conversiones</Text>
              <Text style={styles.statValue}>
                {campaign.metrics.conversions.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: darkTheme.cardBg,
    borderRadius: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    overflow: 'hidden',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  banner: {
    width: '100%',
    height: 140,
  },
  badgeRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
  },
  badgePaused: {
    backgroundColor: 'rgba(245, 158, 11, 0.95)',
  },
  statusText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  shareBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
  },
  shareIcon: {
    color: darkTheme.textPrimary,
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    padding: 16,
  },
  client: {
    color: darkTheme.secondary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    color: darkTheme.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 12,
  },
  budgetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  budgetLabel: {
    color: darkTheme.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  budgetValue: {
    color: darkTheme.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#E0E7FF',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E7FF',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statSub: {
    color: darkTheme.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statValue: {
    color: darkTheme.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    marginTop: 3,
  },
});