import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  Platform,
} from "react-native";
import { getAuth, onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        width: "70%",
      },
      android: {
        width: "70%",
      },
      default: {
        width: "30%",
      },
    }),
  },
  errorText: {
    color: "red",
  },
});

const StaffLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);
  
  const auth = getAuth();
  // Listen for authentication state to change.
  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser(user);
      console.log('We are authenticated now!');
      navigation.navigate("StaffPage");
    }
    else {
      setInitializing(false);
    }
  }); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in

        console.log("Logged in ");
        const user = userCredential.user;
        navigation.navigate("StaffPage");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
      });
  };
  
  if (initializing) return null;
  return (
    <View style={styles.container}>
      <Text>Staff login</Text>
      <Text style={styles.errorText}> {error && error}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        type="email"
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );

};



export default StaffLogin;
