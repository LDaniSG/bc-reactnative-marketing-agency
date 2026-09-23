import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign, Client } from '../types/marketing.types';
import { MarketingApi } from '../api/marketingApi';

interface MarketingContextProps {
  campaigns: Campaign[];
  clients: Client[];
  loading: boolean;
  refreshCampaigns: () => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
}

const MarketingContext = createContext<MarketingContextProps>({} as MarketingContextProps);

export const MarketingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [cData, clData] = await Promise.all([
        MarketingApi.getCampaigns(),
        MarketingApi.getClients(),
      ]);
      setCampaigns(cData);
      setClients(clData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshCampaigns = async () => {
    await loadData();
  };

  const toggleStatus = async (id: string) => {
    const updated = await MarketingApi.toggleCampaignStatus(id);
    setCampaigns((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const addCampaign = async (campaign: Omit<Campaign, 'id'>) => {
    const created = await MarketingApi.createCampaign(campaign);
    setCampaigns((prev) => [created, ...prev]);
  };

  return (
    <MarketingContext.Provider
      value={{
        campaigns,
        clients,
        loading,
        refreshCampaigns,
        toggleStatus,
        addCampaign,
      }}
    >
      {children}
    </MarketingContext.Provider>
  );
};

export const useMarketing = () => useContext(MarketingContext);