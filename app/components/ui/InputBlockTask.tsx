import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";


const InputBlockTask = ({text, setText, addNewTaskHandler, textPlaceholder}) => {


    return (
        <View style={styles.actions}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={text => setText(text)}
                placeholder={textPlaceholder}
            />
            <TouchableOpacity
                style={styles.buttonAdd}
                onPress={() => addNewTaskHandler(text)}>
                <Text style={{color: 'white', fontSize: 18}}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default InputBlockTask;


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
    buttonAdd: {
        backgroundColor: 'rgb(123,72,243)',
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 10,
    }

});