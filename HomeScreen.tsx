import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ToDoList from './ToDoList';
import {addTodoAsync, getTodosAsync} from "./redux/todoSlice";
import {useDispatch} from "react-redux";
import InputBlockTodo from "./InputBlockTodo";



function HomeScreen ({navigation}) {
    const [text, setText] = useState('')
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    const addNewTodoHandler = () => {
        if (text.trim().length) {
            dispatch(addTodoAsync(text))
        }
        setText('')
    }


    return (
        <View style={styles.todoContainer}>
            <InputBlockTodo addNewTodoHandler={addNewTodoHandler} setText={setText} text={text} textPlaceholder='Type todo...'/>
            <ToDoList navigation={navigation} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        backgroundColor: 'rgba(238,238,238,0.59)',
        alignItems: 'center',
        marginTop: 50,
    },
});

export default HomeScreen;