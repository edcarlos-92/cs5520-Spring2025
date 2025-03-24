import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";
import LocationManager from "@/components/LocationManager";

export default function Profile() {
    const user = auth.currentUser;

    return (
        <View style={styles.container}>
            <Text>{user?.email}</Text>
            <Text>{user?.uid}</Text>

            <LocationManager />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});