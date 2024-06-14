import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MovieDetail = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Detail Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 20,
    fontSize: 24,
  },
});

export default MovieDetail;
