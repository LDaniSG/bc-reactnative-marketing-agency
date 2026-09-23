import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Campaign } from '../types/marketing.types';
import { MarketingApi } from '../api/marketingApi';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { darkTheme } from '../theme/colors';

export const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
    loadData();
  };

  const handleToggle = async (id: string) => {
    const updated = await MarketingApi.toggleCampaignStatus(id);
    setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Panel de Campañas</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('CreateCampaign')}
        >
          <Text style={styles.addBtnText}>+ Crear</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ padding: 16 }}>
          <SkeletonLoader width="100%" height={160} borderRadius={16} />
          <View style={{ height: 16 }} />
          <SkeletonLoader width="100%" height={160} borderRadius={16} />
        </View>
      ) : (
        <FlatList
          data={campaigns}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={darkTheme.primary}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.bannerUrl }} style={styles.banner} />
              <View style={styles.cardContent}>
                <View style={styles.row}>
                  <Text style={styles.client}>{item.clientName}</Text>
                  <TouchableOpacity
                    onPress={() => handleToggle(item.id)}
                    style={[
                      styles.badge,
                      item.status === 'active' ? styles.badgeActive : styles.badgePaused,
                    ]}
                  >
                    <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.metricsPreview}>
                  Invertido: ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()} USD
                </Text>
              </View>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
  },
  addBtn: {
    backgroundColor: darkTheme.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: '700',
  },
  card: {
    backgroundColor: darkTheme.cardBg,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
  },
  banner: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  client: {
    color: darkTheme.secondary,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeActive: {
    backgroundColor: darkTheme.success,
  },
  badgePaused: {
    backgroundColor: darkTheme.warning,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 6,
  },
  metricsPreview: {
    color: darkTheme.textSecondary,
    fontSize: 13,
  },
});