import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { LocationData } from "@/types";
import { router, useLocalSearchParams } from "expo-router";

export default function map() {
    const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
        null
    );


    const params = useLocalSearchParams();
    // if (params) update the location state variable
    console.log(`params in map: ${params}`);

    useEffect(() => {
        if (params.latitude && params.longitude) {
            //check if params is not empty {}
            setSelectedLocation({
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


    function confirmLocationHandler() {
        // send the selectedLocation to the profile screen
        // router.navigate(
        //   `profile?latitude=${selectedLocation?.latitude}&longitude=${selectedLocation?.longitude}`
        // );
        router.navigate({
            pathname: "profile",
            params: {
                latitude: selectedLocation?.latitude,
                longitude: selectedLocation?.longitude,
            },
        });
    }
    return (
        <>
            <MapView
                style={styles.mapView}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                // the first time the user taps on the map, the selectedLocation is set but marker not shown?????
                onPress={(e) => {
                    setSelectedLocation({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                    });
                }}
            >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>
            <Button
                disabled={!selectedLocation}
                title="Confirm Location"
                onPress={confirmLocationHandler}
            />
        </>
    );
}

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
});