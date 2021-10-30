import React from "react";
import { StyleSheet, Text, View, StatusBar, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput, Button } from "react-native-paper";
import { black, white } from "@jest/types/node_modules/chalk";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {},
});

const SightForm = () => {
  const [Input, setInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Input);
  };

  const [date, setDate] = React.useState(new Date(1598051730000));
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Contact Info:</Text>
        {/* <Button onPress={showDatepicker} title="Show date picker!" />

        <Button onPress={showTimepicker} title="Show time picker!" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )} */}

        {/* <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={Input}
          mode="outlined"
          label="Enter First Name"
        /> */}
        <Button
          style={styles.btn}
          mode="contained"
          onPress={() => handleSubmit}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

export default SightForm;
