import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => <Ionicons name="images-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="shopping-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="person"
        options={{
          title: 'Person',
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="bidDetail"
        options={{
          title: 'Bid Detail',
          href: null,
        }}
      />
      <Tabs.Screen
        name="bidList"
        options={{
          title: 'Bid List',
          href: null,
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: 'Bid List',
          href: null,
        }}
      />
      <Tabs.Screen
        name="editAccount"
        options={{
          title: 'Edit Accout',
          href: null,
        }}
      />
      <Tabs.Screen
        name="artworkDetail"
        options={{
          title: 'Artwork Detail',
          href: null,
        }}
      />
      <Tabs.Screen
        name="artList"
        options={{
          title: 'Artwork List',
          href: null,
        }}
      />
      <Tabs.Screen
        name="artistList"
        options={{
          title: 'Artist List',
          href: null,
        }}
      />
    </Tabs>
  );
}
