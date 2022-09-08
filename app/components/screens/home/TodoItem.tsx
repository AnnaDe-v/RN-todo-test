import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Feather} from '@expo/vector-icons';
import React, {FC} from "react";



type todoItemType = {
    id: string
    text: string
    deleteTodo: (id: string) => void
    taskCount: number
}


const TodoItem:FC<todoItemType> = ({id, text, deleteTodo, taskCount}) => {
    if(taskCount > 0) {
    } else {
        taskCount = 0
    }

    return (
        <View
            style={styles.item}
        >
            <Text style={styles.name}>{text}</Text>
            <Text style={styles.count}>{taskCount}</Text>
            <TouchableOpacity onPress={() => deleteTodo(id)}>
                <Feather name="trash" size={24} color="red"/>
            </TouchableOpacity>
        </View>


    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#93bff3',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        padding: 20,
        marginBottom: 1,
        marginHorizontal: '5%',
        flexDirection: 'row',
    },
    name: {
        fontSize: 18,
        marginLeft: 5,
        flex: 1,
        flexWrap: 'wrap',
    },
    count: {
        position: 'absolute',
        right: 50,
        color: 'white',
        fontSize: 18,
    }
})


export default TodoItem;