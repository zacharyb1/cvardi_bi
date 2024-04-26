import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Here is our app for SmartBi challenge!
        The stuff to do:
        1. integrate CV to the app/create a backend server which will process video (open app, chose video from gallery, analise it)
        2. make front-end using tsx format
        3. Create a backend server  
      </Text>
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
