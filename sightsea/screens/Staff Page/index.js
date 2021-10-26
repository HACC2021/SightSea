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
    backgroundColor: "#71EEB0",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: "bold",
    borderWidth: 3,

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
});

//searchable table of reports
//should default to display most recent 5 only then
//after search should refresh with search target values

//Need to place reports on Oahu/Google Map,
// as pins with accurate locations form the reports that
// are being displayed

//protected route/login
const StaffPage = () => {
  // const [Input, setInput] = React.useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(Input);
  // };

  return (
      <View style={styles.container}>
        <View >
          <Text style={styles.header}>Staff Page</Text>


          {/*<Text>Contact Info:</Text>*/}
          {/*<TextInput*/}
          {/*    style={styles.input}*/}
          {/*    onChangeText={setInput}*/}
          {/*    value={Input}*/}
          {/*    placeholder="Enter First Name"*/}
          {/*/>*/}
          {/*<TextInput*/}
          {/*    style={styles.input}*/}
          {/*    onChangeText={setInput}*/}
          {/*    value={Input}*/}
          {/*    placeholder="Enter Last Name"*/}
          {/*/>*/}
          {/*<TextInput*/}
          {/*    style={styles.input}*/}
          {/*    onChangeText={setInput}*/}
          {/*    value={Input}*/}
          {/*    placeholder="Enter Phone Number"*/}
          {/*/>*/}
          {/*<Button title="Submit" onPress={handleSubmit}></Button>*/}

        </View>
      </View>
  );
};

export default StaffPage;
