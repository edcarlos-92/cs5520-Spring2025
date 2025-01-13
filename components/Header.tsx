import React from 'react'
import { View, Text } from 'react-native'

export default function Header(props: any) {

    // const appHeaderText = "My App Header";

    return (
        <View>

            <Text>Welcome to {props.appHeaderText}</Text>

        </View>
    )
}

