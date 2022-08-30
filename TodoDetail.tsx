import React from 'react';
import {View, Text} from "react-native";
import InputBlock from "./InputBlock";
import TaskItems from "./TaskItems";



const TodoDetail = ({route, navigation}) => {
    return (
        <>
            <View style={{paddingTop: 50, alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>{route.params.todoTitle}</Text>
            </View>
            <InputBlock />
            <TaskItems/>
        </>

    );
};

export default TodoDetail;