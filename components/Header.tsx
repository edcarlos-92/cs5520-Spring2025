import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HeaderProps {
    appHeaderText: string;
}

export default function Header(props: HeaderProps) {

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{`Welcome to ${props.appHeaderText}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        borderWidth: 2,
        borderColor: 'purple',
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'purple',
    }
});