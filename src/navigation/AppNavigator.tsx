import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { LoginScreen } from '../screens/LoginScreen';
import { TabNavigator } from './TabNavigator';
import { CampaignDetailScreen } from '../screens/CampaignDetailScreen';
import { CreateCampaignScreen } from '../screens/CreateCampaignScreen';
import { darkTheme } from '../theme/colors';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: darkTheme.background }}>
        <ActivityIndicator size="large" color={darkTheme.primary} />
      </View>
    );
  }

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
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="CampaignDetail" component={CampaignDetailScreen} options={{ title: 'Detalle de Campaña' }} />
            <Stack.Screen name="CreateCampaign" component={CreateCampaignScreen} options={{ title: 'Nueva Campaña' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};