import React, { useState, useEffect } from 'react';
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

  // Estados del Formulario (Variables por campo)
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [budget, setBudget] = useState('');
  const [objective, setObjective] = useState<CampaignObjective>('Conversions');
  const [bannerUri, setBannerUri] = useState<string | null>(null);

  // Estados de Errores por Campo (Validación explícita)
  const [titleError, setTitleError] = useState('');
  const [clientError, setClientError] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [bannerError, setBannerError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const objectives: CampaignObjective[] = [
    'Conversions',
    'Traffic',
    'Brand Awareness',
    'Lead Generation',
  ];

  // Validar variables campo por campo
  useEffect(() => {
    let valid = true;

    // Validación de Título
    if (title.trim() === '') {
      setTitleError('El título es requerido');
      valid = false;
    } else if (title.trim().length < 5) {
      setTitleError('El título debe tener al menos 5 caracteres');
      valid = false;
    } else {
      setTitleError('');
    }

    // Validación de Cliente
    if (clientName.trim() === '') {
      setClientError('El nombre del cliente es requerido');
      valid = false;
    } else {
      setClientError('');
    }

    // Validación de Presupuesto
    const numericBudget = parseFloat(budget);
    if (!budget.trim()) {
      setBudgetError('El presupuesto es requerido');
      valid = false;
    } else if (isNaN(numericBudget) || numericBudget < 100) {
      setBudgetError('El presupuesto mínimo es $100 USD');
      valid = false;
    } else {
      setBudgetError('');
    }

    setIsFormValid(valid);
  }, [title, clientName, budget]);

  const pickBannerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la galería.');
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
      setBannerError('');
    }
  };

  const takeBannerPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita acceso a la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      setBannerUri(result.assets[0].uri);
      setBannerError('');
    }
  };

  const handleSave = async () => {
    if (!isFormValid) {
      triggerWarning();
      Alert.alert('Formulario Inválido', 'Corrige los errores antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      await MarketingApi.createCampaign({
        clientId: `cli-${Date.now()}`,
        clientName,
        title,
        objective,
        budget: parseFloat(budget),
        spent: 0,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        bannerUrl: bannerUri || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
        channels: [
          {
            id: `ch-${Date.now()}`,
            platform: 'Meta Ads',
            budgetAllocated: parseFloat(budget),
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
      Alert.alert('¡Éxito!', 'Campaña validada y lanzada correctamente 🚀');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'No se pudo guardar la campaña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 48 }}>
      <Text style={styles.sectionHeader}>🚀 Formulario de Nueva Campaña</Text>
      <Text style={styles.subtitle}>Validación de variables por campo en tiempo real</Text>

      {/* Creativo Banner */}
      <Text style={styles.label}>🎨 Creativo Publicitario</Text>
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

      {/* Campo Título */}
      <Text style={styles.label}>📌 Título de la Campaña *</Text>
      <TextInput
        style={[styles.input, titleError ? styles.inputError : null]}
        placeholder="Ej. Black Friday Retargeting 2024"
        placeholderTextColor={darkTheme.textMuted}
        value={title}
        onChangeText={setTitle}
      />
      {titleError ? <Text style={styles.errorText}>⚠️ {titleError}</Text> : null}

      {/* Campo Cliente */}
      <Text style={styles.label}>👤 Cliente / Cuenta Publicitaria *</Text>
      <TextInput
        style={[styles.input, clientError ? styles.inputError : null]}
        placeholder="Ej. Nova Ecommerce SAS"
        placeholderTextColor={darkTheme.textMuted}
        value={clientName}
        onChangeText={setClientName}
      />
      {clientError ? <Text style={styles.errorText}>⚠️ {clientError}</Text> : null}

      {/* Campo Presupuesto */}
      <Text style={styles.label}>💰 Presupuesto Asignado (USD) *</Text>
      <TextInput
        style={[styles.input, budgetError ? styles.inputError : null]}
        placeholder="Ej. 5000"
        placeholderTextColor={darkTheme.textMuted}
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />
      {budgetError ? <Text style={styles.errorText}>⚠️ {budgetError}</Text> : null}

      {/* Campo Objetivo */}
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

      {/* Botón Guardar Validado */}
      <TouchableOpacity
        style={[styles.submitBtn, !isFormValid && styles.submitBtnDisabled]}
        onPress={handleSave}
        disabled={!isFormValid || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.submitBtnText}>
            {isFormValid ? '🚀 Lanzar Campaña Validada' : '🔒 Formulario Incompleto'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkTheme.background, padding: 20 },
  sectionHeader: { fontSize: 22, fontWeight: '800', color: darkTheme.textPrimary },
  subtitle: { fontSize: 13, color: darkTheme.textSecondary, marginBottom: 20, marginTop: 2 },
  label: { color: darkTheme.textSecondary, fontSize: 12, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' },
  input: {
    backgroundColor: darkTheme.surface,
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
    borderRadius: 14,
    padding: 14,
    color: darkTheme.textPrimary,
    fontSize: 15,
  },
  inputError: { borderColor: darkTheme.accent, backgroundColor: '#FFF5F5' },
  errorText: { color: darkTheme.accent, fontSize: 12, fontWeight: '700', marginTop: 4, marginBottom: 12 },
  uploadRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  uploadBtn: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: darkTheme.primary,
  },
  uploadBtnSecondary: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: '#E0E7FF',
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: darkTheme.primary,
  },
  uploadEmoji: { fontSize: 20, marginBottom: 2 },
  uploadText: { color: darkTheme.primary, fontWeight: '700', fontSize: 13 },
  uploadTextSecondary: { color: darkTheme.primary, fontWeight: '700', fontSize: 13 },
  imageWrapper: { position: 'relative', marginBottom: 16, borderRadius: 14, overflow: 'hidden' },
  previewImage: { width: '100%', height: 160 },
  changeBannerBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  changeBannerText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 6, marginBottom: 24 },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: darkTheme.surfaceBorder,
  },
  pillSelected: { backgroundColor: darkTheme.primary, borderColor: darkTheme.primary },
  pillText: { color: darkTheme.textSecondary, fontSize: 13, fontWeight: '600' },
  pillTextSelected: { color: '#FFFFFF' },
  submitBtn: {
    backgroundColor: darkTheme.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnDisabled: { backgroundColor: darkTheme.textMuted },
  submitBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
});