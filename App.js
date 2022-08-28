import React from "react";
import store from "./redux/store";
import {Provider as ReduxProvider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "./Main";
import HomeScreen from "./HomeScreen";


const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <>
                <ReduxProvider store={store}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen
                                name="List todo's"
                                component={HomeScreen}
                            />
                            <Stack.Screen name="Main" component={Main} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ReduxProvider>
        </>
    );
}

export default App;


