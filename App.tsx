import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import Header from './components/Header';
import Input from './components/Input';

export default function App() {

  const appName = "My first awesome mobile app";
  const appHeaderText = "This is my app header";

  // const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <Text>Welcome to {appName}</Text>
      <Header appHeaderText={appHeaderText} />

      <Input />

      {/* <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Enter some text..."
      />

      <Text style={styles.displayText}>
        You entered: {inputText}
      </Text> */}

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
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  displayText: {
    marginTop: 10,
    fontSize: 16,
  },
});