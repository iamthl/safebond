import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootTabParamList } from './types/navigation';

import HomeScreen from './screens/HomeScreen';
import ProtectionScreen from './screens/ProtectionScreen';
import ThreatsScreen from './screens/ThreatsScreen';
import ConnectionsScreen from './screens/ConnectionsScreen';
import SettingsScreen from './screens/SettingsScreen';
import PricingScreen from './screens/PricingScreen';

import CustomBottomTabBar from './components/BottomTabBar';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          tabBar={(props) => <CustomBottomTabBar {...props} />}
          screenOptions={{
            headerShown: false, 
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Protection" component={ProtectionScreen} />
          <Tab.Screen name="Threats" component={ThreatsScreen} />
          <Tab.Screen name="Connections" component={ConnectionsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
          <Tab.Screen name="Pricing" component={PricingScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
