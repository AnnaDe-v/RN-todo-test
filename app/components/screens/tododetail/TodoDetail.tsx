import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import {useAppSelector} from "../../../hooks/hooks";
import {useDispatch} from "react-redux";
import TaskItem from './TaskItem';
import {addTaskAsync, getTasksAsync} from "../../../../redux/todoSlice";
import InputBlockTask from '../../ui/InputBlockTask';
import { v4 as uuidv4 } from 'uuid';


const TodoDetail = ({route, navigation}) => {
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);
    const [text, setText] = useState('')
    const routeTodoId = route.params.todoId

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
            <InputBlockTask
                            textPlaceholder='Type task...'
                            addNewTaskHandler={addNewTaskHandler}
                            text={text}
                            setText={setText}
            />

            <ScrollView>
                {
                    filteredTasks.map((t) => (
                        <View key={uuidv4()}>
                        {t.tasksList?.map(task =>
                            <TaskItem
                                key={uuidv4()}
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