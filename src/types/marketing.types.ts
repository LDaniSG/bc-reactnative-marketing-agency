export type IndustryType = 'E-commerce' | 'SaaS' | 'Real Estate' | 'Fashion' | 'Fintech';
export type CampaignObjective = 'Conversions' | 'Traffic' | 'Brand Awareness' | 'Lead Generation';
export type CampaignStatus = 'active' | 'paused' | 'completed' | 'draft';
export type ChannelPlatform = 'Meta Ads' | 'Google Ads' | 'TikTok Ads' | 'LinkedIn Ads' | 'Email Marketing';

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: IndustryType;
  avatarUrl: string;
  activeCampaignsCount: number;
  createdAt: string;
}

export interface Metric {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  recordedAt: string;
}

export interface Channel {
  id: string;
  platform: ChannelPlatform;
  budgetAllocated: number;
  spent: number;
  sharePercentage: number;
  performanceScore: number;
}

export interface Campaign {
  id: string;
  clientId: string;
  clientName: string;
  title: string;
  objective: CampaignObjective;
  budget: number;
  spent: number;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  bannerUrl: string;
  channels: Channel[];
  metrics: Metric;
}