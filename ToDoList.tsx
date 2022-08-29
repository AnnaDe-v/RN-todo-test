import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {addDoc, collection, doc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "./firebase";
import {v4 as uuidv4} from 'uuid';
import {useDispatch} from "react-redux";
import {getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from "./hooks";



const ToDoList = () => {

    const [localTodoId, setLocalTodoId] = useState(null)
    const todoList = useAppSelector(state => state.todo.list)
    const dispatch = useDispatch()


    console.log(todoList)


    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);





    // const addTodoToFirebase = async function () {
    //     const newTodo = doc(collection(db, 'todos'))
    //     const dataForTodo = {
    //         todoTitle: 'two todo',
    //         todoId: newTodo.id,
    //     }
    //     await setDoc(newTodo, dataForTodo);
    //
    //     setLocalTodoId(newTodo.id)
    //     console.log(localTodoId)
    //
    // }




    const addTaskToFirebase = async function () {
        const q = query(collection(db, "todos"));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((t) => ({
            ...t.data(),
            id: t.id,
        }));
        console.log(queryData);

        queryData.map(async (v) => {
            await setDoc(doc(db, `todos/${localTodoId}/tasksList/${uuidv4()}`), {
                taskId: Date.now().toLocaleString(),
                taskTitle: 'New task',
                IsCompleted: false,
            });
        })
    }


    return (
        <View>
            <TouchableOpacity onPress={addTaskToFirebase}>
                <Text>addtask</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={addTodoToFirebase}>*/}
            {/*    <Text>addTodo</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity  onPress={handleSubmit}>*/}
            {/*    <Text>GET</Text>*/}
            {/*</TouchableOpacity>*/}
            {
                todoList.map(t => (
                    <View key={t.todoId} style={{backgroundColor: '#a7d061', width: '80%'}}>
                        <Text style={{padding: 10}}>{t.todoTitle}</Text>
                    </View>

                ))
            }
        </View>
    );
};

export default ToDoList;