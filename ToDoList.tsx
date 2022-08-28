import React from 'react';
import {Text, View} from "react-native";

const ToDoList = () => {

    const array = [
        {
            todoId: '1',
            titleTodo: 'Work'
        },
        {
            todoId: '2',
            titleTodo: 'Home'
        },
    ]

    return (
        <View>
            {
                array.map(t => (
                    <View key={t.todoId} style={{backgroundColor: '#a7d061', width: '80%'}}>
                        <Text style={{padding: 10}} onPress={() => navigation.navigate('Main')}>{t.titleTodo}</Text>
                    </View>

                ))
            }
        </View>
    );
};

export default ToDoList;