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
