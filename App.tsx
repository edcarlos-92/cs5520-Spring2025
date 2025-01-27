import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  // const [submittedGoal, setSubmittedGoal] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [goals, setGoals] = useState<Goal[]>([]);

  const handleInputData = (text: string) => {
    // setSubmittedGoal(text);
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

        {/* <View style={styles.resultsSection}>
          {submittedGoal && <Text style={styles.submittedGoal}></Text>}
        </View> */}


        {/* <View style={styles.resultsSection}>
          {goals.map((goalObj) => (
            <View key={goalObj.id}>
              {goalObj.text && <Text style={styles.submittedGoal}>{goalObj.text}</Text>}
            </View>
          ))}
        </View> */}

        {/* <View style={styles.listResultSection}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {goals.map((goalObj) => (
              <View key={goalObj.id}>
                {goalObj.text && <Text style={styles.submittedGoal}>{goalObj.text}</Text>}
              </View>
            ))}
          </ScrollView>
        </View> */}



        {/* <View style={styles.listResultSection}>
          <FlatList
            data={goals}
            contentContainerStyle={styles.flatListView}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.submittedGoal}>{item.text}</Text>
              </View>
            )}
          />
        </View> */}



        <View style={styles.listResultSection}>
          <FlatList
            data={goals}
            contentContainerStyle={styles.flatListView}
            renderItem={({ item }) => <GoalItem goal={item} />}
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
  submittedGoal: {
    fontSize: 16,
    color: '#666',
    backgroundColor: '#f1f2b1',

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
    padding: 16,
    marginBottom: 10
    // marginTop: 50
  },

  listResultSection: {
    flex: 3, // Takes 3/5
    backgroundColor: '#fae7e6',
    width: '100%',
    // alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  scrollContent: {
    alignItems: 'center',
    // padding: 20,
    // width: '100%'
  },

  flatListView: {
    // marginLeft: 'auto',
    // marginRight: 'auto',
    alignItems: 'center',
    // width: '50%'
  },

});