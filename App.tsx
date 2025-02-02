import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, SafeAreaView, StyleSheet, View, Text, Alert } from 'react-native';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { useState } from 'react';
import GoalItem from '@/components/GoalItem';

export interface Goal {
  text: string;
  id: number;
}

export default function App() {
  const appName = "my awesome app";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);

  const handleInputData = (text: string) => {
    setIsModalVisible(false);
    let newGoal: Goal = {
      text: text,
      id: Math.random()
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteGoal = (deletedId: number) => {
    setGoals(prevGoals => prevGoals.filter(goal => goal.id !== deletedId));
  };

  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => setGoals([])
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topSection}>
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
        </View>

        <View style={styles.listSection}>
          <FlatList
            data={goals}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <GoalItem goal={item} onDelete={handleDeleteGoal} />
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No goals to show</Text>
            }
            ListHeaderComponent={
              goals.length > 0 ? (
                <Text style={styles.listHeader}>My Goals</Text>
              ) : null
            }
            ListFooterComponent={
              goals.length > 0 ? (
                <View style={styles.footerContainer}>
                  <Button title="Delete All" onPress={handleDeleteAll} color="red" />
                </View>
              ) : null
            }
            ItemSeparatorComponent={() => (
              <View style={styles.separator} />
            )}
          />
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    paddingVertical: 16,
  },
  headerSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 40
  },
  buttonSection: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  buttonContainer: {
    width: '30%',
  },
  listSection: {
    flex: 1,
    backgroundColor: '#fae7e6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  flatListContent: {
    width: '100%',
  },
  itemContainer: {
    width: '100%',
  },
  emptyText: {
    fontSize: 16,
    color: 'purple',
    textAlign: 'center',
    marginTop: 20,
  },
  listHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginBottom: 16,
  },
  footerContainer: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
  },
  separator: {
    height: 5,
    backgroundColor: '#ccc',
    width: '45%',
    marginVertical: 8,
    alignSelf: 'center',
  },
});