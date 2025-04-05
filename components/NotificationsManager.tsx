import { View, Text, Button } from 'react-native'
import React from 'react'

import * as Notifications from "expo-notifications";



const NotificationsManager = () => {
    //verifypermission

    const verifyPermissions = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                alert("You need to grant permissions for the app to work");
                return false;
            }
            return true;
        }
        return true;
    };
    const scheduleNotificationHandler = async () => {

        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        console.log(`Scheduling Notification`);
        try {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: "Daily goal Reminder",
                    body: "Don't forget to add your daily Goal",
                    data: { data: "goes here" },
                },
                trigger: { seconds: 5, type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL },
            });
        }
        catch (err) {

            console.log(`Error In scheduling notification`, err);
        }
    };


    return (
        <View>

            <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />

        </View>
    )
}

export default NotificationsManager