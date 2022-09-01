import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from "react-native";
import InputBlockTask from "./InputBlockTask";
import {useAppSelector} from "./hooks";
import {useDispatch} from "react-redux";
import TaskItem from './TaskItem';
import {addTaskAsync, getTasksAsync} from "./redux/todoSlice";
import TaskItems from "./TaskItems";


const TodoDetail = ({route, navigation}) => {
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);
    const [text, setText] = useState('')

    const filteredTasks = tasks.filter(t => t.todoId === route.params.todoId)

    const routeTodoId = route.params.todoId
    console.log('routeTodoId', routeTodoId)

    useEffect(() => {
        dispatch(getTasksAsync(route.params.todoId));
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
            {/*<TaskItems todoId={route.params.todoId}/>*/}
            <ScrollView>
                {
                    filteredTasks.map(t => (<View>
                        <Text>{t.todoId}</Text>
                        <Text>{t.todoTitle}</Text>

                        <View>{t.tasksList?.map(task => <TaskItem key={task.taskId}
                                                                  text={task.taskTitle}
                                                                  id={task.taskId}/>)}
                        </View>
                    </View>))
                }
            </ScrollView>


        </>

    );
};

export default TodoDetail;