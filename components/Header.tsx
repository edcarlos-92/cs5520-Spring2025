import React from 'react'
import { View, Text } from 'react-native'

interface HeaderProps {
    appHeaderText: string;
}

export default function Header(props: HeaderProps) {

    return (
        <View>

            <Text>Welcome to {props.appHeaderText}</Text>

        </View>
    )
}

