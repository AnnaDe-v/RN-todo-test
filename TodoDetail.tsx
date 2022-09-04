import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import InputBlockTask from "./InputBlockTask";
import {useAppSelector} from "./hooks";
import {useDispatch} from "react-redux";
import TaskItem from './TaskItem';
import {addTaskAsync, getTasksAsync} from "./redux/todoSlice";


const TodoDetail = ({route, navigation}) => {
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);
    const [text, setText] = useState('')

    const routeTodoId = route.params.todoId


    console.log('tasks', tasks)

    const filteredTasks = tasks.filter(t => t.todoId === routeTodoId)


    useEffect(() => {
        dispatch(getTasksAsync(routeTodoId));
    }, [dispatch]);


    const addNewTaskHandler = () => {
        if (text.trim().length) {
            dispatch(addTaskAsync({text, routeTodoId}))
        }
        setText('')
    }


    return (
        <>
            <View style={{paddingTop: 50, alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>{route.params.todoTitle}</Text>
            </View>
            <InputBlockTask textPlaceholder='Type task...' addNewTaskHandler={addNewTaskHandler} text={text}
                            setText={setText}/>
            <ScrollView>
                {
                    filteredTasks.map((t, index) => (
                        <View key={index}>
                        {t.tasksList?.map(task =>
                            <TaskItem
                                key={task.taskId}
                                text={task.taskTitle}
                                taskId={task.taskId}
                                IsCompleted={task.IsCompleted}
                                routeTodoId={routeTodoId}
                            />)}
                    </View>
                    ))
                }
            </ScrollView>
        </>

    );
};

export default TodoDetail;