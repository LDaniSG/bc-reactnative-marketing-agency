import { Campaign, Client } from '../types/marketing.types';
import { StorageService } from '../services/storage';

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-01',
    name: 'Valeria Gómez',
    company: 'Nova Ecommerce SAS',
    email: 'valeria@novashop.com',
    phone: '+57 310 987 6543',
    industry: 'E-commerce',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    activeCampaignsCount: 2,
    createdAt: '2024-01-15',
  },
  {
    id: 'cli-02',
    name: 'Carlos Mendoza',
    company: 'Apex Cloud SaaS',
    email: 'cmendoza@apexcloud.io',
    phone: '+57 320 123 4567',
    industry: 'SaaS',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    activeCampaignsCount: 1,
    createdAt: '2024-02-01',
  },
];

let INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp-101',
    clientId: 'cli-01',
    clientName: 'Nova Ecommerce SAS',
    title: '🔥 Cyber Monday Flash Sales',
    objective: 'Conversions',
    budget: 15000,
    spent: 12450,
    status: 'active',
    startDate: '2024-11-01',
    endDate: '2024-11-30',
    bannerUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    channels: [
      { id: 'ch-1', platform: 'Meta Ads', budgetAllocated: 8000, spent: 7100, sharePercentage: 53, performanceScore: 95 },
      { id: 'ch-2', platform: 'Google Ads', budgetAllocated: 5000, spent: 4000, sharePercentage: 33, performanceScore: 88 },
      { id: 'ch-3', platform: 'TikTok Ads', budgetAllocated: 2000, spent: 1350, sharePercentage: 14, performanceScore: 92 },
    ],
    metrics: { impressions: 1250400, clicks: 84200, conversions: 4120, ctr: 6.7, cpc: 0.15, roas: 5.2, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-102',
    clientId: 'cli-02',
    clientName: 'Apex Cloud SaaS',
    title: '📈 B2B Enterprise Leads',
    objective: 'Lead Generation',
    budget: 25000,
    spent: 18500,
    status: 'active',
    startDate: '2024-11-10',
    endDate: '2024-12-31',
    bannerUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    channels: [
      { id: 'ch-4', platform: 'LinkedIn Ads', budgetAllocated: 18000, spent: 13500, sharePercentage: 72, performanceScore: 91 },
      { id: 'ch-5', platform: 'Google Ads', budgetAllocated: 7000, spent: 5000, sharePercentage: 28, performanceScore: 84 },
    ],
    metrics: { impressions: 345000, clicks: 12400, conversions: 850, ctr: 3.5, cpc: 1.49, roas: 4.1, recordedAt: new Date().toISOString() },
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MarketingApi = {
  async getCampaigns(): Promise<Campaign[]> {
    await delay(300);
    const persisted = await StorageService.getCampaigns();
    if (persisted && persisted.length > 0) {
      INITIAL_CAMPAIGNS = persisted;
      return persisted;
    }
    await StorageService.saveCampaigns(INITIAL_CAMPAIGNS);
    return [...INITIAL_CAMPAIGNS];
  },

  async getClients(): Promise<Client[]> {
    await delay(200);
    return [...INITIAL_CLIENTS];
  },

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    await delay(400);
    const newCampaign: Campaign = { ...campaign, id: `cmp-${Date.now()}` };
    INITIAL_CAMPAIGNS = [newCampaign, ...INITIAL_CAMPAIGNS];
    await StorageService.saveCampaigns(INITIAL_CAMPAIGNS);
    return newCampaign;
  },

  async toggleCampaignStatus(id: string): Promise<Campaign> {
    await delay(200);
    const item = INITIAL_CAMPAIGNS.find((c) => c.id === id);
    if (!item) throw new Error('Campaña no encontrada');
    item.status = item.status === 'active' ? 'paused' : 'active';
    await StorageService.saveCampaigns(INITIAL_CAMPAIGNS);
    return { ...item };
  },
};