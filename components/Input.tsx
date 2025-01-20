import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Modal } from 'react-native';


// Define the props interface
interface InputProps {
    autoFocusInput?: boolean;
    inputHandler: (text: string) => void;
    visible: boolean;
}


const Input = ({ autoFocusInput = false, inputHandler, visible }: InputProps) => {
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
        setInputText(''); // Clear input after submission
    };


    return (

        <Modal

            visible={visible}
            animationType="slide"
            transparent={true}
        >

            <View style={styles.container}>

                <View style={styles.card}>

                    <Text style={styles.label}>
                        Add Your Goal
                    </Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={newText => setInputText(newText)}
                        value={inputText}
                        placeholder="Enter your goal here"
                        autoFocus={autoFocusInput}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />

                    {/* Character count - only show when focused and text exists */}
                    {isFocused && inputText.length > 0 && (
                        <Text style={styles.displayText}>
                            Characters: {inputText.length}
                        </Text>
                    )}

                    {/* Feedback message - only show after blur ie. When user presses Enter/Done */}
                    {hasBlurred && !isFocused && (
                        <Text style={[
                            styles.feedbackText,
                            styles.displayText,
                            inputText.length >= 3 ? styles.successText : styles.errorText
                        ]}>
                            {inputText.length >= 3
                                ? "Thank you"
                                : "Please type more than 3 characters"}
                        </Text>
                    )}



                    <View style={styles.buttonContainer}>
                        <Button
                            title="Confirm"
                            onPress={handleConfirm}
                        />
                    </View>

                </View>


            </View>




        </Modal>



    );
};

export default Input;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // No background color anymore
    },

    // input: {
    //     height: 40,
    //     width: '80%',
    //     borderWidth: 1,
    //     borderColor: '#ccc',
    //     borderRadius: 5,
    //     padding: 10,
    //     marginVertical: 20,
    // },

    input: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#2196F3',
        borderRadius: 8,
        padding: 16,
        marginVertical: 16,
        fontSize: 16,
        backgroundColor: '#F5F5F5',
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
    },

    card: {
        backgroundColor: '#fff',
        width: '80%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },

    displayText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '30%',
        marginVertical: 16,
    },

});