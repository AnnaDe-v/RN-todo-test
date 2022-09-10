import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ToDoList from './ToDoList';
import {addTodoAsync, getTodosAsync} from "../../../../redux/todoSlice";
import {useDispatch} from "react-redux";
import InputBlockTodo from "../../ui/InputBlockTodo";
import {useAppSelector} from "../../../hooks/hooks";



const HomeScreen  = ({navigation}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const error = useAppSelector(state => state.todo.error)


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
            <Text style={{fontSize: 18, color: '#938e8e'}}>{error}</Text>
            <ToDoList navigation={navigation} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    todoContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
});

export default HomeScreen;