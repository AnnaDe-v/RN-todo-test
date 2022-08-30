import React from 'react';
import {View, Text, ScrollView} from "react-native";
import InputBlock from "./InputBlock";
import TaskItems from "./TaskItems";
import {useAppSelector} from "./hooks";
import {useDispatch} from "react-redux";
import TaskItem from './TaskItem';


const TodoDetail = ({route, navigation}) => {
    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => state.todo.list);
    const {loading, error} = useAppSelector((state) => state.todo);


    const filteredTasks = tasks.filter(t => t.todoId === route.params.todoId)



    return (
        <>
            <View style={{paddingTop: 50, alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>{route.params.todoTitle}</Text>
            </View>
            <InputBlock textPlaceholder='Type task...' />
            <TaskItems todoId={route.params.todoId}/>
            <ScrollView>
                {
                    filteredTasks.map(t => (<View>
                        <Text>{t.todoId}</Text>
                        <Text>{t.todoTitle}</Text>
                        <View>{t.tasksList?.map(task => <TaskItem key={task.taskId} text={task.taskTitle} id={task.taskId}/>)}</View>

                    </View>))
                }
            </ScrollView>


        </>

    );
};

export default TodoDetail;