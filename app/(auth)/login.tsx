import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import PressableButton from "@/components/PressableButton";
import { router } from "expo-router";

import { auth } from "@/Firebase/firebaseSetup";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        try {
            // Firebase login implementation
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log("Logged in user:", userCredential.user.uid);
            // No need to navigate manually - the Root layout will handle redirection
        } catch (error: any) {
            // Handle specific Firebase Auth errors
            const errorCode = error.code;
            let errorMessage = "Login failed";

            switch (errorCode) {
                case 'auth/invalid-email':
                    errorMessage = "Invalid email format";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed login attempts. Try again later";
                    break;
                default:
                    errorMessage = error.message;
            }

            Alert.alert("Login Error", errorMessage);
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

            <PressableButton pressedHandler={handleLogin} componentStyle={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
            </PressableButton>

            <PressableButton
                pressedHandler={() => router.replace("/signup")}
                componentStyle={styles.linkButton}
            >
                <Text style={styles.linkText}>New User? Create an account</Text>
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