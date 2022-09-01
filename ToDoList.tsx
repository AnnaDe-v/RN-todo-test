import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {deleteTodoAsync, getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from "./hooks";
import TodoItem from './TodoItem';


const ToDoList = ({navigation, ...props}) => {
    const todoList = useAppSelector(state => state.todo.list)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    const deleteTodo = (id) => {
        dispatch(deleteTodoAsync(id))
    }


    return (
        <View>
            {
                todoList.map((t, index) => (

                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        style={{ marginBottom: 30 }}
                        onPress={() =>
                            navigation.navigate("TodoDetail", {
                                todoTitle: t.todoTitle,
                                todoId: t.todoId,
                            })
                        }
                    >
                        <TodoItem
                            key={t.todoId}
                            text={t.todoTitle}
                            id={t.todoId}
                            deleteTodo={deleteTodo}
                        />
                    </TouchableOpacity>


                ))
            }
        </View>
    );
};

export default ToDoList;