import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {Button} from "@rneui/themed";
import ToDoItem from "./ToDoItem";
import {useDispatch} from "react-redux";
import {addTodoAsync, deleteTodoAsync, getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from './hooks';


const ToDoLists: React.FC = () => {
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
                {!error && <View style={{alignItems: 'center'}}><Text style={{fontSize: 18, color: 'red'}}>{error}</Text></View>}
                {
                    !loading ? (
                        todo.map((t) => (
                            <ToDoItem
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