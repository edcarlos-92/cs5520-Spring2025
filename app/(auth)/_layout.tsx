import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "purple" },
                headerTintColor: "white",
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: "Login",
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    headerTitle: "Signup",
                }}
            />
        </Stack>
    );
}