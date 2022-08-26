import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "@rneui/themed";
import ToDoItem from "./ToDoItem";
import {useDispatch, useSelector} from "react-redux";
import {addTodoAsync, deleteTodoAsync, getTodosAsync} from "./redux/todoSlice";



const ToDoLists = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    // @ts-ignore
    const todo = useSelector((state) => state.todo);


    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    const addNewTaskHandler = () => {
        if (text) {
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
            <View style={styles.actions}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={text => setText(text)}
                    placeholder='What are you going to do?'
                />
                <Button
                    title="Add"
                    onPress={addNewTaskHandler}
                    buttonStyle={{
                        backgroundColor: 'rgb(123,72,243)',
                        borderRadius: 10,
                    }}
                />
            </View>
            <ScrollView

                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 400,
                }}

            >
                {todo &&
                    todo.map((t) => (
                        <ToDoItem
                            key={`_todo_${t.id}`}
                            id={t.id}
                            text={t.title}
                            IsCompleted={t.IsCompleted}
                            deleteTodo={deleteTodo}
                        />
                    ))}
            </ScrollView>
        </View>
    );
};

export default ToDoLists;


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
    actions: {
        padding: 20,
    },
    input: {
        borderRadius: 20,
        width: '70%',
        fontSize: 20,
        marginVertical: 25,
        marginHorizontal: '15%'
    },

});