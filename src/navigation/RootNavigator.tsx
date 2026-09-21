import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { ChannelsScreen } from '../screens/ChannelsScreen';
import { COLORS } from '../theme';
import type { HomeStackParamList, RootTabParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTitleStyle: { color: COLORS.textPrimary, fontWeight: '700' },
        headerTintColor: COLORS.primary,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="CampaignsList" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CampaignDetail" component={DetailScreen} options={({ route }) => ({ title: route.params.title })} />
    </Stack.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, height: 68, paddingBottom: 8, paddingTop: 8, elevation: 0 },
          tabBarActiveTintColor: COLORS.primaryDark,
          tabBarInactiveTintColor: COLORS.textMuted,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'cube-outline';
            if (route.name === 'CampaignsTab') iconName = 'megaphone-outline';
            else if (route.name === 'ChannelsTab') iconName = 'stats-chart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="CampaignsTab" component={HomeStackNavigator} options={{ tabBarLabel: 'Campañas' }} />
        <Tab.Screen name="ChannelsTab" component={ChannelsScreen} options={{ tabBarLabel: 'Canales' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
