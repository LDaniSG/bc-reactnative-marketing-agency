import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
<<<<<<< HEAD
=======
import { AuthProvider } from './src/context/AuthContext';
>>>>>>> week-08
import { MarketingProvider } from './src/context/MarketingContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
<<<<<<< HEAD
      <MarketingProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </MarketingProvider>
=======
      <AuthProvider>
        <MarketingProvider>
          <StatusBar style="light" />
          <AppNavigator />
        </MarketingProvider>
      </AuthProvider>
>>>>>>> week-08
    </SafeAreaProvider>
  );
}