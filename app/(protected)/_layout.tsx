// In (protected)/_layout.tsx
import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "@/Firebase/firebaseSetup";
import { signOut } from "firebase/auth";

export default function ProtectedLayout() {
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // No need to navigate - root layout will handle it
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "purple" },
                headerTintColor: "white",
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: "All My Goals",
                    headerRight: () => (
                        <Pressable
                            onPressIn={() => router.push("/profile")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                                padding: 8,
                            })}
                        >
                            <Ionicons name="person" size={24} color="white" />
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="goals/[id]"
                options={{
                    headerTitle: "Goal Details",
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerTitle: "Profile",
                    headerRight: () => (
                        <Pressable
                            onPressIn={handleSignOut}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                                padding: 8,
                            })}
                        >
                            <Ionicons name="log-out-outline" size={24} color="white" />
                        </Pressable>
                    ),
                }}
            />
        </Stack>
    );
}