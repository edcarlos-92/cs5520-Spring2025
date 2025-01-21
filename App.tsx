import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useState } from 'react';

export default function App() {
  const appName = "my awesome app";
  const [submittedText, setSubmittedText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleInputData = (text: string) => {
    setSubmittedText(text);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.headerSection}>
          <Header appHeaderText={appName} />
        </View>

        <View style={styles.buttonSection}>
          <View style={styles.buttonContainer}>
            <Button
              title="Add a goal"
              onPress={() => setIsModalVisible(true)}
            />
          </View>
        </View>

        <View style={styles.resultsSection}>
          <Text style={styles.submittedText}>
            Submitted goal: {submittedText}
          </Text>
        </View>

        <Input
          autoFocusInput={true}
          inputHandler={handleInputData}
          onCancel={handleCancel}
          visible={isModalVisible}
        />

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerSection: {
    flex: 1, // Takes 1/5
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 20,
    color: '#000',
    borderColor: '#000',
  },

  buttonSection: {
    flex: 1, // Takes 1/5
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsSection: {
    flex: 3, // Takes 3/5
    backgroundColor: '#fae7e6',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '30%',
  },
  submittedText: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '90%',
    textAlign: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

});