import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { GoalFromDB } from "@/app/index";
import PressableButton from "./PressableButton";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GoalItemProps {
    goalObj: GoalFromDB;
    deleteHandler: (deletedId: string) => void;
}
export default function GoalItem({ goalObj, deleteHandler }: GoalItemProps) {
    return (
        <Pressable
            android_ripple={styles.androidRipple}
            style={({ pressed }) => {
                return [styles.textContainer, pressed && styles.pressed];
            }}
            onPress={() => {
                router.navigate(`/goals/${goalObj.id}`);
            }}
        >
            <Text style={styles.text}>{goalObj.text} </Text>
            <PressableButton
                pressedHandler={() => {
                    //pass the id
                    deleteHandler(goalObj.id);
                }}
                pressedStyle={styles.pressed}
                componentStyle={styles.deleteIcon}
            >
                {/* <Text>x</Text> */}
                <Ionicons name="trash" size={24} color="black" />
            </PressableButton>
            {/* <Button
        title="X"
        onPress={() => {
          //pass the id
          deleteHandler(goalObj.id);
        }}
      /> */}
            {/* <Link asChild href={`/goals/${goalObj.id}`}> */}
            {/* <Button
        title="info"
        onPress={() => {
          router.navigate(`/goals/${goalObj.id}?sort="asc"`);
        }}
      /> */}
            {/* </Link> */}
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