import React, {useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import TaskItem from "./TaskItem";
import {useDispatch} from "react-redux";
import {addTodoAsync, deleteTodoAsync, getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from './hooks';
import InputBlock from "./InputBlock";


const ToDoItem: React.FC = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const todo = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);


    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    const addNewTaskHandler = () => {
        if (text.trim().length) {
            dispatch(addTodoAsync(text))
        }

        setText('')
    }


    const deleteTodo = id => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>TODO</Text>
            <InputBlock text={text} setText={setText} addNewTaskHandler={addNewTaskHandler}/>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 400,
                }}
            >
                {!error && <View style={{alignItems: 'center'}}><Text style={{fontSize: 18, color: 'red'}}>{error}</Text></View>}
                {
                    !loading ? (
                        todo.map((t) => (
                            <TaskItem
                                key={`_todo_${t.id}`}
                                id={t.id}
                                text={t.title}
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

export default ToDoItem;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: '12%',
    },
    heading: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
});