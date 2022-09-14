import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ToDoList from './ToDoList';
import {addTodoAsync, getTodosAsync} from "../../../../redux/todoSlice";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../hooks/hooks";
import InputBlockTodo from '../../ui/InputBlockTodo';


const HomeScreen =  ({navigation}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const error = useAppSelector(state => state.todo.error)
    const todoList = useAppSelector(state => state.todo.list)


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
            <Text style={styles.error}>{error}</Text>
            <ToDoList navigation={navigation} todoList={todoList}/>
        </View>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    error: {
        fontSize: 18,
        color: '#938e8e'
    }
});

export default HomeScreen;