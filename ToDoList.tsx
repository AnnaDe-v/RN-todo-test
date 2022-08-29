import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {addDoc, collection, doc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "./firebase";
import {v4 as uuidv4} from 'uuid';
import {useDispatch} from "react-redux";
import {getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from "./hooks";
import TodoItem from './TodoItem';


const ToDoList = () => {
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
                todoList.map(t => (
                    <TodoItem text={t.todoTitle} id={t.todoId} deleteTodo={deleteTodo}/>
                ))
            }
        </View>
    );
};

export default ToDoList;