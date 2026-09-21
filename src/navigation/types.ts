import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  CampaignsList: undefined;
  CampaignDetail: { id: string; title: string };
  CreateCampaign: undefined;
};

export type RootTabParamList = {
  CampaignsTab: NavigatorScreenParams<HomeStackParamList>;
  SavedTab: undefined;
  ChannelsTab: undefined;
};

export type CampaignsListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'CampaignsList'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type CampaignDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'CampaignDetail'>,
  BottomTabScreenProps<RootTabParamList>
>;

export type ChannelsScreenProps = BottomTabScreenProps<RootTabParamList, 'ChannelsTab'>;

export type SavedScreenProps = BottomTabScreenProps<RootTabParamList, 'SavedTab'>;
export type CreateCampaignScreenProps = NativeStackScreenProps<HomeStackParamList, 'CreateCampaign'>;
