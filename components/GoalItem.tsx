import { View, Text, StyleSheet } from 'react-native';
import { Goal } from '@/App';


interface GoalItemProps {
    goal: Goal;
}


const GoalItem = ({ goal }: GoalItemProps) => {
    return (
        <View>
            {goal && <Text style={styles.submittedGoal}>{goal.text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    submittedGoal: {
        fontSize: 16,
        color: '#666',
        // backgroundColor: '#fff',
        backgroundColor: '#f1f2b1',
        padding: 16,
        borderRadius: 8,
        width: '90%',
        textAlign: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        marginTop: 8

    },
});

export default GoalItem;