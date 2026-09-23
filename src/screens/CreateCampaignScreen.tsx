import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { darkTheme } from '../theme/colors';
import { CampaignObjective } from '../types/marketing.types';
import { MarketingApi } from '../api/marketingApi';
import { useHaptics } from '../hooks/useHaptics';

export const CreateCampaignScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { triggerSuccess, triggerWarning } = useHaptics();
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [budget, setBudget] = useState('');
  const [objective, setObjective] = useState<CampaignObjective>('Conversions');
  const [bannerUri, setBannerUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const objectives: CampaignObjective[] = [
    'Conversions',
    'Traffic',
    'Brand Awareness',
    'Lead Generation',
  ];

  const pickBannerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a la galería para el creativo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setBannerUri(result.assets[0].uri);
    }
  };

  const takeBannerPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setBannerUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !clientName.trim() || !budget.trim()) {
      triggerWarning();
      Alert.alert('Campos incompletos', 'Por favor completa título, cliente y presupuesto.');
      return;
    }

    setLoading(true);
    try {
      await MarketingApi.createCampaign({
        clientId: `cli-${Date.now()}`,
        clientName,
        title,
        objective,
        budget: parseFloat(budget) || 1000,
        spent: 0,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        bannerUrl: bannerUri || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        channels: [
          {
            id: `ch-${Date.now()}`,
            platform: 'Meta Ads',
            budgetAllocated: parseFloat(budget) || 1000,
            spent: 0,
            sharePercentage: 100,
            performanceScore: 90,
          },
        ],
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          ctr: 0,
          cpc: 0,
          roas: 0,
          recordedAt: new Date().toISOString(),
        },
      });

      triggerSuccess();
      Alert.alert('¡Éxito!', 'Campaña lanzada correctamente 🚀');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo crear la campaña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }}>
      <Text style={styles.sectionHeader}>🚀 Nuevo Lanzamiento de Campaña</Text>
      <Text style={styles.subtitle}>Completa los datos para activar la pauta</Text>

      {/* Banner / Creativo */}
      <Text style={styles.label}>🎨 Creativo Publicitario / Banner</Text>
      {bannerUri ? (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: bannerUri }} style={styles.previewImage} />
          <TouchableOpacity style={styles.changeBannerBtn} onPress={pickBannerImage}>
            <Text style={styles.changeBannerText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.uploadRow}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickBannerImage}>
            <Text style={styles.uploadEmoji}>🖼️</Text>
            <Text style={styles.uploadText}>Galería</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadBtnSecondary} onPress={takeBannerPhoto}>
            <Text style={styles.uploadEmoji}>📸</Text>
            <Text style={styles.uploadTextSecondary}>Tomar Foto</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Título */}
      <Text style={styles.label}>📌 Título de la Campaña *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Black Friday Retargeting 2024"
        placeholderTextColor={darkTheme.textMuted}
        value={title}
        onChangeText={setTitle}
      />

      {/* Cliente */}
      <Text style={styles.label}>👤 Cliente / Cuenta Publicitaria *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Nova Ecommerce SAS"
        placeholderTextColor={darkTheme.textMuted}
        value={clientName}
        onChangeText={setClientName}
      />

      {/* Presupuesto */}
      <Text style={styles.label}>💰 Presupuesto Asignado (USD) *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 5000"
        placeholderTextColor={darkTheme.textMuted}
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      {/* Objetivos */}
      <Text style={styles.label}>🎯 Objetivo Publicitario</Text>
      <View style={styles.pillsContainer}>
        {objectives.map((obj) => {
          const selected = objective === obj;
          return (
            <TouchableOpacity
              key={obj}
              onPress={() => setObjective(obj)}
              style={[styles.pill, selected && styles.pillSelected]}
            >
              <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
                {obj}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botón principal */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSave} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.submitBtnText}>🚀 Lanzar Campaña</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: darkTheme.textSecondary,
    marginBottom: 24,
  },
  label: {
    color: darkTheme.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: darkTheme.surface,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    borderRadius: 14,
    padding: 14,
    color: darkTheme.textPrimary,
    fontSize: 15,
    marginBottom: 18,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  uploadBtn: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: darkTheme.primary,
  },
  uploadBtnSecondary: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: '#E0E7FF',
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: darkTheme.primary,
  },
  uploadEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  uploadText: {
    color: darkTheme.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  uploadTextSecondary: {
    color: darkTheme.primary,
    fontWeight: '700',
    fontSize: 14,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 20,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
  },
  previewImage: {
    width: '100%',
    height: 180,
  },
  changeBannerBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  changeBannerText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 28,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  pillSelected: {
    backgroundColor: darkTheme.primary,
    borderColor: darkTheme.primary,
  },
  pillText: {
    color: darkTheme.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  submitBtn: {
    backgroundColor: darkTheme.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: darkTheme.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
});