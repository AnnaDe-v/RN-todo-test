import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import {CheckBox} from "@rneui/themed";
import { Feather } from '@expo/vector-icons';
import {toggleCompleteAsync} from "./redux/todoSlice";
import {useDispatch} from "react-redux";

const ToDoItem = ({id, name, IsCompleted, deleteTodo}) => {
    const dispatch = useDispatch()



    const handleCheckboxClick = () => {
        dispatch(toggleCompleteAsync({ id, IsCompleted }));

    };

    console.log(IsCompleted)

    return (
        <TouchableHighlight
            underlayColor='transparent'
            onPress={handleCheckboxClick}>
            <View
                style={styles.item}
            >
                <CheckBox
                    onPress={handleCheckboxClick}
                    checked={IsCompleted}
                />
                <Text style={styles.name}>{name} {IsCompleted}</Text>
                <TouchableOpacity onPress={() => deleteTodo(id) }>
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