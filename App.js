import React from "react";
import {SafeAreaView, View} from 'react-native';
import store from "./redux/store";
import {Provider as ReduxProvider} from 'react-redux';
import ToDoLists from "./ToDoLists";


const App = () => {
    return (
        <>
            <SafeAreaView>
                <ReduxProvider store={store}>
                    <ToDoLists/>
                </ReduxProvider>
            </SafeAreaView>
        </>
    );
}

export default App;



