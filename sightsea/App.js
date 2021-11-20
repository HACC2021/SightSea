import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SightForm from "./screens/Form";
import HomeScreen from "./screens/Home";
import StaffPage from "./screens/Staff Page";
import StaffLogin from "./screens/StaffLogin";
import ViewReport from "./screens/Report";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmMrLM-94w_FoUjeBJsNNzWDssfuGrfDQ",
  authDomain: "sightsea-57e15.firebaseapp.com",
  databaseURL: "https://sightsea-57e15-default-rtdb.firebaseio.com",
  projectId: "sightsea-57e15",
  storageBucket: "sightsea-57e15.appspot.com",
  messagingSenderId: "540196098412",
  appId: "1:540196098412:web:a53a48f2c8e7461ddf6349",
  measurementId: "G-HPGWR7KS9T",
};

// Initialize Firebase
initializeApp(firebaseConfig);

//const googleAPIKey = "AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0";

//const analytics = getAnalytics(app);

const Stack = createNativeStackNavigator();

//apply global theme to paper elements
const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5a8ee0",
    accent: "#f1c40f",
    skyblue: "#6DB9D5",
    brightblue: "#2196f3",
    deepblue: "#006994",
    blue: "#5A88D4",
    teal: "#008080",
    lightblue: "rgb(97, 166, 200)",
    tan: "#f9f4ef",
    green: "rgb(75, 161, 117)",
    lightgreen: "#96DA91",
    seafoamgreen: "#93E9BE",
    red: "#ff0000",
  },
};

const styles = StyleSheet.create({
  button: {
    color: "#3478F6",
    fontSize: 18,    
    borderRadius: 6,
    marginRight: 15,
    padding: 8,
  },
});

export default function App() {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logged Out")
        // navigation.navigate("SightSea")
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* set Home as the landing page */}
        <Stack.Navigator 
        // screenOptions={{
        // headerShown: false}} 
        initialRouteName="SightSea">
          <Stack.Screen 
          name="SightSea" 
          component={HomeScreen}
          options={({navigation})=>({
            headerRight:() => (
              <Text
                style={styles.button}
                title="Home"
                onPress={()=> navigation.navigate("SightSea")}>
                  Home
                </Text>
            )
            })} />
          <Stack.Screen
            name="Form"
            component={SightForm}
            options={({navigation})=>({
              headerRight:() => (
                <Text
                  style={styles.button}
                  title="Home"
                  onPress={()=> navigation.navigate("SightSea")}>
                    Home
                  </Text>
              )
              })}
          />
          <Stack.Screen
              name="ViewReport"
              component={ViewReport}
              options={{ headerLeft: null }}
          />
          <Stack.Screen
            name="StaffLogin"
            component={StaffLogin}
            options={({navigation})=>({
              headerRight:() => (
                <Text
                  style={styles.button}
                  title="Home"
                  onPress={()=> navigation.navigate("SightSea")}>
                    Home
                  </Text>
              )
              })}
          />
          <Stack.Screen
            name="StaffPage"
            component={StaffPage}
            options={{
              headerLeft: null,
              headerRight: () => (
                <Text
                  style={styles.button}
                  title="Logout"
                  onPress={handleLogout}
                >
                  Logout
                </Text>
                
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
