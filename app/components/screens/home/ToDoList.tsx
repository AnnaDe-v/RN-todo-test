import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {deleteTodoAsync} from "../../../../redux/todoSlice";
import {useAppSelector} from "../../../hooks/hooks";
import TodoItem from './TodoItem';


const ToDoList = ({navigation, ...props}) => {
    const todoList = useAppSelector(state => state.todo.list)
    const dispatch = useDispatch()
    console.log('todoListW', todoList)
    const loading = useAppSelector(state => state.todo.loading)




    const deleteTodo = (id) => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <ScrollView style={{marginBottom: 200, marginTop: 20}}>

            {   !loading ? (
                todoList.map((t, index) => (

                    <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        style={{
                            marginBottom: 10,
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
                            taskCount={+t.tasksList?.length}
                        />
                    </TouchableOpacity>
                ))
            ) : (<ActivityIndicator
                color="rgb(123,72,243)"
                size="large"
            />
            )

            }

        </ScrollView>
    );
};

export default ToDoList;