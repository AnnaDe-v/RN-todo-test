import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./HomeScreen";
import TodoDetail from "./TodoDetail";
import store from "./redux/store";


export default function RootNavigation() {

    const Stack = createStackNavigator();

    const screenOptions = {
        headerShown: false,
    };

    return (
        <ReduxProvider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOptions}>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen name="TodoDetail" component={TodoDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        </ReduxProvider>
    );
}