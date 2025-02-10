import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import { GoalFromDB } from "@/app";

interface GoalItemProps {
    goalObj: GoalFromDB;
    deleteHandler: (deletedId: string) => void;
}
export default function GoalItem({ goalObj, deleteHandler }: GoalItemProps) {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>{goalObj.text} </Text>
            <Button
                title="X"
                onPress={() => {
                    //pass the id
                    deleteHandler(goalObj.id);
                }}
            />
            {/* <Link asChild href={`/goals/${goalObj.id}`}> */}
            <Button
                title="info"
                onPress={() => {
                    router.navigate(`/goals/${goalObj.id}?sort="asc"`);
                }}
            />
            {/* </Link> */}
        </View>
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
});