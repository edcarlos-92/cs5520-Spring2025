import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Button, Modal, Alert, Image } from 'react-native';

interface InputProps {
    autoFocusInput?: boolean;
    inputHandler: (text: string) => void;
    onCancel: () => void;
    visible: boolean;
}

const Input = ({ autoFocusInput = false, inputHandler, onCancel, visible }: InputProps) => {
    const [inputText, setInputText] = useState('');
    const [isFocused, setIsFocused] = useState(autoFocusInput);
    const [hasBlurred, setHasBlurred] = useState(false);
    const REQ_MIN_CHARS = 3;

    const handleBlur = () => {
        setIsFocused(false);
        setHasBlurred(true);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setHasBlurred(false);
    };

    const handleConfirm = () => {
        console.log('User entered:', inputText);
        inputHandler(inputText);
        setInputText(''); // Clear input after confirmation
    };

    const handleCancelPress = () => {
        Alert.alert(
            "Cancel Goal Entry",
            "Are you sure you want to cancel?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        setInputText(''); // Clear input
                        onCancel(); // Dismiss modal
                    }
                }
            ]
        );
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

                    {/* Network Image */}
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
                        style={styles.image}
                        // alt prop provides alternative text for accessibility purposes
                        // This text is read by screen readers when the image cannot be loaded
                        // or when a user is using a screen reader
                        alt="Goal setting illustration from network"
                    />

                    {/* Local Image */}
                    <Image
                        source={require('../assets/goal-icon.png')}
                        style={styles.image}
                        alt="Goal setting illustration from local assets"
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={newText => setInputText(newText)}
                        value={inputText}
                        placeholder="Enter your goal here"
                        autoFocus={autoFocusInput}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                    />

                    {isFocused && inputText.length > 0 && (
                        <Text style={styles.displayText}>
                            Characters: {inputText.length}
                        </Text>
                    )}

                    {hasBlurred && !isFocused && (
                        <Text style={[
                            styles.feedbackText,
                            styles.displayText,
                            inputText.length >= REQ_MIN_CHARS ? styles.successText : styles.errorText
                        ]}>
                            {inputText.length >= REQ_MIN_CHARS
                                ? "Thank you"
                                : `Please type more than ${REQ_MIN_CHARS} characters`}
                        </Text>
                    )}

                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Cancel"
                                onPress={handleCancelPress}
                                color="#ff4444"
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Confirm"
                                onPress={handleConfirm}
                                disabled={inputText.length < REQ_MIN_CHARS}
                            />
                        </View>
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
    },
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
        elevation: 5,
        shadowColor: '#000',
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 16,
    },
    buttonContainer: {
        width: '45%',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    }
});