import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MovieDetail(): JSX.Element {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Text>Movie Detail</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
