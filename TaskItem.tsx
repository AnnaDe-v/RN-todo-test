import {Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, Switch} from "react-native";
import {Feather} from '@expo/vector-icons';
import {toggleCompleteAsync} from "./redux/todoSlice";
import {useDispatch} from "react-redux";


const TaskItem = ({id, text, IsCompleted, deleteTodo}) => {
    const dispatch = useDispatch()


    const handleCheckboxClick = () => {
        dispatch(toggleCompleteAsync(id));
    };


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
                    />
                </View>
                <Text style={styles.name}>{text}</Text>
                <TouchableOpacity onPress={() => deleteTodo(id)}>
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
        marginLeft: 5,
        flex: 1,
        flexWrap: 'wrap',
    }
})


export default TaskItem;