import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import PressableButton from "@/components/PressableButton";
import { router } from "expo-router";
import { auth } from "@/Firebase/firebaseSetup";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSignup() {
        // Basic validation
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            // Create user with Firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Log the user - note that we don't need to navigate manually
            // as our Root layout will handle the navigation based on auth state
            console.log("User created:", userCredential.user.uid);
        } catch (error: any) {
            // Handle specific Firebase Auth errors
            const errorCode = error.code;
            let errorMessage = "An error occurred during signup";

            switch (errorCode) {
                case 'auth/email-already-in-use':
                    errorMessage = "This email is already in use";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address format";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password is too weak";
                    break;
                default:
                    errorMessage = error.message;
            }

            Alert.alert("Signup Error", errorMessage);
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>Email Address</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text>password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
            />

            <Text>Confirm password</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Password"
                secureTextEntry
            />

            <PressableButton pressedHandler={handleSignup} componentStyle={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
            </PressableButton>

            <PressableButton
                pressedHandler={() => router.replace("/login")}
                componentStyle={styles.linkButton}
            >
                <Text style={styles.linkText}>Already Registered? Login</Text>
            </PressableButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderColor: "purple",
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "purple",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    linkButton: {
        backgroundColor: "transparent",
        alignItems: "center",
        marginTop: 20,
    },
    linkText: {
        color: "purple",
        textDecorationLine: "underline",
    },
});