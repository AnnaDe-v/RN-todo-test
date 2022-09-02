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
        <View style={{backgroundColor: '#a9eeb4', alignItems: 'center', marginTop: 50}}>
            <InputBlockTodo addNewTodoHandler={addNewTodoHandler} setText={setText} text={text} textPlaceholder='Type todo...'/>
            <ToDoList navigation={navigation} text={text} />
        </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#e57474",
        paddingTop: 10
    },
});

export default HomeScreen;