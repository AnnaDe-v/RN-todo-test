import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Switch} from "react-native";
import {Feather} from '@expo/vector-icons';
import React, {FC} from "react";
import {useNavigation} from "@react-navigation/native";

interface Props {
    id: string
    text: string
    onPressNav: (text: string) => void
    deleteTodo: (id) => void
}

const TodoItem = ({id, text, deleteTodo}) => {
    const navigation =
        useNavigation();

    return (
           <View
               style={styles.item}
           >
               <Text>{text}</Text>
               <TouchableOpacity onPress={() => deleteTodo(id)}>
                   <Feather name="trash" size={24} color="red"/>
               </TouchableOpacity>
           </View>


    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eee1f5',
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
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