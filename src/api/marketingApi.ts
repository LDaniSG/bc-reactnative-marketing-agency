import { Campaign, Client } from '../types/marketing.types';

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-01',
    name: 'Valeria Gómez',
    company: 'Nova Ecommerce',
    email: 'valeria@novashop.com',
    phone: '+57 310 987 6543',
    industry: 'E-commerce',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    activeCampaignsCount: 3,
    createdAt: '2024-01-15',
  },
];

let INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-101',
    clientId: 'cli-01',
    clientName: 'Nova Ecommerce',
    title: 'Cyber Monday Flash Sales',
    objective: 'Conversions',
    budget: 8500,
    spent: 6120,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    bannerUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600',
    channels: [
      { id: 'ch-1', platform: 'Meta Ads', budgetAllocated: 5000, spent: 3900, sharePercentage: 58, performanceScore: 92 },
      { id: 'ch-2', platform: 'Google Ads', budgetAllocated: 2500, spent: 1720, sharePercentage: 30, performanceScore: 88 },
    ],
    metrics: {
      impressions: 485200,
      clicks: 22400,
      conversions: 1840,
      ctr: 4.62,
      cpc: 0.27,
      roas: 4.85,
      recordedAt: new Date().toISOString(),
    },
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MarketingApi = {
  async getCampaigns(): Promise<Campaign[]> {
    await delay(600);
    return [...INITIAL_CAMPAIGNS];
  },

  async getClients(): Promise<Client[]> {
    await delay(500);
    return [...INITIAL_CLIENTS];
  },

  async toggleCampaignStatus(id: string): Promise<Campaign> {
    await delay(300);
    const item = INITIAL_CAMPAIGNS.find((c) => c.id === id);
    if (!item) throw new Error('Campaña no encontrada');
    item.status = item.status === 'active' ? 'paused' : 'active';
    return { ...item };
  },
};