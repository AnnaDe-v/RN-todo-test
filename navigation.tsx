import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./app/components/screens/home/HomeScreen";
import TodoDetail from "./app/components/screens/tododetail/TodoDetail";
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