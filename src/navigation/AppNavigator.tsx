import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importaciones con ruta directa
import { DashboardScreen } from '../screens/DashboardScreen';
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
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: darkTheme.background },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: '⚡ Marketing Agency Hub' }}
        />
        <Stack.Screen
          name="CampaignDetail"
          component={CampaignDetailScreen}
          options={{ title: 'Detalle de Campaña' }}
        />
        <Stack.Screen
          name="CreateCampaign"
          component={CreateCampaignScreen}
          options={{ title: 'Lanzar Campaña' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};