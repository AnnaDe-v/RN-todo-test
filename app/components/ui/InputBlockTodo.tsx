import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";


const InputBlockTodo = ({text, setText, addNewTodoHandler, textPlaceholder}) => {


    return (
        <View style={styles.actions}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={text => setText(text)}
                placeholder={textPlaceholder}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: 'rgb(123,72,243)',
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    borderRadius: 10,
                }}
                onPress={() => addNewTodoHandler(text)}>
                <Text style={{color: 'white', fontSize: 18}}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default InputBlockTodo;


const styles = StyleSheet.create({
    actions: {
        padding: 20,
        justifyContent: "center",
        width: '100%',

    },
    input: {
        borderRadius: 20,
        fontSize: 20,
        marginVertical: 25,
        textAlign: "center"
    },

});