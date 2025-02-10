import { Stack } from "expo-router";

export default function Layout() {
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
                }}
            />
            <Stack.Screen
                name="goals/[id]"
                options={{
                    headerTitle: "Goal Details",
                }}
            />
        </Stack>
    );
}