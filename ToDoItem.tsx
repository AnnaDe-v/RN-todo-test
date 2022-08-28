import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity} from "react-native";
import {CheckBox} from "@rneui/themed";
import { Feather } from '@expo/vector-icons';
import {toggleCompleteAsync} from "./redux/todoSlice";
import {useDispatch} from "react-redux";
import { collection, addDoc, doc } from "firebase/firestore";
import {db} from "./firebase";


const ToDoItem = ({id, text, IsCompleted, deleteTodo}) => {
    const dispatch = useDispatch()

    const handleCheckboxClick = () => {
        dispatch(toggleCompleteAsync(id));
    };

    const addTodoToFirebase = async function (){

        const newTodo = doc(collection(db, 'todos'))

        const dataForTodo = {
            todoTitle: text,
            todoId: newTodo.id,
            taskList: [
                {
                    taskId: '1',
                    taskTitle: 'New task',
                    IsCompleted: false,
                },
            ]
        }
        await addDoc(collection(db, "todos"), dataForTodo);
    }


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
                    containerStyle={{backgroundColor: '#eee1f5'}}
                />
                <Text style={styles.name}>{text}</Text>
                <TouchableOpacity onPress={() => deleteTodo(id) }>
                    <Feather name="trash" size={24} color="red"  />
                </TouchableOpacity>
                <TouchableOpacity onPress={addTodoToFirebase}>
                    <Text>POKE</Text>
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
        marginLeft: 5,
        flex: 1,
        flexWrap: 'wrap',
    }
})


export default ToDoItem;