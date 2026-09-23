import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
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

  // Filtrado compuesto (Buscador + Pills de estado)
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Métricas Consolidadas
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const avgRoas = campaigns.length
    ? campaigns.reduce((acc, c) => acc + c.metrics.roas, 0) / campaigns.length
    : 0;
  const totalConversions = campaigns.reduce((acc, c) => acc + c.metrics.conversions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.metrics.clicks, 0);

  const activeCount = campaigns.filter((c) => c.status === 'active').length;
  const pausedCount = campaigns.filter((c) => c.status === 'paused').length;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredCampaigns}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={darkTheme.primary}
          />
        }
        ListHeaderComponent={
          <View>
            {/* 1. Hero Banner de Bienvenida */}
            <View style={styles.heroBanner}>
              <View style={styles.heroTextCol}>
                <Text style={styles.heroTitle}>👋 ¡Hola, Marketing Team!</Text>
                <Text style={styles.heroSubtitle}>
                  Monitoreo en tiempo real de Meta, Google, TikTok y LinkedIn Ads
                </Text>
              </View>
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>🟢 EN VIVO</Text>
              </View>
            </View>

            {/* 2. Grid de 4 KPIs Principales */}
            <View style={styles.kpiGrid}>
              <View style={styles.kpiCard}>
                <Text style={styles.kpiEmoji}>💳</Text>
                <Text style={styles.kpiSub}>Inversión Total</Text>
                <AnimatedCounter value={totalSpent} prefix="$" decimals={0} style={styles.kpiMain} />
                <Text style={styles.kpiFoot}>de ${totalBudget.toLocaleString()} USD</Text>
              </View>

              <View style={[styles.kpiCard, styles.kpiCardRoas]}>
                <Text style={styles.kpiEmoji}>📈</Text>
                <Text style={styles.kpiSub}>ROAS Medio</Text>
                <AnimatedCounter
                  value={avgRoas}
                  suffix="x"
                  decimals={2}
                  style={[styles.kpiMain, { color: darkTheme.success }]}
                />
                <Text style={styles.kpiFoot}>Retorno de pauta</Text>
              </View>

              <View style={styles.kpiCard}>
                <Text style={styles.kpiEmoji}>🎯</Text>
                <Text style={styles.kpiSub}>Conversiones</Text>
                <AnimatedCounter value={totalConversions} decimals={0} style={styles.kpiMain} />
                <Text style={styles.kpiFoot}>Leads & Ventas</Text>
              </View>

              <View style={styles.kpiCard}>
                <Text style={styles.kpiEmoji}>⚡</Text>
                <Text style={styles.kpiSub}>Clics Totales</Text>
                <AnimatedCounter value={totalClicks} decimals={0} style={styles.kpiMain} />
                <Text style={styles.kpiFoot}>Tráfico generado</Text>
              </View>
            </View>

            {/* 3. Buscador */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar por nombre de campaña o cliente..."
                  placeholderTextColor={darkTheme.textMuted}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* 4. Pills de Filtro Rápido */}
            <View style={styles.filterRow}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'all' && styles.filterPillActive]}
                  onPress={() => setStatusFilter('all')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'all' && styles.filterPillTextActive]}>
                    Todas ({campaigns.length})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'active' && styles.filterPillActive]}
                  onPress={() => setStatusFilter('active')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'active' && styles.filterPillTextActive]}>
                    🟢 Activas ({activeCount})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.filterPill, statusFilter === 'paused' && styles.filterPillActive]}
                  onPress={() => setStatusFilter('paused')}
                >
                  <Text style={[styles.filterPillText, statusFilter === 'paused' && styles.filterPillTextActive]}>
                    ⏸️ Pausadas ({pausedCount})
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            {/* 5. Header de Sección */}
            <View style={styles.listHeaderRow}>
              <Text style={styles.sectionTitle}>🚀 Campañas ({filteredCampaigns.length})</Text>
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() => navigation.navigate('CreateCampaign')}
              >
                <Text style={styles.createBtnText}>+ Nueva Campaña</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <CampaignCard
              campaign={item}
              onPress={() => navigation.navigate('CampaignDetail', { campaign: item })}
              onToggleStatus={handleToggleStatus}
            />
          </View>
        )}
        ListEmptyComponent={
          loading ? (
            <View style={{ padding: 16 }}>
              <SkeletonLoader width="100%" height={180} borderRadius={16} />
            </View>
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyEmoji}>📭</Text>
              <Text style={styles.emptyText}>No se encontraron campañas</Text>
              <Text style={styles.emptySub}>Intenta cambiar los filtros de búsqueda</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  heroBanner: {
    backgroundColor: darkTheme.primary,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: darkTheme.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  heroTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  heroSubtitle: {
    color: '#E0E7FF',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  liveBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  liveBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 14,
    gap: 8,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: darkTheme.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  kpiCardRoas: {
    borderColor: '#A5F3FC',
    backgroundColor: '#F0FDFA',
  },
  kpiEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  kpiSub: {
    color: darkTheme.textMuted,
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  kpiMain: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
    color: darkTheme.textPrimary,
  },
  kpiFoot: {
    color: darkTheme.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: darkTheme.surface,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: darkTheme.textPrimary,
  },
  clearIcon: {
    fontSize: 14,
    color: darkTheme.textMuted,
    paddingHorizontal: 4,
  },
  filterRow: {
    marginTop: 12,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: darkTheme.surface,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  filterPillActive: {
    backgroundColor: darkTheme.primary,
    borderColor: darkTheme.primary,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: darkTheme.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
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
  },
  createBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
  },
  emptyBox: {
    alignItems: 'center',
    marginTop: 40,
    padding: 24,
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '700',
    color: darkTheme.textPrimary,
  },
  emptySub: {
    fontSize: 13,
    color: darkTheme.textSecondary,
    marginTop: 2,
  },
});