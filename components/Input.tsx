import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const Input = () => {

    const [inputText, setInputText] = useState('');

    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={newText => setInputText(newText)}
                value={inputText}
                placeholder="Enter text here"
            />
            <Text style={styles.displayText}>
                You entered: {inputText}
            </Text>
        </>
    );
};

export default Input;

const styles = StyleSheet.create({

    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 20,
    },
    displayText: {
        marginTop: 10,
        fontSize: 16,
    },
});