import { View, Text, StyleSheet, Button } from 'react-native';
import { Goal } from '@/App';

interface GoalItemProps {
    goal: Goal;
    onDelete: (id: number) => void;
}

const GoalItem = ({ goal, onDelete }: GoalItemProps) => {
    return (
        <View style={styles.goalContainer}>
            <Text style={styles.submittedGoal}>{goal.text}</Text>
            <View style={styles.deleteButton}>
                <Button
                    title="X"
                    onPress={() => onDelete(goal.id)}
                    color="gray"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    goalContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f2b1',
        borderRadius: 8,
        width: '90%',
        marginTop: 8,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    submittedGoal: {
        fontSize: 16,
        color: '#666',
        padding: 16,
        flex: 1,
        textAlign: 'center'
    },
    deleteButton: {
        backgroundColor: 'gray',
        justifyContent: 'center',
        width: 50
    }
});

export default GoalItem;