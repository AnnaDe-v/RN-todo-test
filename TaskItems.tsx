import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text,View} from "react-native";
import TaskItem from "./TaskItem";
import {useDispatch} from "react-redux";
import {deleteTodoAsync, getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from './hooks';


const TaskItems: React.FC = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);


    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    const addNewTaskHandler = () => {
        if (text.trim().length) {
            // dispatch(addTaskAsync(text, todoId))
        }

        setText('')
    }


    const deleteTodo = id => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 300,
                }}
            >
                {!error && <View style={{alignItems: 'center'}}><Text style={{fontSize: 18, color: 'red'}}>{error}</Text></View>}
                {
                    !loading ? (
                        tasks.map((t) => (
                            <TaskItem
                                key={`_todo_${t.todoId}`}
                                id={t.todoId}
                                text={t.tasksList}
                                IsCompleted={t.IsCompleted}
                                deleteTodo={deleteTodo}
                            />
                        ))) : (
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 18}}>Loading...</Text>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    );
};

export default TaskItems;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    heading: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
});