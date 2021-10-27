import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

const StaffLogin = () => {
  const [Input, setInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Input);
  };

  return (
    <View style={styles.container}>
      <Text>Staff login:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={Input}
        type="email"
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={Input}
        type="password"
        placeholder="Password"
      />
      <Button title="Submit" onPress={handleSubmit}></Button>
    </View>
  );
};

export default StaffLogin;
