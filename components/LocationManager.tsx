import {
    Alert,
    Button,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
} from "expo-location";
import { LocationData } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { readDocFromDB, writeToDB } from "@/Firebase/firestoreHelper";
import { auth } from "@/Firebase/firebaseSetup";

export default function LocationManager() {
    const params = useLocalSearchParams();

    const [permissionResponse, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState<LocationData | null>(null);
    // if (params) update the location state variable
    console.log("params :", params);
    useEffect(() => {
        if (params.latitude && params.longitude) {
            //check if params is not empty {}
            setLocation({
                latitude: parseFloat(
                    Array.isArray(params.latitude) ? params.latitude[0] : params.latitude
                ),
                longitude: parseFloat(
                    Array.isArray(params.longitude)
                        ? params.longitude[0]
                        : params.longitude
                ),
            });
        }
    }, []);


    useEffect(() => {
        console.log("auth.currentUser", auth?.currentUser?.uid);
        async function fetchUserData() {
            if (auth?.currentUser?.uid) {

                try {
                    const data = await readDocFromDB(auth.currentUser.uid, "users");
                    console.log("data", data);
                    if (data) {
                        setLocation({
                            latitude: parseFloat(data.address.geo.lat),
                            longitude: parseFloat(data.address.geo.lng),
                        });
                    }
                } catch (e) {
                    console.log("Error in fetching user data", e);

                }

            }
        }
        fetchUserData();
    }, []);

    async function verifyPermission() {
        try {
            if (permissionResponse?.status === "granted") {
                return true;
            }
            const responseFromUser = await requestPermission();
            return responseFromUser.granted;
        } catch (e) {
            console.log("Error in verifyPermission", e);
        }
    }
    async function locateUserHandler() {
        try {
            const hasPermission = verifyPermission();
            if (!hasPermission) {
                Alert.alert("You need to give permission to access location");
                return;
            }
            // only continue if hasPermission is true
            const response = await getCurrentPositionAsync();
            setLocation({
                latitude: response.coords.latitude,
                longitude: response.coords.longitude,
            });
        } catch (e) {
            console.log("Error in getting location", e);
        }
    }
    function chooseLocationHandler() {
        // navigate to the map screen
        router.navigate("map");
    }
    if (location)
        console.log(
            `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIKey}`
        );
    return (
        <View>
            <Button title="Find My Location" onPress={locateUserHandler} />
            <Button
                title="Let me choose on the map"
                onPress={chooseLocationHandler}
            />
            {location && (
                <Image
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location?.latitude},${location?.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_mapsAPIKey}`,
                    }}
                    style={styles.map}
                />
            )}

            <Button
                disabled={!location}
                title="Save location to firebases" onPress={() => writeToDB({
                    address: {
                        geo: {
                            lat: location?.latitude.toString(),
                            lng: location?.longitude.toString(),
                        },
                    },
                }, "users", auth.currentUser?.uid)} />




        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: 200,
        marginTop: 10,
    },
});