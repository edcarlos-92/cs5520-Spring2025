import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { writeToDB, readDocsFromCollection } from "@/Firebase/firestoreHelper";
import PressableButton from "@/components/PressableButton";

interface User {
    id: number;
    name: string;
}

interface GoalUsersProps {
    goalId: string;
}

export default function GoalUsers({ goalId }: GoalUsersProps) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const firestoreUsers = await readDocsFromCollection(`goals/${goalId}/users`);

                if (firestoreUsers.length > 0) {
                    setUsers(firestoreUsers);
                } else {
                    const response = await fetch('https://jsonplaceholder.typicode.com/users');

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setUsers(data);

                    for (const user of data) {
                        await writeToDB(user, `goals/${goalId}/users`);
                    }
                }
            } catch (e) {
                console.log("Error fetching users:", e);
            }
        }
        fetchUsers();
    }, [goalId]);

    async function handleAddUser() {
        try {
            const newUser = {
                name: `New User ${Date.now()}`
            };

            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Created user:', data);

            await writeToDB(data, `goals/${goalId}/users`);
            setUsers(prevUsers => [...prevUsers, data]);
        } catch (e) {
            console.log("Error creating user:", e);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <PressableButton
                pressedHandler={handleAddUser}
                componentStyle={styles.addUserButton}
            >
                <Text style={{ color: "white" }} >Add User</Text>
            </PressableButton>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>{item.name}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No users to display</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: '#dcd',
        borderRadius: 5,
        flex: 1,
    },
    title: {
        fontSize: 20,
        color: 'purple',
    },
    userItem: {
        padding: 10,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
    },
    userName: {
        fontSize: 16,
        color: 'purple',
    },
    emptyText: {
        color: 'gray',
        textAlign: 'center',
        padding: 10,
    },

    addUserButton: {
        backgroundColor: 'purple',
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },

});