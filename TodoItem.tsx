import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Feather} from '@expo/vector-icons';
import React, {FC} from "react";
import {useNavigation} from "@react-navigation/native";
import {useAppSelector} from "./hooks";

type todoItemType = {
    id: string
    text: string
    deleteTodo: (id) => void
}

const TodoItem:FC<todoItemType> = ({id, text, deleteTodo}) => {
    const navigation =
        useNavigation();
    const todoList = useAppSelector(state => state.todo.list)



    return (
        <View
            style={styles.item}
        >
            <Text style={styles.name}>{text}</Text>
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
    }
})


export default TodoItem;