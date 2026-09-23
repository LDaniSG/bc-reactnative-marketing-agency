import AsyncStorage from '@react-native-async-storage/async-storage';
import { Campaign } from '../types/marketing.types';

const CAMPAIGNS_KEY = '@marketing_agency_campaigns_v2';

export const StorageService = {
  // Guardar lista completa de campañas localmente
  async saveCampaigns(campaigns: Campaign[]): Promise<void> {
    try {
      await AsyncStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
    } catch (error) {
      console.error('Error guardando en AsyncStorage', error);
    }
  },

  // Recuperar campañas persistidas
  async getCampaigns(): Promise<Campaign[] | null> {
    try {
      const data = await AsyncStorage.getItem(CAMPAIGNS_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error leyendo de AsyncStorage', error);
      return null;
    }
  },

  // Limpiar almacenamiento local
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CAMPAIGNS_KEY);
    } catch (error) {
      console.error('Error limpiando AsyncStorage', error);
    }
  },
};