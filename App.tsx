import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from '@/components/Header';
import Input from '@/components/Input';

export default function App() {
  const appName = "My first awesome mobile app";
  const appHeaderText = "This is my app header text";

  return (
    <View style={styles.container}>
      <Text>Welcome to {appName}</Text>
      <Header appHeaderText={appHeaderText} />
      <Input autoFocusInput={true} />
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