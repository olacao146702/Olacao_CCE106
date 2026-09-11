import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#123B5D',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '800',
        },

        tabBarActiveTintColor: '#123B5D',
        tabBarInactiveTintColor: '#8A96A3',

        tabBarStyle: {
          height: 65,
          paddingTop: 6,
          paddingBottom: 7,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E1E7EC',
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },

        tabBarPosition: 'bottom',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="settings-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}