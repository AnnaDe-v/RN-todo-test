import React from 'react';
import {Text, View} from "react-native";


const list = [
    {
        todoTitle: 'Grocery store',
        todoId: '14',
        tasksList: [
            {
                taskId: '1',
                taskTitle: 'Apple',
                IsCompleted: false,
            },
            {
                taskId: '2',
                taskTitle: 'Pineapple',
                IsCompleted: false,
            }
        ]
    },
    {
        todoTitle: 'Tools store',
        todoId: '15',
        tasksList: [
            {
                taskId: '221',
                taskTitle: 'Hammer',
                IsCompleted: false,
            },
            // {
            //     taskId: 'se',
            //     taskTitle: 'WD',
            //     IsCompleted: false,
            // }
        ]
    },

]



const filteredGGGTasks = list.find(todo => todo.todoId === '15' ? todo.tasksList.find(task => task.taskId !== '221'): todo)?.tasksList

const About = () => {
    return (
        <View>
            <Text>About</Text>
        </View>
    );
};

export default About;