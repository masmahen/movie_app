import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import MovieDetail from '../screens/MovieDetail';

export type SearchStackParamList = {
  Search: undefined;
  MovieDetail: { id: number };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchStackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Search" component={Search} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
);

export default SearchStackNavigation;
