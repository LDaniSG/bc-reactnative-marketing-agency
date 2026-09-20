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
