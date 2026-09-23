import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useMarketing } from '../context/MarketingContext';
import { ChannelBarChart } from '../components/metrics/ChannelBarChart';
import { darkTheme } from '../theme/colors';

export const ChannelsScreen = () => {
  const { campaigns } = useMarketing();
  const allChannels = campaigns.flatMap((c) => c.channels);

  const avgPerformance = allChannels.length
    ? Math.round(allChannels.reduce((acc, ch) => acc + ch.performanceScore, 0) / allChannels.length)
    : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>📡 Canales de Pauta</Text>
      <Text style={styles.subtitle}>
        Distribución de presupuesto y rendimiento por plataforma publicitaria
      </Text>

      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiEmoji}>🥇</Text>
          <Text style={styles.kpiLabel}>Canal Líder</Text>
          <Text style={styles.kpiVal}>Meta Ads</Text>
          <Text style={styles.kpiSub}>Mayor volumen</Text>
        </View>

        <View style={[styles.kpiCard, styles.kpiCardAccent]}>
          <Text style={styles.kpiEmoji}>⭐</Text>
          <Text style={styles.kpiLabel}>Health Score</Text>
          <Text style={[styles.kpiVal, { color: darkTheme.success }]}>{avgPerformance}/100</Text>
          <Text style={styles.kpiSub}>Promedio ponderado</Text>
        </View>
      </View>

      <Text style={styles.sectionHeader}>📊 Participación de Presupuesto</Text>
      {allChannels.length > 0 ? (
        <ChannelBarChart channels={allChannels} />
      ) : (
        <Text style={styles.empty}>No hay datos de canales disponibles</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkTheme.background },
  title: { fontSize: 22, fontWeight: '800', color: darkTheme.textPrimary },
  subtitle: { fontSize: 13, color: darkTheme.textSecondary, marginBottom: 16, marginTop: 2 },
  kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  kpiCard: { flex: 1, backgroundColor: darkTheme.surface, padding: 14, borderRadius: 16, borderWidth: 1.5, borderColor: darkTheme.surfaceBorder },
  kpiCardAccent: { borderColor: '#A7F3D0', backgroundColor: '#ECFDF5' },
  kpiEmoji: { fontSize: 18, marginBottom: 4 },
  kpiLabel: { fontSize: 10, fontWeight: '700', color: darkTheme.textMuted, textTransform: 'uppercase' },
  kpiVal: { fontSize: 20, fontWeight: '800', color: darkTheme.textPrimary, marginTop: 2 },
  kpiSub: { fontSize: 11, color: darkTheme.textSecondary, marginTop: 2 },
  sectionHeader: { fontSize: 16, fontWeight: '800', color: darkTheme.textPrimary, marginBottom: 10 },
  empty: { color: darkTheme.textMuted, textAlign: 'center', marginTop: 40 },
});