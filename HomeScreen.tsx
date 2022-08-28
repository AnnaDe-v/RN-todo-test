import { Button } from '@rneui/themed';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

function HomeScreen ({navigation}) {
    const array = [
        {
            todoId: '1',
            titleTodo: 'Work'
        },
        {
            todoId: '2',
            titleTodo: 'Home'
        },
    ]

    return (
            <View style={{backgroundColor: '#a9eeb4', alignItems: 'center'}}>
                {
                    array.map(t => (
                        <View key={t.todoId} style={{backgroundColor: '#a7d061', width: '80%'}}>
                            <Text style={{padding: 10}} onPress={() => navigation.navigate('Main')}>{t.titleTodo}</Text>
                        </View>

                    ))
                }
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