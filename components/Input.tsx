import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';


// Define the props interface
interface InputProps {
    autoFocusInput?: boolean;
    inputHandler: (text: string) => void;
}


const Input = ({ autoFocusInput = false, inputHandler }: InputProps) => {
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(autoFocusInput);
    const [hasBlurred, setHasBlurred] = useState(false);

    const handleBlur = () => {
        setIsFocused(false);
        setHasBlurred(true);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setHasBlurred(false);
    };


    // Event handler function for the Confirm button
    const handleConfirm = () => {
        console.log('User entered:', inputText);
        inputHandler(inputText);
    };




    return (
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                onChangeText={newText => setInputText(newText)}
                value={inputText}
                placeholder="Enter text here"
                autoFocus={autoFocusInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
            />

            {/* Character count - only show when focused and text exists */}
            {isFocused && inputText.length > 0 && (
                <Text style={styles.countText}>
                    Characters: {inputText.length}
                </Text>
            )}

            {/* Feedback message - only show after blur ie. When user presses Enter/Done */}
            {hasBlurred && !isFocused && (
                <Text style={[
                    styles.feedbackText,
                    inputText.length >= 3 ? styles.successText : styles.errorText
                ]}>
                    {inputText.length >= 3
                        ? "Thank you"
                        : "Please type more than 3 characters"}
                </Text>
            )}

            <Button
                title="Confirm"
                onPress={handleConfirm}
            />

        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 20,
    },
    countText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    feedbackText: {
        fontSize: 16,
        marginTop: 10,
        color: '#333',
    },
    successText: {
        color: 'green',
    },
    errorText: {
        color: 'red',
    }
});