import React from "react";
import store from "./redux/store";
import {Provider as ReduxProvider} from 'react-redux';
import ToDoLists from "./ToDoLists";

const App = () => {
    return (
        <>
                <ReduxProvider store={store}>
                    <ToDoLists/>
                </ReduxProvider>
        </>
    );
}

export default App;


