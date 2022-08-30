import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch} from "react-redux";
import {getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from "./hooks";
import TodoItems from './TodoItem';
import TodoItem from './TodoItem';


const ToDoList = ({navigation, ...props}) => {
    const todoList = useAppSelector(state => state.todo.list)
    const dispatch = useDispatch()

    console.log(todoList)


    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);


    const deleteTodo = (id) => {
        console.log(id)
    }

    // const addTaskToFirebase = async function () {
    //     const q = query(collection(db, "todos"));
    //     const querySnapshot = await getDocs(q);
    //     const queryData = querySnapshot.docs.map((t) => ({
    //         ...t.data(),
    //         id: t.id,
    //     }));
    //     console.log(queryData);
    //
    //     queryData.map(async (v) => {
    //         await setDoc(doc(db, `todos/${localTodoId}/tasksList/${uuidv4()}`), {
    //             taskId: Date.now().toLocaleString(),
    //             taskTitle: 'New task',
    //             IsCompleted: false,
    //         });
    //     })
    // }


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