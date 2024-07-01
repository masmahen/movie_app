import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import MovieDetail from '../screens/MovieDetail';

export type FavoriteStackParamList = {
  Favorite: undefined;
  MovieDetail: { id: number };
};

const Stack = createNativeStackNavigator<FavoriteStackParamList>();

const FavoriteStackNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorite" component={Favorite} />
    <Stack.Screen name="MovieDetail" component={MovieDetail} />
  </Stack.Navigator>
);

export default FavoriteStackNavigation;
