import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Switch} from "react-native";
import {Feather} from '@expo/vector-icons';
import {deleteTaskAsync, toggleCompleteAsync} from "../../../../redux/todoSlice";
import {useDispatch} from "react-redux";
import {FC} from "react";


type taskItemType = {
    taskId: string
    text: string
    IsCompleted: boolean
    routeTodoId: string
}

const TaskItem:FC<taskItemType> = ({taskId, text, IsCompleted, routeTodoId}) => {
    const dispatch = useDispatch()


    const handleCheckboxClick = async () => {
        dispatch(toggleCompleteAsync({routeTodoId, taskId, IsCompleted}));
    };

    const deleteTask = () => {
        dispatch(deleteTaskAsync({routeTodoId, taskId}))
    }


    return (
        <TouchableHighlight
            underlayColor='transparent'
            onPress={handleCheckboxClick}>
            <View
                style={styles.item}
            >
                <View style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Switch
                        trackColor={{false: "#767577", true: "rgb(123,72,243)"}}
                        thumbColor={IsCompleted ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={handleCheckboxClick}
                        value={IsCompleted}
                        style={{position: 'absolute', left: 5, paddingTop: 20, paddingBottom: 10}}
                    />
                </View>
                <Text style={styles.name}>{text}</Text>
                <TouchableOpacity onPress={deleteTask}>
                    <Feather name="trash" size={24} color="red"/>
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
        flexWrap: 'wrap',
        width: '75%',
        alignItems: 'center',
        textAlign: "center",
    }
})


export default TaskItem;