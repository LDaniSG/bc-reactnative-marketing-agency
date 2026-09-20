export interface Campaign {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  channel: 'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  targetReach: string;
  imageUri: string;
  subtitle: string;
}

export interface CreateCampaignPayload {
  title: string;
  clientName: string;
  industry: string;
  channel: 'Meta Ads' | 'Google Search' | 'LinkedIn Ads' | 'TikTok Ads' | 'Email Marketing';
  budget: number;
  subtitle: string;
}
