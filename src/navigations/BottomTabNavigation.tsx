import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStackNavigation from './HomeStackNavigation';
import SearchStackNavigation from './SearchStackParamList'; // Impor SearchStackNavigation
import FavoriteStackNavigation from './FavoriteStackNavigation';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (): JSX.Element => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeStack"
      component={HomeStackNavigation}
      options={{
        tabBarIcon: ({ color }) => <Feather name="home" size={28} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="SearchStack" // Ganti nama menjadi "SearchStack"
      component={SearchStackNavigation} // Gunakan SearchStackNavigation
      options={{
        tabBarIcon: ({ color }) => <Feather name="search" size={28} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="FavoriteStack"
      component={FavoriteStackNavigation}
      options={{
        tabBarIcon: ({ color }) => <Feather name="heart" size={28} color={color} />,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
