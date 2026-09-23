import { Campaign, Client } from '../types/marketing.types';

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
  {
    id: 'cli-03',
    name: 'Lucía Fernández',
    company: 'Urban Fitness Pro',
    email: 'lucia@urbanfitness.com',
    phone: '+57 300 456 7890',
    industry: 'Fashion',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200',
    activeCampaignsCount: 1,
    createdAt: '2024-03-10',
  },
  {
    id: 'cli-04',
    name: 'Mateo Ortiz',
    company: 'Fintech Pay App',
    email: 'mateo@fintechpay.co',
    phone: '+57 315 678 1234',
    industry: 'Fintech',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    activeCampaignsCount: 1,
    createdAt: '2024-04-05',
  },
  {
    id: 'cli-05',
    name: 'Elena Rostova',
    company: 'Miami Luxury Realty',
    email: 'elena@miamiluxury.com',
    phone: '+1 305 890 1234',
    industry: 'Real Estate',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    activeCampaignsCount: 1,
    createdAt: '2024-05-20',
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
  {
    id: 'cmp-103',
    clientId: 'cli-03',
    clientName: 'Urban Fitness Pro',
    title: '💪 Reto Verano 30 Días',
    objective: 'Brand Awareness',
    budget: 8000,
    spent: 7950,
    status: 'paused', // <--- Estado ajustado a 'paused' para coherencia con filtros
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
    channels: [
      { id: 'ch-6', platform: 'Meta Ads', budgetAllocated: 5000, spent: 5000, sharePercentage: 62, performanceScore: 85 },
      { id: 'ch-7', platform: 'TikTok Ads', budgetAllocated: 3000, spent: 2950, sharePercentage: 38, performanceScore: 98 },
    ],
    metrics: { impressions: 2100000, clicks: 154000, conversions: 1200, ctr: 7.3, cpc: 0.05, roas: 3.8, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-104',
    clientId: 'cli-04',
    clientName: 'Fintech Pay App',
    title: '🚀 App Installs Campaign',
    objective: 'Traffic',
    budget: 18000,
    spent: 9200,
    status: 'active',
    startDate: '2024-11-15',
    endDate: '2024-12-15',
    bannerUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    channels: [
      { id: 'ch-8', platform: 'Google Ads', budgetAllocated: 12000, spent: 6100, sharePercentage: 66, performanceScore: 89 },
      { id: 'ch-9', platform: 'Meta Ads', budgetAllocated: 6000, spent: 3100, sharePercentage: 34, performanceScore: 82 },
    ],
    metrics: { impressions: 580000, clicks: 42000, conversions: 3100, ctr: 7.2, cpc: 0.21, roas: 3.1, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-105',
    clientId: 'cli-05',
    clientName: 'Miami Luxury Realty',
    title: '🏢 Luxury Condos Retargeting',
    objective: 'Lead Generation',
    budget: 35000,
    spent: 15000,
    status: 'paused',
    startDate: '2024-10-01',
    endDate: '2024-12-01',
    bannerUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    channels: [
      { id: 'ch-10', platform: 'Meta Ads', budgetAllocated: 25000, spent: 11000, sharePercentage: 71, performanceScore: 75 },
      { id: 'ch-11', platform: 'Email Marketing', budgetAllocated: 10000, spent: 4000, sharePercentage: 29, performanceScore: 88 },
    ],
    metrics: { impressions: 120000, clicks: 8000, conversions: 65, ctr: 6.6, cpc: 1.87, roas: 6.5, recordedAt: new Date().toISOString() },
  },
  {
    id: 'cmp-106',
    clientId: 'cli-01',
    clientName: 'Nova Ecommerce SAS',
    title: '🎄 Navidades & Regalos 2024',
    objective: 'Conversions',
    budget: 20000,
    spent: 4200,
    status: 'active',
    startDate: '2024-11-20',
    endDate: '2024-12-25',
    bannerUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
    channels: [
      { id: 'ch-12', platform: 'Meta Ads', budgetAllocated: 12000, spent: 2500, sharePercentage: 60, performanceScore: 94 },
      { id: 'ch-13', platform: 'TikTok Ads', budgetAllocated: 8000, spent: 1700, sharePercentage: 40, performanceScore: 91 },
    ],
    metrics: { impressions: 410000, clicks: 31000, conversions: 1450, ctr: 7.5, cpc: 0.13, roas: 4.9, recordedAt: new Date().toISOString() },
  }
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const MarketingApi = {
  async getCampaigns(): Promise<Campaign[]> {
    await delay(400);
    return [...INITIAL_CAMPAIGNS];
  },

  async getClients(): Promise<Client[]> {
    await delay(300);
    return [...INITIAL_CLIENTS];
  },

  async createCampaign(campaign: Omit<Campaign, 'id'>): Promise<Campaign> {
    await delay(500);
    const newCampaign: Campaign = {
      ...campaign,
      id: `cmp-${Date.now()}`,
    };
    INITIAL_CAMPAIGNS = [newCampaign, ...INITIAL_CAMPAIGNS];
    return newCampaign;
  },

  async toggleCampaignStatus(id: string): Promise<Campaign> {
    await delay(200);
    const item = INITIAL_CAMPAIGNS.find((c) => c.id === id);
    if (!item) throw new Error('Campaña no encontrada');
    item.status = item.status === 'active' ? 'paused' : 'active';
    return { ...item };
  },
};