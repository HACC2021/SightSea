import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SightForm from "./screens/Form";
import HomeScreen from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* set Home as the landing page */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Form"
          component={SightForm}
          options={{ headerLeft: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
