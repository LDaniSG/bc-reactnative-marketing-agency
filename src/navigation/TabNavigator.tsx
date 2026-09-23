import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ChannelsScreen } from '../screens/ChannelsScreen';
import { ClientsScreen } from '../screens/ClientsScreen';
import { darkTheme } from '../theme/colors';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: darkTheme.surface },
        headerTintColor: darkTheme.primary,
        headerTitleStyle: { fontWeight: '800', fontSize: 17, color: darkTheme.textPrimary },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: darkTheme.surface,
          borderTopColor: darkTheme.surfaceBorder,
          borderTopWidth: 1.5,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: darkTheme.primary,
        tabBarInactiveTintColor: darkTheme.textMuted,
        tabBarLabelStyle: { fontWeight: '700', fontSize: 11 },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardScreen}
        options={{
          title: '⚡ Marketing Agency Hub',
          tabBarLabel: 'Campañas',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 18 }}>{focused ? '🚀' : '📊'}</Text>,
        }}
      />
      <Tab.Screen
        name="ChannelsTab"
        component={ChannelsScreen}
        options={{
          title: '📡 Canales Publicitarios',
          tabBarLabel: 'Canales',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 18 }}>{focused ? '📡' : '📱'}</Text>,
        }}
      />
      <Tab.Screen
        name="ClientsTab"
        component={ClientsScreen}
        options={{
          title: '👤 Cartera de Clientes',
          tabBarLabel: 'Clientes',
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 18 }}>{focused ? '👤' : '🏢'}</Text>,
        }}
      />
    </Tab.Navigator>
  );
};