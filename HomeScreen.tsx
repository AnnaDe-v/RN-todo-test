import { Button } from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ToDoList from './ToDoList';
import {addTodoAsync, getTodosAsync} from "./redux/todoSlice";
import {useDispatch} from "react-redux";
import InputBlock from "./InputBlock";




function HomeScreen ({navigation}) {

    const [text, setText] = useState('')
    const dispatch = useDispatch();

    const addNewTodoHandler = () => {
        if (text.trim().length) {
            dispatch(addTodoAsync(text))
        }
        setText('')
    }




    return (
            <View style={{backgroundColor: '#a9eeb4', alignItems: 'center'}}>
                <InputBlock addNewTodoHandler={addNewTodoHandler} setText={setText} text={text}/>
                <ToDoList navigation={navigation}/>
                {/*<Button onPress={() => navigation.navigate('Main')} title='to main'/>*/}
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