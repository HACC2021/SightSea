import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SightForm from "./screens/Form";
import HomeScreen from "./screens/Home";
import StaffLogin from "./screens/StaffLogin";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmMrLM-94w_FoUjeBJsNNzWDssfuGrfDQ",
  authDomain: "sightsea-57e15.firebaseapp.com",
  projectId: "sightsea-57e15",
  storageBucket: "sightsea-57e15.appspot.com",
  messagingSenderId: "540196098412",
  appId: "1:540196098412:web:a53a48f2c8e7461ddf6349",
  measurementId: "G-HPGWR7KS9T"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(10, 147, 150)',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      {/* set Home as the landing page */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Form" component={SightForm} options={{ headerLeft: null }}/>
        <Stack.Screen name="StaffLogin" component={StaffLogin} options={{ headerLeft: null }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
