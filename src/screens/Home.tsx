import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import HomeStackNavigation from '../navigations/HomeStackNavigation';

export default function Home(): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Text>Home</Text>
      {/* <HomeStackNavigation /> */}
      <Button
        title="Go to Movie Detail"
        onPress={() => navigation.navigate('MovieDetail')}
      />
    </View>
  );
}
