import React from 'react';
import {ActivityIndicator, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {deleteTodoAsync, todoType} from "../../../../redux/todoSlice";
import {useAppSelector} from "../../../hooks/hooks";
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';



const ToDoList = React.memo(function ({navigation, todoList}) {
    const loading = useAppSelector(state => state.todo.loading)
    const dispatch = useDispatch()


    const deleteTodo = (id) => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <ScrollView style={{marginBottom: 200, marginTop: 20}}>
            {   !loading ? (
                todoList.map((t) => (
                    <TouchableOpacity
                        key={uuidv4()}
                        activeOpacity={1}
                        style={{
                            marginBottom: 10,
                            borderRadius: 20,
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
                            key={uuidv4()}
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
}, (prevProps, nextProps) => prevProps === nextProps)

export default ToDoList;