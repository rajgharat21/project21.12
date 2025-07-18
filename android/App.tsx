import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { LanguageProvider } from './src/contexts/LanguageContext';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RationCardScreen from './src/screens/RationCardScreen';
import ApplicationsScreen from './src/screens/ApplicationsScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import HeaderComponent from './src/components/HeaderComponent';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'RationCard') {
            iconName = 'credit-card';
          } else if (route.name === 'Applications') {
            iconName = 'description';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
        header: () => <HeaderComponent />,
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="RationCard" component={RationCardScreen} />
      <Tab.Screen name="Applications" component={ApplicationsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
          <AppContent />
        </SafeAreaView>
      </AuthProvider>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});

export default App;