import { Campaign, Client } from '../types/marketing.types';

const INITIAL_CLIENTS: Client[] = [
  { id: 'cli-01', name: 'Valeria Gómez', company: 'Nova Ecommerce', email: 'valeria@novashop.com', phone: '+57 310 987 6543', industry: 'E-commerce', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', activeCampaignsCount: 3, createdAt: '2024-01-15' },
  { id: 'cli-02', name: 'Carlos Mendoza', company: 'Apex Cloud SaaS', email: 'cmendoza@apexcloud.io', phone: '+57 320 123 4567', industry: 'SaaS', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', activeCampaignsCount: 2, createdAt: '2024-02-01' },
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
    clientName: 'Apex Cloud',
    title: '📈 B2B Enterprise Leads',
    objective: 'Lead Generation',
    budget: 25000,
    spent: 8500,
    status: 'active',
    startDate: '2024-11-10',
    endDate: '2024-12-31',
    bannerUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    channels: [
      { id: 'ch-4', platform: 'LinkedIn Ads', budgetAllocated: 18000, spent: 6500, sharePercentage: 72, performanceScore: 91 },
      { id: 'ch-5', platform: 'Google Ads', budgetAllocated: 7000, spent: 2000, sharePercentage: 28, performanceScore: 78 },
    ],
    metrics: { impressions: 345000, clicks: 12400, conversions: 850, ctr: 3.5, cpc: 0.68, roas: 4.1, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-103',
    clientId: 'cli-03',
    clientName: 'Urban Fitness Pro',
    title: '💪 Reto Verano 30 Días',
    objective: 'Brand Awareness',
    budget: 5000,
    spent: 4950,
    status: 'completed',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    channels: [
      { id: 'ch-6', platform: 'Meta Ads', budgetAllocated: 3000, spent: 3000, sharePercentage: 60, performanceScore: 85 },
      { id: 'ch-7', platform: 'TikTok Ads', budgetAllocated: 2000, spent: 1950, sharePercentage: 40, performanceScore: 98 },
    ],
    metrics: { impressions: 2100000, clicks: 154000, conversions: 1200, ctr: 7.3, cpc: 0.03, roas: 3.8, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-104',
    clientId: 'cli-04',
    clientName: 'Fintech Wallet',
    title: '🚀 App Installs Campaign',
    objective: 'Traffic',
    budget: 12000,
    spent: 3200,
    status: 'active',
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    bannerUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    channels: [
      { id: 'ch-8', platform: 'Google Ads', budgetAllocated: 8000, spent: 2100, sharePercentage: 66, performanceScore: 89 },
      { id: 'ch-9', platform: 'Meta Ads', budgetAllocated: 4000, spent: 1100, sharePercentage: 34, performanceScore: 82 },
    ],
    metrics: { impressions: 580000, clicks: 42000, conversions: 3100, ctr: 7.2, cpc: 0.07, roas: 2.9, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-105',
    clientId: 'cli-05',
    clientName: 'Luxury Real Estate',
    title: '🏢 Miami Condos Retargeting',
    objective: 'Lead Generation',
    budget: 30000,
    spent: 15000,
    status: 'paused',
    startDate: '2024-10-01',
    endDate: '2024-12-01',
    bannerUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    channels: [
      { id: 'ch-10', platform: 'Meta Ads', budgetAllocated: 20000, spent: 11000, sharePercentage: 66, performanceScore: 70 },
      { id: 'ch-11', platform: 'Email Marketing', budgetAllocated: 10000, spent: 4000, sharePercentage: 34, performanceScore: 85 },
    ],
    metrics: { impressions: 120000, clicks: 8000, conversions: 45, ctr: 6.6, cpc: 1.87, roas: 8.5, recordedAt: new Date().toISOString() },
  }
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

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    await delay(700);
    const newCampaign: Campaign = {
      ...campaign,
      id: `cmp-${Date.now()}`,
    };
    INITIAL_CAMPAIGNS = [newCampaign, ...INITIAL_CAMPAIGNS];
    return newCampaign;
  },

  async toggleCampaignStatus(id: string): Promise<Campaign> {
    await delay(300);
    const item = INITIAL_CAMPAIGNS.find((c) => c.id === id);
    if (!item) throw new Error('Campaña no encontrada');
    item.status = item.status === 'active' ? 'paused' : 'active';
    return { ...item };
  },
};