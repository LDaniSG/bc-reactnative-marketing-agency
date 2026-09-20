#!/bin/bash
set -e

echo "🚀 Configurando proyecto de Agencia de Marketing Digital (Semana 01 a 05)..."

git config user.name "$(git config user.name || echo 'Student Developer')"
git config user.email "$(git config user.email || echo 'student@sena.edu.co')"

mkdir -p src/types src/data src/components src/screens src/theme src/navigation src/stores src/services src/hooks assets

# ==========================================
# WEEK 01
# ==========================================
git checkout -b week-01 2>/dev/null || git checkout week-01

cat << 'FILE_END' > app.json
{
  "expo": {
    "name": "Apex Marketing Agency",
    "slug": "bc-reactnative-marketing-agency",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "newArchEnabled": true,
    "splash": {
      "resizeMode": "contain",
      "backgroundColor": "#0f172a"
    }
  }
}
FILE_END

cat << 'FILE_END' > package.json
{
  "name": "bc-reactnative-marketing-agency",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}
FILE_END

cat << 'FILE_END' > tsconfig.json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
FILE_END

cat << 'FILE_END' > src/types/index.ts
export interface Campaign {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  channel: 'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  targetReach: string;
  imageUri: string;
  subtitle: string;
}
FILE_END

cat << 'FILE_END' > src/data/mockData.ts
import { Campaign } from '../types';

export const MOCK_ITEMS: Campaign[] = [
  {
    id: 'c-1',
    title: 'Summer E-Commerce Surge',
    clientName: 'Apex Fashion Group',
    industry: 'E-Commerce',
    channel: 'Meta Ads',
    status: 'active',
    budget: 15000,
    spent: 8400,
    targetReach: '450K Users',
    imageUri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    subtitle: 'High-intent retargeting and lookalike audience acquisition for summer collection',
  },
  {
    id: 'c-2',
    title: 'B2B SaaS Lead Generation',
    clientName: 'CloudMetrics Inc.',
    industry: 'Software & Technology',
    channel: 'LinkedIn Ads',
    status: 'active',
    budget: 25000,
    spent: 18200,
    targetReach: '120K Tech Executives',
    imageUri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Sponsored content and conversion ads targeting CTOs and VPs of Engineering',
  },
  {
    id: 'c-3',
    title: 'Health App Install Blitz',
    clientName: 'FitPulse Labs',
    industry: 'Healthcare & Fitness',
    channel: 'TikTok Ads',
    status: 'paused',
    budget: 10000,
    spent: 9800,
    targetReach: '800K Fitness Enthusiasts',
    imageUri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    subtitle: 'UGC video campaign promoting dynamic AI workout tracking subscriptions',
  },
  {
    id: 'c-4',
    title: 'Organic Search & PPC Expansion',
    clientName: 'BioHealth Nutrition',
    industry: 'Health & Wellness',
    channel: 'Google Search',
    status: 'completed',
    budget: 18000,
    spent: 18000,
    targetReach: '300K High Intent Searchers',
    imageUri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    subtitle: 'High-converting search ad keywords paired with optimized landing pages',
  },
];
FILE_END

cat << 'FILE_END' > src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Campaign } from '../types';

interface ItemCardProps {
  item: Campaign;
  onPress: (item: Campaign) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const isCompleted = item.status === 'completed';
  const isPaused = item.status === 'paused';
  const statusColor = isCompleted ? '#38bdf8' : isPaused ? '#f59e0b' : '#22c55e';

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onPress(item)}>
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.channelText}>{item.channel}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.clientName}>{item.clientName} • {item.industry}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>BUDGET</Text>
            <Text style={styles.statValue}>${item.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>SPENT</Text>
            <Text style={styles.statValue}>${item.spent.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>EST. REACH</Text>
            <Text style={styles.statValue}>{item.targetReach}</Text>
          </View>
        </View>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Campaign Analytics</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#1e293b', borderRadius: 16, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#334155' },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: 16, gap: 8 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  channelText: { fontSize: 12, color: '#94a3b8', fontWeight: '600' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#f8fafc' },
  clientName: { fontSize: 13, color: '#6366f1', fontWeight: '600' },
  cardSubtitle: { fontSize: 14, color: '#cbd5e1', lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#0f172a', borderRadius: 12, padding: 12, marginTop: 8, borderWidth: 1, borderColor: '#1e293b' },
  statColumn: { alignItems: 'flex-start' },
  statLabel: { fontSize: 10, color: '#64748b', fontWeight: '700', letterSpacing: 0.5 },
  statValue: { fontSize: 13, color: '#f1f5f9', fontWeight: '700', marginTop: 2 },
  actionButton: { backgroundColor: '#6366f1', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 6 },
  actionButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
});
FILE_END

cat << 'FILE_END' > src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  const DOMAIN_TITLE = 'Apex Media Agency';
  const DOMAIN_SUBTITLE = 'Digital Marketing & Client Campaign Intelligence';

  function handleItemPress(item: Campaign): void {
    console.log('Selected Campaign:', item.title, 'for Client:', item.clientName);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>AGENCY DASHBOARD</Text>
        </View>
        <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
        <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {MOCK_ITEMS.map((item) => (
          <ItemCard key={item.id} item={item} onPress={handleItemPress} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, backgroundColor: '#1e293b', borderBottomWidth: 1, borderBottomColor: '#334155' },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: '#6366f120', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 6, borderWidth: 1, borderColor: '#6366f140' },
  headerBadgeText: { color: '#818cf8', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#f8fafc' },
  headerSubtitle: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
  listContainer: { flex: 1 },
  listContent: { padding: 16 },
});
FILE_END

cat << 'FILE_END' > App.tsx
import React from 'react';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App(): React.JSX.Element {
  return <HomeScreen />;
}
FILE_END

cat << 'FILE_END' > README.md
# Week 01 — Digital Marketing Agency Campaign Cards App
FILE_END

git add .
git commit -m "feat: implement week-01 digital marketing agency card app"

# ==========================================
# WEEK 02
# ==========================================
git checkout -b week-02

cat << 'FILE_END' > src/theme/index.ts
export const COLORS = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  accent: '#38bdf8',
  background: '#0f172a',
  surface: '#1e293b',
  card: '#1e293b',
  cardBorder: '#334155',
  text: '#f8fafc',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  border: '#334155',
  inputBg: '#0f172a',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  activeBadge: '#22c55e20',
};

export const TYPOGRAPHY = {
  title: { fontSize: 24, fontWeight: '800' as const, color: COLORS.textPrimary },
  subtitle: { fontSize: 14, fontWeight: '500' as const, color: COLORS.textMuted },
  body: { fontSize: 14, fontWeight: '400' as const, color: COLORS.textSecondary },
  caption: { fontSize: 12, fontWeight: '600' as const, color: COLORS.textMuted },
  label: { fontSize: 12, fontWeight: '700' as const, color: COLORS.primary },
};

export const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24 };
export const RADIUS = { sm: 8, md: 12, lg: 16, full: 9999 };
FILE_END

cat << 'FILE_END' > src/data/mockData.ts
import { Campaign } from '../types';

export const MOCK_ITEMS: Campaign[] = [
  {
    id: 'c-1',
    title: 'Summer E-Commerce Surge',
    clientName: 'Apex Fashion Group',
    industry: 'E-Commerce',
    channel: 'Meta Ads',
    status: 'active',
    budget: 15000,
    spent: 8400,
    targetReach: '450K Users',
    imageUri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    subtitle: 'High-intent retargeting and lookalike audience acquisition for summer collection',
  },
  {
    id: 'c-2',
    title: 'B2B SaaS Lead Generation',
    clientName: 'CloudMetrics Inc.',
    industry: 'Software & Technology',
    channel: 'LinkedIn Ads',
    status: 'active',
    budget: 25000,
    spent: 18200,
    targetReach: '120K Tech Executives',
    imageUri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Sponsored content and conversion ads targeting CTOs and VPs of Engineering',
  },
  {
    id: 'c-3',
    title: 'Health App Install Blitz',
    clientName: 'FitPulse Labs',
    industry: 'Healthcare & Fitness',
    channel: 'TikTok Ads',
    status: 'paused',
    budget: 10000,
    spent: 9800,
    targetReach: '800K Fitness Enthusiasts',
    imageUri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    subtitle: 'UGC video campaign promoting dynamic AI workout tracking subscriptions',
  },
  {
    id: 'c-4',
    title: 'Organic Search & PPC Expansion',
    clientName: 'BioHealth Nutrition',
    industry: 'Health & Wellness',
    channel: 'Google Search',
    status: 'completed',
    budget: 18000,
    spent: 18000,
    targetReach: '300K High Intent Searchers',
    imageUri: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    subtitle: 'High-converting search ad keywords paired with optimized landing pages',
  },
  {
    id: 'c-5',
    title: 'Fintech Mobile Onboarding Flow',
    clientName: 'PayVault Global',
    industry: 'Financial Technology',
    channel: 'Meta Ads',
    status: 'active',
    budget: 32000,
    spent: 14500,
    targetReach: '600K Mobile Banking Users',
    imageUri: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Interactive video ad units highlighting instant peer-to-peer crypto transfers',
  },
  {
    id: 'c-6',
    title: 'Luxury Real Estate Showcase',
    clientName: 'Vanguard Properties',
    industry: 'Real Estate',
    channel: 'LinkedIn Ads',
    status: 'active',
    budget: 40000,
    spent: 22100,
    targetReach: '50K High Net Worth Individuals',
    imageUri: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Carousel ads highlighting premium penthouse developments with virtual tours',
  },
  {
    id: 'c-7',
    title: 'Automotive Cyber Monday Promo',
    clientName: 'Apex Motors Electric',
    industry: 'Automotive',
    channel: 'TikTok Ads',
    status: 'draft',
    budget: 12000,
    spent: 0,
    targetReach: '1M EV Enthusiasts',
    imageUri: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Short-form viral challenge driving test drive reservations for EV sedan',
  },
  {
    id: 'c-8',
    title: 'Gourmet Food Delivery Drive',
    clientName: 'SavorBite Express',
    industry: 'Food & Beverage',
    channel: 'Meta Ads',
    status: 'active',
    budget: 9000,
    spent: 4300,
    targetReach: '250K Local Foodies',
    imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Geo-fenced promos for 30-minute artisanal meal box deliveries',
  },
  {
    id: 'c-9',
    title: 'EdTech AI Academy Campaign',
    clientName: 'SkillBoost AI',
    industry: 'Education',
    channel: 'Google Search',
    status: 'active',
    budget: 21000,
    spent: 12800,
    targetReach: '500K Career Switchers',
    imageUri: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Keyword targeting for Data Science and Machine Learning bootcamps',
  },
  {
    id: 'c-10',
    title: 'Cybersecurity Enterprise Retention',
    clientName: 'FortressSec Solutions',
    industry: 'Cybersecurity',
    channel: 'Email Marketing',
    status: 'completed',
    budget: 8500,
    spent: 8500,
    targetReach: '40K Enterprise IT Clients',
    imageUri: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
    subtitle: 'Personalized nurture sequence driving zero-trust security audit upgrades',
  },
];
FILE_END

cat << 'FILE_END' > src/components/ItemCard.tsx
import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Campaign } from '../types';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

interface ItemCardProps {
  item: Campaign;
  onPress: (item: Campaign) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  const isCompleted = item.status === 'completed';
  const isPaused = item.status === 'paused';
  const isDraft = item.status === 'draft';

  const statusColor = isCompleted
    ? COLORS.accent
    : isPaused
    ? COLORS.warning
    : isDraft
    ? COLORS.textMuted
    : COLORS.success;

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onPress(item)}>
      <Image source={{ uri: item.imageUri }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardBody}>
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: statusColor + '20', borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{item.status.toUpperCase()}</Text>
          </View>
          <Text style={styles.channelText}>{item.channel}</Text>
        </View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.clientName}>{item.clientName} • {item.industry}</Text>
        <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
        <View style={styles.cardFooter}>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>BUDGET</Text>
            <Text style={styles.statValue}>${item.budget.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>SPENT</Text>
            <Text style={styles.statValue}>${item.spent.toLocaleString()}</Text>
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>EST. REACH</Text>
            <Text style={styles.statValue}>{item.targetReach}</Text>
          </View>
        </View>
        <View style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Campaign Analytics</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, marginBottom: SPACING.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.cardBorder },
  cardPressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  cardImage: { width: '100%', height: 160 },
  cardBody: { padding: SPACING.lg, gap: SPACING.xs + 2 },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: SPACING.sm + 2, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  channelText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  clientName: { fontSize: 13, color: COLORS.primary, fontWeight: '600' },
  cardSubtitle: { ...TYPOGRAPHY.body, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.background, borderRadius: RADIUS.md, padding: SPACING.md, marginTop: SPACING.xs, borderWidth: 1, borderColor: COLORS.border },
  statColumn: { alignItems: 'flex-start' },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700', letterSpacing: 0.5 },
  statValue: { fontSize: 13, color: COLORS.textPrimary, fontWeight: '700', marginTop: 2 },
  actionButton: { backgroundColor: COLORS.primary, borderRadius: RADIUS.sm, paddingVertical: SPACING.md - 2, alignItems: 'center', marginTop: SPACING.xs },
  actionButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
});
FILE_END

cat << 'FILE_END' > src/screens/HomeScreen.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ListRenderItemInfo } from 'react-native';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

export function HomeScreen(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_ITEMS;
    return MOCK_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.clientName.toLowerCase().includes(query) ||
      item.channel.toLowerCase().includes(query) ||
      item.industry.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleItemPress = useCallback((item: Campaign) => {
    console.log('Selected Campaign:', item.title, 'for Client:', item.clientName);
  }, []);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Campaign>) => (
    <ItemCard item={item} onPress={handleItemPress} />
  ), [handleItemPress]);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No campaigns found</Text>
      <Text style={styles.emptySubtitle}>No digital marketing campaigns match "{searchQuery}". Try searching by client name, industry, or ad channel.</Text>
    </View>
  ), [searchQuery]);

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);
  const keyExtractor = useCallback((item: Campaign) => item.id, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>APEX MARKETING DASHBOARD</Text>
          </View>
          <Text style={styles.headerTitle}>Campaign Intelligence</Text>
          <Text style={styles.headerSubtitle}>Filter through {MOCK_ITEMS.length} active client marketing campaigns</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search campaigns, clients, channels..."
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <FlatList
          data={filteredCampaigns}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.lg, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: COLORS.activeBadge, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, marginBottom: SPACING.xs, borderWidth: 1, borderColor: COLORS.primary + '40' },
  headerBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { ...TYPOGRAPHY.title },
  headerSubtitle: { ...TYPOGRAPHY.subtitle, marginTop: 2 },
  searchContainer: { marginTop: SPACING.md },
  searchInput: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  listContent: { padding: SPACING.lg },
  separator: { height: SPACING.xs },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center', lineHeight: 20 },
});
FILE_END

cat << 'FILE_END' > README.md
# Week 02 — Searchable Campaign List & Theming
FILE_END

git add .
git commit -m "feat: implement week-02 searchable campaign list with theming"

# ==========================================
# WEEK 03
# ==========================================
git checkout -b week-03

cat << 'FILE_END' > package.json
{
  "name": "bc-reactnative-marketing-agency",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}
FILE_END

cat << 'FILE_END' > src/navigation/types.ts
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  CampaignsList: undefined;
  CampaignDetail: { id: string; title: string };
};

export type RootTabParamList = {
  CampaignsTab: NavigatorScreenParams<HomeStackParamList>;
  ChannelsTab: undefined;
};

export type CampaignsListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'CampaignsList'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type CampaignDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'CampaignDetail'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type ChannelsScreenProps = BottomTabScreenProps<RootTabParamList, 'ChannelsTab'>;
FILE_END

cat << 'FILE_END' > src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { ChannelsScreen } from '../screens/ChannelsScreen';
import { COLORS } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTitleStyle: { color: COLORS.textPrimary, fontWeight: '700' },
        headerTintColor: COLORS.primary,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="CampaignsList" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CampaignDetail" component={DetailScreen} options={({ route }) => ({ title: route.params.title })} />
    </Stack.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, elevation: 0 },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'cube-outline';
            if (route.name === 'CampaignsTab') iconName = 'megaphone-outline';
            else if (route.name === 'ChannelsTab') iconName = 'stats-chart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="CampaignsTab" component={HomeStackNavigator} options={{ tabBarLabel: 'Campaigns' }} />
        <Tab.Screen name="ChannelsTab" component={ChannelsScreen} options={{ tabBarLabel: 'Channels' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
FILE_END

cat << 'FILE_END' > src/screens/DetailScreen.tsx
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, SafeAreaView, StatusBar, Pressable } from 'react-native';
import { CampaignDetailScreenProps } from '../navigation/types';
import { MOCK_ITEMS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

export function DetailScreen({ route, navigation }: CampaignDetailScreenProps): React.JSX.Element {
  const { id } = route.params;
  const campaign = MOCK_ITEMS.find((item) => item.id === id) || MOCK_ITEMS[0];
  const spentPercentage = Math.round((campaign.spent / campaign.budget) * 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image source={{ uri: campaign.imageUri }} style={styles.image} resizeMode="cover" />
        <View style={styles.headerBox}>
          <View style={styles.badgeRow}>
            <Text style={styles.channelText}>{campaign.channel}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{campaign.status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.title}>{campaign.title}</Text>
          <Text style={styles.client}>{campaign.clientName} • {campaign.industry}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Summary</Text>
          <Text style={styles.description}>{campaign.subtitle}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget & Expenditure</Text>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Spent ${campaign.spent.toLocaleString()} of ${campaign.budget.toLocaleString()}</Text>
            <Text style={styles.progressValue}>{spentPercentage}%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${Math.min(spentPercentage, 100)}%` }]} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>TARGET REACH</Text>
              <Text style={styles.statValue}>{campaign.targetReach}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>AVG. CTR</Text>
              <Text style={styles.statValue}>3.42%</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>COST PER CLICK</Text>
              <Text style={styles.statValue}>$0.84</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>ESTIMATED ROI</Text>
              <Text style={styles.statValue}>320%</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Campaigns</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  image: { width: '100%', height: 200, borderRadius: RADIUS.lg },
  headerBox: { gap: SPACING.xs },
  badgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  channelText: { fontSize: 13, color: COLORS.accent, fontWeight: '700' },
  badge: { backgroundColor: COLORS.activeBadge, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  badgeText: { fontSize: 11, color: COLORS.success, fontWeight: '800' },
  title: { ...TYPOGRAPHY.title, fontSize: 24 },
  client: { fontSize: 14, color: COLORS.primary, fontWeight: '600' },
  section: { backgroundColor: COLORS.card, padding: SPACING.lg, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  description: { ...TYPOGRAPHY.body, lineHeight: 22 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xs },
  progressLabel: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  progressValue: { fontSize: 12, color: COLORS.accent, fontWeight: '700' },
  progressBarBg: { height: 10, backgroundColor: COLORS.background, borderRadius: RADIUS.full, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  statBox: { width: '48%', backgroundColor: COLORS.background, padding: SPACING.md, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.border },
  statLabel: { fontSize: 10, color: COLORS.textMuted, fontWeight: '700' },
  statValue: { fontSize: 16, color: COLORS.textPrimary, fontWeight: '800', marginTop: 4 },
  backButton: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center' },
  backButtonText: { color: COLORS.textPrimary, fontWeight: '700' },
});
FILE_END

cat << 'FILE_END' > src/screens/ChannelsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';

const MARKETING_CHANNELS = [
  { id: '1', name: 'Meta Ads', activeCampaigns: 4, share: '35%' },
  { id: '2', name: 'Google Search', activeCampaigns: 3, share: '28%' },
  { id: '3', name: 'LinkedIn Ads', activeCampaigns: 2, share: '22%' },
  { id: '4', name: 'TikTok Ads', activeCampaigns: 2, share: '15%' },
];

export function ChannelsScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={TYPOGRAPHY.title}>Marketing Channels</Text>
          <Text style={TYPOGRAPHY.subtitle}>Active acquisition networks and campaign distribution</Text>
        </View>

        {MARKETING_CHANNELS.map((channel) => (
          <View key={channel.id} style={styles.channelCard}>
            <View>
              <Text style={styles.channelName}>{channel.name}</Text>
              <Text style={styles.channelSubtitle}>{channel.activeCampaigns} Active Client Campaigns</Text>
            </View>
            <View style={styles.shareBadge}>
              <Text style={styles.shareText}>{channel.share}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md },
  header: { marginBottom: SPACING.md },
  channelCard: { backgroundColor: COLORS.card, padding: SPACING.lg, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  channelName: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  channelSubtitle: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  shareBadge: { backgroundColor: COLORS.primary + '20', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.primary },
  shareText: { color: COLORS.primary, fontWeight: '800', fontSize: 14 },
});
FILE_END

cat << 'FILE_END' > src/screens/HomeScreen.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ListRenderItemInfo } from 'react-native';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { MOCK_ITEMS } from '../data/mockData';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { CampaignsListScreenProps } from '../navigation/types';

export function HomeScreen({ navigation }: CampaignsListScreenProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return MOCK_ITEMS;
    return MOCK_ITEMS.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.clientName.toLowerCase().includes(query) ||
      item.channel.toLowerCase().includes(query) ||
      item.industry.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleItemPress = useCallback((item: Campaign) => {
    navigation.navigate('CampaignDetail', { id: item.id, title: item.title });
  }, [navigation]);

  const renderItem = useCallback(({ item }: ListRenderItemInfo<Campaign>) => (
    <ItemCard item={item} onPress={handleItemPress} />
  ), [handleItemPress]);

  const renderEmptyComponent = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No campaigns found</Text>
      <Text style={styles.emptySubtitle}>No digital marketing campaigns match "{searchQuery}". Try searching by client name, industry, or ad channel.</Text>
    </View>
  ), [searchQuery]);

  const renderSeparator = useCallback(() => <View style={styles.separator} />, []);
  const keyExtractor = useCallback((item: Campaign) => item.id, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>APEX MARKETING DASHBOARD</Text>
          </View>
          <Text style={styles.headerTitle}>Campaign Intelligence</Text>
          <Text style={styles.headerSubtitle}>Filter through {MOCK_ITEMS.length} active client marketing campaigns</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search campaigns, clients, channels..."
              placeholderTextColor={COLORS.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>
        <FlatList
          data={filteredCampaigns}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.lg, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerBadge: { alignSelf: 'flex-start', backgroundColor: COLORS.activeBadge, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, marginBottom: SPACING.xs, borderWidth: 1, borderColor: COLORS.primary + '40' },
  headerBadgeText: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  headerTitle: { ...TYPOGRAPHY.title },
  headerSubtitle: { ...TYPOGRAPHY.subtitle, marginTop: 2 },
  searchContainer: { marginTop: SPACING.md },
  searchInput: { backgroundColor: COLORS.inputBg, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  listContent: { padding: SPACING.lg },
  separator: { height: SPACING.xs },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center', lineHeight: 20 },
});
FILE_END

cat << 'FILE_END' > App.tsx
import React from 'react';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App(): React.JSX.Element {
  return <RootNavigator />;
}
FILE_END

cat << 'FILE_END' > README.md
# Week 03 — React Navigation 7 Integration
FILE_END

git add .
git commit -m "feat: implement week-03 react navigation 7 tabs and stack"

# ==========================================
# WEEK 04
# ==========================================
git checkout -b week-04

cat << 'FILE_END' > package.json
{
  "name": "bc-reactnative-marketing-agency",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}
FILE_END

cat << 'FILE_END' > src/stores/savedStore.ts
import { create } from 'zustand';
import { Campaign } from '../types';

interface SavedState {
  savedCampaigns: Campaign[];
  addCampaign: (campaign: Campaign) => void;
  removeCampaign: (campaignId: string) => void;
  toggleSaveCampaign: (campaign: Campaign) => void;
  clearSaved: () => void;
  isSaved: (campaignId: string) => boolean;
}

export const useSavedCampaignsStore = create<SavedState>((set, get) => ({
  savedCampaigns: [],
  addCampaign: (campaign: Campaign) => {
    set((state) => {
      if (state.savedCampaigns.some((item) => item.id === campaign.id)) return state;
      return { savedCampaigns: [...state.savedCampaigns, campaign] };
    });
  },
  removeCampaign: (campaignId: string) => {
    set((state) => ({ savedCampaigns: state.savedCampaigns.filter((item) => item.id !== campaignId) }));
  },
  toggleSaveCampaign: (campaign: Campaign) => {
    const { isSaved, addCampaign, removeCampaign } = get();
    if (isSaved(campaign.id)) removeCampaign(campaign.id);
    else addCampaign(campaign);
  },
  clearSaved: () => set({ savedCampaigns: [] }),
  isSaved: (campaignId: string) => get().savedCampaigns.some((item) => item.id === campaignId),
}));
FILE_END

cat << 'FILE_END' > src/screens/SavedScreen.tsx
import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar, Pressable, ListRenderItemInfo } from 'react-native';
import { Campaign } from '../types';
import { ItemCard } from '../components/ItemCard';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { useSavedCampaignsStore } from '../stores/savedStore';
import { SavedScreenProps } from '../navigation/types';

export function SavedScreen({ navigation }: SavedScreenProps): React.JSX.Element {
  const savedCampaigns = useSavedCampaignsStore((state) => state.savedCampaigns);
  const clearSaved = useSavedCampaignsStore((state) => state.clearSaved);

  const handleItemPress = useCallback(
    (item: Campaign) => {
      navigation.navigate('CampaignsTab', {
        screen: 'CampaignDetail',
        params: { id: item.id, title: item.title },
      });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Campaign>) => (
      <ItemCard item={item} onPress={handleItemPress} />
    ),
    [handleItemPress]
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No saved campaigns</Text>
        <Text style={styles.emptySubtitle}>Bookmark client campaigns from the details screen to access quick performance tracking here.</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={TYPOGRAPHY.title}>Saved Campaigns</Text>
            <Text style={TYPOGRAPHY.subtitle}>Bookmarked client records ({savedCampaigns.length})</Text>
          </View>
          {savedCampaigns.length > 0 && (
            <Pressable style={styles.clearButton} onPress={clearSaved}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </Pressable>
          )}
        </View>
      </View>

      <FlatList
        data={savedCampaigns}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: SPACING.lg, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  clearButton: { backgroundColor: COLORS.error + '20', paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.error },
  clearButtonText: { color: COLORS.error, fontWeight: '700', fontSize: 12 },
  listContent: { padding: SPACING.lg },
  emptyContainer: { padding: SPACING.xxl, alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  emptySubtitle: { ...TYPOGRAPHY.body, textAlign: 'center' },
});
FILE_END

cat << 'FILE_END' > README.md
# Week 04 — Global State Management with Zustand
FILE_END

git add .
git commit -m "feat: implement week-04 global state with zustand"

# ==========================================
# WEEK 05
# ==========================================
git checkout -b week-05

cat << 'FILE_END' > package.json
{
  "name": "bc-reactnative-marketing-agency",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.7.0",
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.1.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}
FILE_END

cat << 'FILE_END' > src/types/index.ts
export interface Campaign {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  channel: 'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  targetReach: string;
  imageUri: string;
  subtitle: string;
}

export interface CreateCampaignPayload {
  title: string;
  clientName: string;
  industry: string;
  channel: 'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing';
  budget: number;
  subtitle: string;
}
FILE_END

cat << 'FILE_END' > src/services/api.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
FILE_END

cat << 'FILE_END' > src/hooks/useItems.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { Campaign, CreateCampaignPayload } from '../types';
import { MOCK_ITEMS } from '../data/mockData';

export const CAMPAIGNS_QUERY_KEY = ['campaigns'] as const;

let localCampaigns = [...MOCK_ITEMS];

export function useCampaigns() {
  return useQuery<Campaign[]>({
    queryKey: CAMPAIGNS_QUERY_KEY,
    queryFn: async () => {
      try {
        await apiClient.get('/posts?_limit=10');
        return localCampaigns;
      } catch (error) {
        return localCampaigns;
      }
    },
  });
}

export function useCampaignById(id: string) {
  return useQuery<Campaign>({
    queryKey: [...CAMPAIGNS_QUERY_KEY, id],
    queryFn: async () => {
      const found = localCampaigns.find((c) => c.id === id);
      if (found) return found;
      try {
        const { data } = await apiClient.get(`/posts/${id}`);
        return {
          id: String(data.id),
          title: data.title,
          clientName: 'API Enterprise Client',
          industry: 'Digital Services',
          channel: 'Google Search',
          status: 'active',
          budget: 20000,
          spent: 5000,
          targetReach: '250K Users',
          imageUri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
          subtitle: data.body || 'REST API synced marketing campaign',
        };
      } catch (error) {
        return localCampaigns[0];
      }
    },
    enabled: !!id,
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();

  return useMutation<Campaign, Error, CreateCampaignPayload>({
    mutationFn: async (payload) => {
      try {
        await apiClient.post('/posts', payload);
      } catch (err) {}

      const newCampaign: Campaign = {
        id: `c-${Date.now()}`,
        title: payload.title,
        clientName: payload.clientName,
        industry: payload.industry,
        channel: payload.channel,
        status: 'active',
        budget: payload.budget,
        spent: 0,
        targetReach: '100K Users',
        imageUri: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
        subtitle: payload.subtitle,
      };

      localCampaigns = [newCampaign, ...localCampaigns];
      return newCampaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_QUERY_KEY });
    },
  });
}
FILE_END

cat << 'FILE_END' > src/screens/CreateScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, StatusBar, ScrollView, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { CreateCampaignScreenProps } from '../navigation/types';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { useCreateCampaign } from '../hooks/useItems';

export function CreateScreen({ navigation }: CreateCampaignScreenProps): React.JSX.Element {
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [channel, setChannel] = useState<'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing'>('Meta Ads');
  const [budget, setBudget] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const createMutation = useCreateCampaign();

  const handleSubmit = () => {
    if (!title.trim() || !clientName.trim()) return;
    createMutation.mutate(
      {
        title: title.trim(),
        clientName: clientName.trim(),
        industry: industry.trim() || 'General Business',
        channel,
        budget: Number(budget) || 10000,
        subtitle: subtitle.trim() || 'Custom digital marketing acquisition strategy',
      },
      {
        onSuccess: () => navigation.goBack(),
      }
    );
  };

  const isPending = createMutation.isPending;
  const canSubmit = title.trim().length > 0 && clientName.trim().length > 0 && !isPending;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.sectionLabel}>Client & Campaign Details</Text>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Campaign Title *</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g., Q4 Enterprise Lead Gen" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Client Name *</Text>
            <TextInput style={styles.input} value={clientName} onChangeText={setClientName} placeholder="e.g., Apex Global Corp" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Industry</Text>
            <TextInput style={styles.input} value={industry} onChangeText={setIndustry} placeholder="e.g., E-Commerce / SaaS / Healthcare" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Budget (USD)</Text>
            <TextInput style={styles.input} value={budget} onChangeText={setBudget} placeholder="e.g., 15000" keyboardType="numeric" placeholderTextColor={COLORS.textMuted} />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Strategy Overview</Text>
            <TextInput style={[styles.input, styles.multiline]} value={subtitle} onChangeText={setSubtitle} placeholder="Describe campaign goals and target audience..." placeholderTextColor={COLORS.textMuted} multiline numberOfLines={3} textAlignVertical="top" />
          </View>
          <Pressable style={[styles.button, !canSubmit && styles.buttonDisabled]} onPress={handleSubmit} disabled={!canSubmit}>
            {isPending ? <ActivityIndicator size="small" color="#ffffff" /> : <Text style={styles.buttonText}>Publish Campaign</Text>}
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  flex: { flex: 1 },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md },
  sectionLabel: { fontSize: 12, fontWeight: '800', color: COLORS.primary, letterSpacing: 1 },
  field: { gap: SPACING.xs },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  input: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.sm, padding: SPACING.md, color: COLORS.textPrimary, fontSize: 14 },
  multiline: { minHeight: 80 },
  button: { backgroundColor: COLORS.primary, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', marginTop: SPACING.md },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  cancelButton: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { color: COLORS.textMuted, fontSize: 14 },
});
FILE_END

cat << 'FILE_END' > App.tsx
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from './src/navigation/RootNavigator';

const queryClient = new QueryClient();

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
FILE_END

cat << 'FILE_END' > README.md
# Week 05 — Networking & TanStack Query v5
FILE_END

git add .
git commit -m "feat: implement week-05 networking and tanstack query v5"

# --- MAIN SYNC & PUSH ---
git checkout -b main week-05 2>/dev/null || (git checkout main && git reset --hard week-05)

git push origin --all --force

echo "🎉 ¡LISTO! Todas las ramas (week-01 a week-05) han sido creadas y subidas a tu repositorio de GitHub."
