import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import type { ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CampaignDetailScreenProps } from '../navigation/types';
import { MOCK_ITEMS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { useSavedCampaignsStore } from '../stores/savedStore';

export function DetailScreen({ route, navigation }: CampaignDetailScreenProps): React.JSX.Element {
  const { id } = route.params;
  const campaign = MOCK_ITEMS.find((item) => item.id === id) || MOCK_ITEMS[0];
  const spentPercentage = Math.round((campaign.spent / campaign.budget) * 100);
  const statusLabel = { active: 'ACTIVA', paused: 'PAUSADA', completed: 'COMPLETADA', draft: 'BORRADOR' }[campaign.status];
  const isSaved = useSavedCampaignsStore((state) => state.isSaved(campaign.id));
  const toggleSaveCampaign = useSavedCampaignsStore((state) => state.toggleSaveCampaign);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image source={{ uri: campaign.imageUri }} style={styles.image as ImageStyle} resizeMode="cover" />
        <View style={styles.headerBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.channelText}>{campaign.channel}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{statusLabel}</Text>
            </View>
          </View>
          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.client}>{campaign.clientName}  /  {campaign.industry}</Text>
          <Pressable style={[styles.saveButton, isSaved && styles.saveButtonActive]} onPress={() => toggleSaveCampaign(campaign)}>
            <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={17} color={isSaved ? '#ffffff' : COLORS.primaryDark} />
            <Text style={[styles.saveButtonText, isSaved && styles.saveButtonTextActive]}>{isSaved ? 'Campaña guardada' : 'Guardar campaña'}</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de campaña</Text>
          <Text style={styles.description}>{campaign.subtitle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Presupuesto e inversión</Text>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Invertido ${campaign.spent.toLocaleString()} de ${campaign.budget.toLocaleString()}</Text>
            <Text style={styles.progressValue}>{spentPercentage}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${Math.min(spentPercentage, 100)}%` }]} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indicadores principales</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>ALCANCE OBJETIVO</Text>
              <Text style={styles.statValue}>{campaign.targetReach}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>CTR PROMEDIO</Text>
              <Text style={styles.statValue}>{campaign.ctr || '3.42%'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>COSTO POR CLIC</Text>
              <Text style={styles.statValue}>{campaign.cpc || '$0.84'}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>ROI ESTIMADO</Text>
              <Text style={styles.statValue}>{campaign.roiPercentage ? `${campaign.roiPercentage}%` : '320%'}</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver a campañas</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  image: { width: '100%', height: 210, borderRadius: RADIUS.lg },
  headerBox: { gap: SPACING.xs },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  channelText: { fontSize: 13, color: COLORS.accent, fontWeight: '800' },
  badge: { backgroundColor: COLORS.activeBadge, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  badgeText: { fontSize: 11, color: COLORS.success, fontWeight: '800' },
  title: { ...TYPOGRAPHY.title, fontSize: 26, lineHeight: 32 },
  client: { fontSize: 14, color: COLORS.primaryDark, fontWeight: '700' },
  saveButton: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, backgroundColor: COLORS.activeBadge, borderWidth: 1, borderColor: COLORS.accent, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, marginTop: SPACING.sm },
  saveButtonActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  saveButtonText: { color: COLORS.primaryDark, fontSize: 12, fontWeight: '800' },
  saveButtonTextActive: { color: '#ffffff' },
  section: { backgroundColor: COLORS.card, padding: SPACING.lg, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm, shadowColor: '#172b3a', shadowOpacity: 0.04, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 1 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  description: { ...TYPOGRAPHY.body, lineHeight: 22 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xs },
  progressLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  progressValue: { fontSize: 12, color: COLORS.accent, fontWeight: '700' },
  progressBarBg: { height: 10, backgroundColor: COLORS.background, borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.accent },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  statBox: { width: '48%', backgroundColor: COLORS.background, padding: SPACING.md, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.border },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  statValue: { fontSize: 16, color: COLORS.textPrimary, fontWeight: '800', marginTop: 4 },
  backButton: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center' },
  backButtonText: { color: '#ffffff', fontWeight: '800' },
});
