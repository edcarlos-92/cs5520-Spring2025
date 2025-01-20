import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "My awesome app";

  // State to store the input data
  const [submittedText, setSubmittedText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Callback function to receive data from Input component
  const handleInputData = (text: string) => {
    setSubmittedText(text);
    setIsModalVisible(false); // Hide modal after submission
  };

  return (
    <View style={styles.container}>
      <Header appHeaderText={appName} />

      <Button
        title="Add a goal"
        onPress={() => setIsModalVisible(true)}
      />

      <Input
        autoFocusInput={true}
        inputHandler={handleInputData}
        visible={isModalVisible}

      />
      <Text >
        Submitted text: {submittedText}
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