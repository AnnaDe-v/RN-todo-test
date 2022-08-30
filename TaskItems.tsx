import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TaskItem from "./TaskItem";
import {useDispatch} from "react-redux";
import {addTaskAsync, deleteTodoAsync, getTasksAsync, getTodosAsync} from "./redux/todoSlice";
import {useAppSelector} from './hooks';
import TodoItem from "./TodoItem";


const TaskItems = ({todoId}) => {
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);


    const filteredTasks = tasks.filter(t => t.todoId === todoId)


    console.log('filteredTasks', filteredTasks)


    useEffect(() => {
        dispatch(getTasksAsync(todoId));
    }, [dispatch]);


    // const addNewTaskHandler = () => {
    //     if (text.trim().length) {
    //         dispatch(addTaskAsync('addNewTaskHandler', todoId))
    //     }
    //     setText('')
    // }


    const deleteTodo = id => {
        dispatch(deleteTodoAsync(id))
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 300,
                }}
            >
                {!error && <View style={{alignItems: 'center'}}><Text
                    style={{fontSize: 18, color: 'red'}}>{error}</Text></View>}
                {
                    !loading ?
                        (

                            filteredTasks.map((todo) => {
                               <Text>{todo.todoTitle}</Text>
                                todo.tasksList?.map((task) => {
                                    <TodoItem key={task.taskId} text={task.taskTitle} id={task.taskId} deleteTodo={deleteTodo}/>
                                })
                            })



                            // <TouchableOpacity>
                            //     <View style={{alignItems: 'center'}}>
                            //         <Text style={{fontSize: 18}}>WOW</Text>
                            //     </View>
                            // </TouchableOpacity>

                        ) : (
                            <View style={{alignItems: 'center'}}>
                                <Text style={{fontSize: 18}}>Loading...</Text>
                            </View>
                        )
                }
            </ScrollView>
        </View>
    );
};

export default TaskItems;


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    heading: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
});