import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Campaign } from '../types/marketing.types';
import { MarketingApi } from '../api/marketingApi';
import { CampaignCard } from '../components/campaigns/CampaignCard';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { darkTheme } from '../theme/colors';
import { useHaptics } from '../hooks/useHaptics';

export const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { triggerImpact } = useHaptics();

  const loadData = useCallback(async () => {
    try {
      const data = await MarketingApi.getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    triggerImpact();
    loadData();
  };

  const handleToggleStatus = async (id: string) => {
    triggerImpact();
    const updated = await MarketingApi.toggleCampaignStatus(id);
    setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const avgRoas = campaigns.length
    ? campaigns.reduce((acc, c) => acc + c.metrics.roas, 0) / campaigns.length
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiSub}>Inversión Total</Text>
          <AnimatedCounter value={totalSpent} prefix="$" decimals={0} style={styles.kpiMain} />
          <Text style={styles.kpiFoot}>de ${totalBudget.toLocaleString()} USD</Text>
        </View>

        <View style={[styles.kpiCard, { borderColor: darkTheme.success }]}>
          <Text style={styles.kpiSub}>ROAS Medio</Text>
          <AnimatedCounter value={avgRoas} suffix="x" decimals={2} style={[styles.kpiMain, { color: darkTheme.success }]} />
          <Text style={styles.kpiFoot}>Retorno publicitario</Text>
        </View>
      </View>

      <View style={styles.listHeaderRow}>
        <Text style={styles.sectionTitle}>Campañas Activas ({campaigns.length})</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateCampaign')}>
          <Text style={styles.createBtnLink}>+ Nueva Campaña</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ padding: 16 }}>
          <SkeletonLoader width="100%" height={180} borderRadius={16} />
          <View style={{ height: 16 }} />
          <SkeletonLoader width="100%" height={180} borderRadius={16} />
        </View>
      ) : (
        <FlatList
          data={campaigns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={darkTheme.primary} />
          }
          renderItem={({ item }) => (
            <CampaignCard
              campaign={item}
              onPress={() => navigation.navigate('CampaignDetail', { campaign: item })}
              onToggleStatus={handleToggleStatus}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  kpiContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: darkTheme.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
  },
  kpiSub: {
    color: darkTheme.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  kpiMain: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  kpiFoot: {
    color: darkTheme.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
  createBtnLink: {
    color: darkTheme.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});