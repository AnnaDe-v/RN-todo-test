import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import {CheckBox} from "@rneui/themed";
import { Feather } from '@expo/vector-icons';

const ToDoItem = ({idx, name, IsCompleted, toggleCheckedToDo, deleteTodo}) => {

    return (
        <TouchableHighlight
            underlayColor='transparent'
            onPress={() => toggleCheckedToDo(idx)}>
            <View
                style={styles.item}
            >
                <CheckBox
                    onPress={() => toggleCheckedToDo(idx)}
                    checked={IsCompleted}

                />
                <Text style={styles.name}>{name}</Text>
                <TouchableOpacity onPress={() => deleteTodo(idx) }>
                    <Feather name="trash" size={24} color="black"  />
                </TouchableOpacity>

            </View>
        </TouchableHighlight>

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
        marginLeft: 5
    }
})


export default ToDoItem;