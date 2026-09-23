import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useMarketing } from '../context/MarketingContext';
import { ChannelBarChart } from '../components/metrics/ChannelBarChart';
import { darkTheme } from '../theme/colors';

export const ChannelsScreen = () => {
  const { campaigns } = useMarketing();
  const allChannels = campaigns.flatMap((c) => c.channels);

  const totalChannelSpend = allChannels.reduce((acc, ch) => acc + ch.spent, 0);
  const avgPerformance = allChannels.length
    ? Math.round(allChannels.reduce((acc, ch) => acc + ch.performanceScore, 0) / allChannels.length)
    : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Text style={styles.title}>📡 Canales de Pauta</Text>
      <Text style={styles.subtitle}>
        Distribución de presupuesto y rendimiento por plataforma publicitaria
      </Text>

      {/* Resumen KPIs */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiEmoji}>🥇</Text>
          <Text style={styles.kpiLabel}>Canal Líder</Text>
          <Text style={styles.kpiVal}>Meta Ads</Text>
          <Text style={styles.kpiSub}>Mayor volumen de conversiones</Text>
        </View>

        <View style={[styles.kpiCard, styles.kpiCardAccent]}>
          <Text style={styles.kpiEmoji}>⭐</Text>
          <Text style={styles.kpiLabel}>Health Score</Text>
          <Text style={[styles.kpiVal, { color: darkTheme.success }]}>{avgPerformance}/100</Text>
          <Text style={styles.kpiSub}>Promedio ponderado</Text>
        </View>
      </View>

      {/* Gráfico principal */}
      <Text style={styles.sectionHeader}>📊 Participación de Presupuesto</Text>
      {allChannels.length > 0 ? (
        <ChannelBarChart channels={allChannels} />
      ) : (
        <Text style={styles.empty}>No hay datos de canales disponibles</Text>
      )}

      {/* Historial de optimizaciones (Línea de tiempo informativa) */}
      <Text style={[styles.sectionHeader, { marginTop: 16 }]}>⚡ Optimizaciones Recientes de Pauta</Text>
      <View style={styles.timelineBox}>
        <View style={styles.timelineItem}>
          <Text style={styles.timeTag}>Hoy, 10:30 AM</Text>
          <Text style={styles.timeTitle}>🔹 Meta Ads - Incremento +15% Presupuesto</Text>
          <Text style={styles.timeDesc}>Escalado de campaña Cyber Monday por ROAS superior a 5.0x.</Text>
        </View>

        <View style={styles.timelineItem}>
          <Text style={styles.timeTag}>Ayer, 4:15 PM</Text>
          <Text style={styles.timeTitle}>🔹 Google Ads - Ajuste de Pujas B2B</Text>
          <Text style={styles.timeDesc}>Optimización de palabras clave negativas en campaña SaaS.</Text>
        </View>

        <View style={[styles.timelineItem, { borderLeftWidth: 0 }]}>
          <Text style={styles.timeTag}>18 Nov, 2:00 PM</Text>
          <Text style={styles.timeTitle}>🔹 TikTok Ads - Apertura de Audiencias Gen Z</Text>
          <Text style={styles.timeDesc}>Nuevos creativos en video para Fintech Pay App.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: darkTheme.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: darkTheme.textSecondary,
    marginBottom: 16,
    marginTop: 2,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: darkTheme.surface,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  kpiCardAccent: {
    borderColor: '#A7F3D0',
    backgroundColor: '#ECFDF5',
  },
  kpiEmoji: {
    fontSize: 18,
    marginBottom: 4,
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: darkTheme.textMuted,
    textTransform: 'uppercase',
  },
  kpiVal: {
    fontSize: 20,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginTop: 2,
  },
  kpiSub: {
    fontSize: 11,
    color: darkTheme.textSecondary,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginBottom: 10,
  },
  empty: {
    color: darkTheme.textMuted,
    textAlign: 'center',
    marginTop: 40,
  },
  timelineBox: {
    backgroundColor: darkTheme.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  timelineItem: {
    borderLeftWidth: 2,
    borderLeftColor: darkTheme.primary,
    paddingLeft: 12,
    marginBottom: 16,
  },
  timeTag: {
    fontSize: 11,
    fontWeight: '700',
    color: darkTheme.primary,
  },
  timeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginTop: 2,
  },
  timeDesc: {
    fontSize: 12,
    color: darkTheme.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
});