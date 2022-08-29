import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";


const InputBlock = ({text, setText, addNewTodoHandler}) => {


    return (
        <View style={styles.actions}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={text => setText(text)}
                placeholder='What are you going to do?'
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

export default InputBlock;


const styles = StyleSheet.create({
    actions: {
        padding: 20,
        justifyContent: "center",

    },
    input: {
        borderRadius: 20,
        width: '70%',
        fontSize: 20,
        marginVertical: 25,
        marginHorizontal: '15%'
    },

});