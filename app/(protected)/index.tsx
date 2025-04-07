import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import Header from "@/components/Header";
import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import GoalItem from "@/components/GoalItem";
import { writeToDB, deleteFromDB } from "@/Firebase/firestoreHelper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, database, storage } from "@/Firebase/firebaseSetup";
import PressableButton from "@/components/PressableButton";
import { GoalData, GoalFromDB, userInput } from "@/types";
import { ref, uploadBytesResumable } from "firebase/storage";
import { addNotificationReceivedListener, addNotificationResponseReceivedListener, getExpoPushTokenAsync, setNotificationHandler } from "expo-notifications";
import { router } from "expo-router";
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants";




//set the notification handler
setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }
  },
});

export default function App() {
  const appName = "My Awesome App";
  const [goals, setGoals] = useState<GoalFromDB[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState('');


  useEffect(() => {
    const subscription = addNotificationReceivedListener((notification) => {
      console.log("Notification received", notification);
    }
    );
    return () => {
      subscription.remove();
    }
  }, []);

  useEffect(() => {
    const subscription = addNotificationResponseReceivedListener((response) => {
      console.log("Notification response received", response);
      //extract data from response 
      //use linking API from react-native to navigate to the url

      const url = response.notification.request.content.data.url;
      if (url) {
        Linking.openURL(url);
      }

      // router.navigate("/");


    }
    );


    return () => subscription.remove();
  }, []);


  // useEffect(() => {
  //   const fetchToken = async () => {
  //     try {
  //       const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //       let finalStatus = existingStatus;

  //       if (existingStatus !== 'granted') {
  //         const { status } = await Notifications.requestPermissionsAsync();
  //         finalStatus = status;
  //       }

  //       if (finalStatus !== 'granted') {
  //         Alert.alert('Permission not granted', 'Please enable push notifications in your settings.');
  //         return;
  //       }

  //       const tokenInfo = await Notifications.getExpoPushTokenAsync();
  //       console.log('Token Info:=====', tokenInfo);
  //       setExpoPushToken(tokenInfo.data);
  //     } catch (err) {
  //       console.log('Error in fetching token:', err);
  //       Alert.alert('Error', 'Failed to fetch push token');
  //     }
  //   };

  //   fetchToken();
  // }, []);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Check if we have permission
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        // Request permission if not granted
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          Alert.alert('Permission not granted', 'Please enable push notifications in your settings.');
          return;
        }

        // Get project ID from Constants
        const projectId = Constants.expoConfig?.extra?.eas?.projectId;

        if (!projectId) {
          console.log('Project ID not found');
          Alert.alert('Configuration Issue', 'Missing project configuration for push notifications');
          return;
        }

        // Get push token with project ID
        const tokenInfo = await Notifications.getExpoPushTokenAsync({
          projectId: projectId
        });

        console.log('Token Info:', tokenInfo);
        setExpoPushToken(tokenInfo.data);
      } catch (err) {
        console.log('Error in fetching token:', err);
        Alert.alert('Error', 'Failed to fetch push token: ' + (err instanceof Error ? err.message : String(err)));
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    //start the listener on real time changes on goals collection
    if (!auth.currentUser) return;
    const unsubscribe = onSnapshot(
      // repace the next line with a query that checks for owner field:
      query(
        collection(database, "goals"),
        where("owner", "==", auth.currentUser?.uid)
      ),
      (querySnapshot) => {
        //check if the querySnapshot is empty
        if (querySnapshot.empty) {
          setGoals([]);
        } else {
          let newArrayOfGoals: GoalFromDB[] = [];
          querySnapshot.forEach((docSnapshot) => {
            newArrayOfGoals.push({
              ...(docSnapshot.data() as GoalData),
              id: docSnapshot.id,
            });
          });
          setGoals(newArrayOfGoals);
        }
      },
      (error) => {
        console.log("Error in getting goals", error);
      }
    );
    //return a cleanup function to stop the listener
    return () => {
      unsubscribe();
    };
  }, []);
  function handleDeleteGoal(deletedId: string) {
    //which goal was deleted?
    //I need to update the goals array by removing the goal
    //filter out the goal with the id that was passed

    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goalObj) => {
    //     return goalObj.id !== deletedId;
    //   });
    // });
    //delete from db
    //call the function from firestoreHelper
    deleteFromDB(deletedId, "goals");
  }


  async function handleInputData(data: userInput) {
    try {
      let storedImageUri;
      // this function will receive data from Input
      if (data.imageUri != undefined) {
        storedImageUri = await fetchImage(data.imageUri);
      }
      //store the data in the state variable
      // setReceivedData(data);
      //close the modal
      // define a variable of type Goal object
      let newGoal: GoalData = {
        text: data.text,
        owner: auth.currentUser ? auth.currentUser.uid : null,
      };
      if (storedImageUri) {
        newGoal.imageUri = storedImageUri;
      }
      // write to db by calling the functionf rom firestoreHelper
      writeToDB(newGoal, "goals");
      //update it with the data received from Input and a random number
      // add the object to the goals array
      // use updater function in setState whenever you are
      // updating the state based on the previous state
      // setGoals((currGoals) => {
      //   return [...currGoals, newGoal];
      // });
      setIsModalVisible(false);
    } catch (err) {
      console.log("handleInputData error", err);
    }
  }

  function dismissModal() {
    setIsModalVisible(false);
  }
  function deleteAll() {
    Alert.alert("Delete All", "Are you sure you want to delete all goals?", [
      {
        text: "Yes",
        onPress: () => {
          setGoals([]);
        },
      },
      { text: "No", style: "cancel" },
    ]);
  }



  async function fetchImage(uri: string) {
    try {
      // fetch the image data from the uri
      const response = await fetch(uri);
      if (!response.ok) {
        //e.g. a 404 error
        throw new Error("Image not found");
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("fetch image error", err);
    }
  }


  function testPushNotification() {

    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: expoPushToken,//ExponentPushToken[TFPJ9uAtD-LgEhl03OEAht]
        title: "Test Notification",
        body: "This is a test notification for my goals app",
        data: { url: "http://google.com" },
      }),
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topContainer}>
        <Header name={appName} />
        <Input
          textInputFocus={true}
          inputHandler={handleInputData}
          modalVisible={isModalVisible}
          dismissModal={dismissModal}
        />
        <PressableButton pressedHandler={() => setIsModalVisible(true)}>

          <Button title="Test Push Notification" onPress={() => testPushNotification()} />

          <Text style={styles.addGoalButton}>Add a Goal</Text>
        </PressableButton>
        {/* <Button title="Add a Goal" onPress={() => setIsModalVisible(true)} /> */}
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          ItemSeparatorComponent={({ highlighted }) => (
            <View
              style={{
                height: 5,
                backgroundColor: highlighted ? "purple" : "gray",
              }}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.header}>No goals to show</Text>
          }
          ListHeaderComponent={
            goals.length > 0 ? (
              <Text style={styles.header}>My Goals List</Text>
            ) : null
          }
          ListFooterComponent={
            goals.length ? (
              <Button title="Delete all" onPress={deleteAll} />
            ) : null
          }
          contentContainerStyle={styles.centeredHorizontal}
          data={goals}
          renderItem={({ item, separators }) => {
            //pass the received item to GoalItem component as a prop
            return (
              <GoalItem
                goalObj={item}
                deleteHandler={handleDeleteGoal}
                separators={separators}
              />
            );
          }}
        />
        {/* <ScrollView contentContainerStyle={styles.centeredHorizontal}>
          {goals.map((goalObj) => {
            return (
              <View key={goalObj.id}>
                <Text style={styles.text}>{goalObj.text} </Text>
              </View>
            );
          })}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: "#dcd",
    // alignItems: "center",
  },
  centeredHorizontal: {
    alignItems: "center",
  },
  header: {
    color: "indigo",
    fontSize: 25,
    marginTop: 10,
  },
  addGoalButton: {
    padding: 5,
    fontSize: 15,
    color: "white",
  },
});


