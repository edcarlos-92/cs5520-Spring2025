import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { auth } from "@/Firebase/firebaseSetup";
import LocationManager from "@/components/LocationManager";
import NotificationsManager from "@/components/NotificationsManager";

export default function Profile() {
    const user = auth.currentUser;

    return (
        <View style={styles.container}>
            <Text>{user?.email}</Text>
            <Text>{user?.uid}</Text>

            <LocationManager />

            <NotificationsManager />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});