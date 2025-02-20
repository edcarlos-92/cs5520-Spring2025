import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { GoalData, readDocFromDB, updateDB } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function GoalDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [goal, setGoal] = useState<GoalData | null>(null);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const data = (await readDocFromDB(id, "goals")) as GoalData;
                if (data != null) {
                    if (data?.warning) {
                        setWarning(true);
                    }
                    setGoal(data);
                }
            } catch (e) {
                console.log("get data in GoalDetails", e);
            }
        }
        getData();
    }, []);

    function warningHandler() {
        console.log("warning handler");
        setWarning(true);
        updateDB(id, "goals", { warning: true });
    }

    return (
        <View>
            <Stack.Screen
                options={{
                    headerTitle: goal ? (warning ? "warning" : goal.text) : "",
                    headerRight: () => (
                        <View style={styles.headerButton}>
                            <PressableButton
                                pressedHandler={() => { }}
                                pressedInHandler={warningHandler}
                                componentStyle={styles.warningButton}
                            >
                                <Ionicons name="warning" size={24} color="white" />
                            </PressableButton>
                        </View>
                    ),
                }}
            />
            <Text style={warning ? styles.warningText : undefined}>Details of {goal?.text}</Text>

            <View style={styles.addMorecontainer}>

                <PressableButton
                    pressedHandler={() => { }}
                    componentStyle={styles.moreDetailsButtonContainer}
                >
                    <Text style={styles.moreDetailsButton}>More Details</Text>
                </PressableButton>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    warningText: {
        color: "red"
    },
    headerButton: {
        marginRight: 10
    },
    warningButton: {
        backgroundColor: 'transparent',
        padding: 8
    },
    moredetailsButton: {
        color: "blue",
    },
    moreDetailsButtonContainer: {
        backgroundColor: 'purple',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    moreDetailsButton: {
        color: 'white',
        fontSize: 16,
    },
    addMorecontainer: {
        alignItems: 'center',
        padding: 20,
    },
});