import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useMarketing } from '../context/MarketingContext';
import { darkTheme } from '../theme/colors';

export const ClientsScreen = () => {
  const { clients } = useMarketing();
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  const handleContact = (type: string, target: string) => {
    Alert.alert(`Contactar via ${type}`, `Iniciando comunicación con ${target}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>👤 Cartera de Clientes</Text>
            <Text style={styles.subtitle}>
              Cuentas publicitarias activas bajo gestión de la agencia
            </Text>

            {/* Cabecera de Estadísticas de la Cartera */}
            <View style={styles.statsBanner}>
              <View style={styles.statCol}>
                <Text style={styles.statVal}>{clients.length}</Text>
                <Text style={styles.statLbl}>Cuentas Activas</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statCol}>
                <Text style={styles.statVal}>$120K</Text>
                <Text style={styles.statLbl}>Inversión / Mes</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statCol}>
                <Text style={[styles.statVal, { color: darkTheme.success }]}>98%</Text>
                <Text style={styles.statLbl}>Retención</Text>
              </View>
            </View>

            {/* Buscador */}
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                placeholder="🔍 Buscar por marca, representante o industria..."
                placeholderTextColor={darkTheme.textMuted}
                value={search}
                onChangeText={setSearch}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.company}>{item.company}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.industryTag}>
                  <Text style={styles.industryText}>🏷️ {item.industry}</Text>
                </View>
              </View>
              <View style={styles.campaignBadge}>
                <Text style={styles.campaignBadgeText}>
                  {item.activeCampaignsCount} activas
                </Text>
              </View>
            </View>

            {/* Botones de contacto rápido */}
            <View style={styles.contactRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleContact('Llamada', item.phone)}
              >
                <Text style={styles.actionBtnText}>📞 {item.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnEmail]}
                onPress={() => handleContact('Email', item.email)}
              >
                <Text style={styles.actionBtnText}>📧 {item.email}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
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
    marginTop: 2,
    marginBottom: 14,
  },
  statsBanner: {
    flexDirection: 'row',
    backgroundColor: darkTheme.surface,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    marginBottom: 14,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: darkTheme.primary,
  },
  statLbl: {
    fontSize: 11,
    fontWeight: '700',
    color: darkTheme.textMuted,
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: darkTheme.surfaceBorder,
  },
  searchWrapper: {
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: darkTheme.surface,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: darkTheme.textPrimary,
  },
  card: {
    backgroundColor: darkTheme.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  company: {
    fontSize: 16,
    fontWeight: '800',
    color: darkTheme.textPrimary,
  },
  name: {
    fontSize: 13,
    color: darkTheme.textSecondary,
    marginTop: 1,
  },
  industryTag: {
    backgroundColor: '#EEF2FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
  },
  industryText: {
    fontSize: 11,
    fontWeight: '700',
    color: darkTheme.primary,
  },
  campaignBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  campaignBadgeText: {
    color: darkTheme.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  contactRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E7FF',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionBtnEmail: {
    backgroundColor: '#F0FDFA',
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: darkTheme.textPrimary,
  },
});