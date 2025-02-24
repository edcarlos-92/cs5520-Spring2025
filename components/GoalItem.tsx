import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { GoalFromDB } from "@/app/index";
import PressableButton from "./PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GoalItemProps {
    goalObj: GoalFromDB;
    deleteHandler: (deletedId: string) => void;
    separators: {
        highlight: () => void;
        unhighlight: () => void;
    };
}

export default function GoalItem({ goalObj, deleteHandler, separators }: GoalItemProps) {
    const handleLongPress = () => {
        Alert.alert(
            "Delete Goal",
            "Are you sure you want to delete this goal?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => deleteHandler(goalObj.id),
                    style: 'destructive'
                }
            ]
        );
    };

    return (
        <Pressable
            android_ripple={styles.androidRipple}
            style={({ pressed }) => {
                return [styles.textContainer, pressed && styles.pressed];
            }}
            onPress={() => {
                separators.highlight();
                router.navigate(`/goals/${goalObj.id}`);
            }}
            onPressOut={() => {
                separators.unhighlight();
            }}
            onLongPress={handleLongPress}
        >
            <Text style={styles.text}>{goalObj.text}</Text>
            <PressableButton
                pressedHandler={() => {
                    deleteHandler(goalObj.id);
                }}
                pressedStyle={styles.pressed}
                componentStyle={styles.deleteIcon}
            >
                <Ionicons name="trash" size={24} color="black" />
            </PressableButton>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: "row",
        borderRadius: 5,
        backgroundColor: "#aaa",
        padding: 10,
        alignItems: "center",
        marginVertical: 10,
    },
    text: {
        color: "purple",
        fontSize: 20,
    },
    pressed: {
        backgroundColor: "grey",
        opacity: 0.5,
    },
    androidRipple: { color: "red" },
    deleteIcon: {
        backgroundColor: "#aaa",
    },
});