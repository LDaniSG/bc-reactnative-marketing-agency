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
  const activeCount = campaigns.filter((c) => c.status === 'active').length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBlock}>
        <Text style={styles.greeting}>📊 Marketing Agency Hub</Text>
        <Text style={styles.subtitle}>
          {activeCount} campañas activas · Rendimiento en tiempo real
        </Text>
      </View>

      {/* KPIs */}
      <View style={styles.kpiContainer}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiEmoji}>💰</Text>
          <Text style={styles.kpiSub}>Inversión Total</Text>
          <AnimatedCounter
            value={totalSpent}
            prefix="$"
            decimals={0}
            style={styles.kpiMain}
          />
          <Text style={styles.kpiFoot}>de ${totalBudget.toLocaleString()} USD</Text>
        </View>

        <View style={[styles.kpiCard, styles.kpiCardAccent]}>
          <Text style={styles.kpiEmoji}>📈</Text>
          <Text style={styles.kpiSub}>ROAS Medio</Text>
          <AnimatedCounter
            value={avgRoas}
            suffix="x"
            decimals={2}
            style={[styles.kpiMain, { color: darkTheme.success }]}
          />
          <Text style={styles.kpiFoot}>Retorno publicitario</Text>
        </View>
      </View>

      {/* Lista header */}
      <View style={styles.listHeaderRow}>
        <Text style={styles.sectionTitle}>🚀 Campañas ({campaigns.length})</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate('CreateCampaign')}
        >
          <Text style={styles.createBtnText}>+ Nueva</Text>
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
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={darkTheme.primary}
              colors={[darkTheme.primary]}
            />
          }
          renderItem={({ item }) => (
            <CampaignCard
              campaign={item}
              onPress={() => navigation.navigate('CampaignDetail', { campaign: item })}
              onToggleStatus={handleToggleStatus}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyText}>No hay campañas aún</Text>
              <Text style={styles.emptySub}>Crea la primera para ver métricas</Text>
            </View>
          }
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
  headerBlock: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: darkTheme.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: darkTheme.textSecondary,
    marginTop: 4,
  },
  kpiContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: darkTheme.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  kpiCardAccent: {
    borderColor: '#A5F3FC',
    backgroundColor: '#F0FDFA',
  },
  kpiEmoji: {
    fontSize: 18,
    marginBottom: 6,
  },
  kpiSub: {
    color: darkTheme.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  kpiMain: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
    color: darkTheme.textPrimary,
  },
  kpiFoot: {
    color: darkTheme.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 4,
  },
  sectionTitle: {
    color: darkTheme.textPrimary,
    fontSize: 17,
    fontWeight: '800',
  },
  createBtn: {
    backgroundColor: darkTheme.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: darkTheme.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 48,
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: darkTheme.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: darkTheme.textSecondary,
    marginTop: 4,
  },
});