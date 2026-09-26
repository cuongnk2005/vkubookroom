import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, CalendarDays, UserRound } from 'lucide-react-native';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  // Dynamic bottom safe padding for gesture navigation bar on Android & Home indicator on iOS
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 8);
  const tabHeight = 62 + bottomInset;

  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: '#4F46E5',
      tabBarInactiveTintColor: '#94A3B8',
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        height: tabHeight,
        paddingBottom: bottomInset + 4,
        paddingTop: 8,
        elevation: 10,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      tabBarLabelStyle: {
        fontWeight: '700',
        fontSize: 11,
        marginTop: 2,
      },
      tabBarIconStyle: {
        marginTop: 2,
      },
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Browse',
          tabBarIcon: ({ color, focused }) => (
            <Search size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          )
        }} 
      />
      <Tabs.Screen 
        name="bookings" 
        options={{ 
          title: 'My Bookings',
          tabBarIcon: ({ color, focused }) => (
            <CalendarDays size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          )
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <UserRound size={22} color={color} strokeWidth={focused ? 2.5 : 2} />
          )
        }} 
      />
    </Tabs>
  );
}
