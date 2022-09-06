import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {deleteTodoAsync} from "./redux/todoSlice";
import {useAppSelector} from "./hooks";
import TodoItem from './TodoItem';


const ToDoList = ({navigation, ...props}) => {
    const todoList = useAppSelector(state => state.todo.list)
    const dispatch = useDispatch()
    console.log('todoListW', todoList)




    const deleteTodo = (id) => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <ScrollView>
            {
                todoList.map((t, index) => (

                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        style={{ marginBottom: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        onPress={() =>
                            navigation.navigate("TodoDetail", {
                                todoTitle: t.todoTitle,
                                todoId: t.todoId,
                            })
                        }
                    >
                        <TodoItem
                            key={index}
                            text={t.todoTitle}
                            id={t.todoId}
                            deleteTodo={deleteTodo}
                        />
                    </TouchableOpacity>


                ))
            }
        </ScrollView>
    );
};

export default ToDoList;