import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';
import { CampaignDetailScreen } from '../screens/CampaignDetailScreen';
import { CreateCampaignScreen } from '../screens/CreateCampaignScreen';
import { darkTheme } from '../theme/colors';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: darkTheme.surface },
          headerTintColor: darkTheme.primary,
          headerTitleStyle: { fontWeight: '800', fontSize: 17, color: darkTheme.textPrimary },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: darkTheme.background },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CampaignDetail"
          component={CampaignDetailScreen}
          options={{ title: 'Detalle de Campaña' }}
        />
        <Stack.Screen
          name="CreateCampaign"
          component={CreateCampaignScreen}
          options={{ title: 'Nueva Campaña' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};