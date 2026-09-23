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

  const objectives: CampaignObjective[] = ['Conversions', 'Traffic', 'Brand Awareness', 'Lead Generation'];

  const pickBannerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se requiere acceso a la galería para adjuntar el creativo de campaña.');
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
      Alert.alert('Permiso requerido', 'Se requiere acceso a la cámara.');
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
      Alert.alert('Campos vacíos', 'Por favor llena los campos requeridos.');
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
        bannerUrl: bannerUri || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600',
        channels: [
          { id: `ch-${Date.now()}`, platform: 'Meta Ads', budgetAllocated: parseFloat(budget) || 1000, spent: 0, sharePercentage: 100, performanceScore: 90 },
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
      Alert.alert('Éxito', '¡Campaña publicitaria lanzada con éxito!');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar la campaña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.sectionHeader}>Nuevo Lanzamiento de Campaña</Text>

      <Text style={styles.label}>Creativo Publicitario / Banner</Text>
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
            <Text style={styles.uploadText}>📁 Galería</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.uploadBtn, { backgroundColor: '#1E293B' }]} onPress={takeBannerPhoto}>
            <Text style={styles.uploadText}>📸 Tomar Foto</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.label}>Título de la Campaña *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Black Friday Retargeting 2024"
        placeholderTextColor="#64748B"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Cliente / Cuenta Publicitaria *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Nova Ecommerce SAS"
        placeholderTextColor="#64748B"
        value={clientName}
        onChangeText={setClientName}
      />

      <Text style={styles.label}>Presupuesto Asignado (USD) *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 5000"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <Text style={styles.label}>Objetivo Publicitario</Text>
      <View style={styles.pillsContainer}>
        {objectives.map((obj) => {
          const selected = objective === obj;
          return (
            <TouchableOpacity
              key={obj}
              onPress={() => setObjective(obj)}
              style={[styles.pill, selected && styles.pillSelected]}
            >
              <Text style={[styles.pillText, selected && styles.pillTextSelected]}>{obj}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
    padding: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: darkTheme.textPrimary,
    marginBottom: 20,
    marginTop: 4,
  },
  label: {
    color: darkTheme.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: darkTheme.surface,
    borderWidth: 1,
    borderColor: darkTheme.surfaceBorder,
    borderRadius: 12,
    padding: 14,
    color: '#FFF',
    fontSize: 15,
    marginBottom: 16,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  uploadBtn: {
    flex: 1,
    padding: 16,
    backgroundColor: darkTheme.surfaceElevated,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: darkTheme.primary,
  },
  uploadText: {
    color: darkTheme.textPrimary,
    fontWeight: '600',
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  changeBannerBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.75)',
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
    marginBottom: 24,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: darkTheme.surface,
    borderWidth: 1,
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
    color: '#FFF',
  },
  submitBtn: {
    backgroundColor: darkTheme.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});