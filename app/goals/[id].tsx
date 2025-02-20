import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { GoalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<GoalData | null>(null);
    const [warning, setWarning] = useState(false);
    //   const navigation = useNavigation();

    useEffect(() => {
        async function getData() {
            try {
                const data = (await readDocFromDB(id, "goals")) as GoalData;
                if (data != null) {
                    if (data?.warning) {
                        setWarning(true);
                    }
                    setGoal(data);
                    //   navigation.setOptions({ headerTitle: data.text });
                }
            } catch (e) {
                console.log("get data in GoalDetails", e);
            }
        }
        getData();
    }, []);
    function warningHandler() {
        setWarning(true);
        updateDB(id, "goals", { warning: true });
    }
    return (
        <View>
            <Stack.Screen
                options={{
                    headerTitle: goal ? (warning ? "warning" : goal.text) : "",
                    // headerRight: () => {
                    //     return <Button title="Warning" onPress={warningHandler} />;
                    // },

                    headerRight: () => {
                        return (
                            <Pressable onPressIn={warningHandler}>
                                <Text style={{ color: 'white', marginRight: 10 }}>Warning</Text>
                            </Pressable>
                        )
                    }


                }}
            />
            <Text style={warning && styles.warningText}>Details of {goal?.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    warningText: { color: "red" },
});