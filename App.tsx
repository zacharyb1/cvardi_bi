import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Here is our app for SmartBi challenge!</Text>
      <Text>The stuff to do:</Text>
      <Text>1. Integrate CV to the app/create a backend server {"\n"} which will process video  {"\n"}(open app, chose video from gallery, analyse it)</Text>
      <Text>2. Make front-end using tsx format</Text>
      <Text>3. Create a backend server</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
