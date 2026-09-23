import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MarketingProvider } from './src/context/MarketingContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <MarketingProvider>
        <StatusBar style="light" />
        <AppNavigator />
      </MarketingProvider>
    </SafeAreaProvider>
  );
}