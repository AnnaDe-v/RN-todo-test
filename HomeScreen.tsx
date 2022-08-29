import { Button } from 'react-native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ToDoList from './ToDoList';




function HomeScreen ({navigation}) {
    return (
            <View style={{backgroundColor: '#a9eeb4', alignItems: 'center'}}>
                <ToDoList/>
                <Button onPress={() => navigation.navigate('Main')} title='to main'/>
            </View>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#e57474",
        paddingTop: 10
    },
});

export default HomeScreen;