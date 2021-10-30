import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  TextInput,
  Button,
  Headline,
  Subheading,
  Title,
} from "react-native-paper";

//get window size of current device
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: windowWidth * 0.8,
  },
  btn: {
    margin: 10,
    width: windowWidth * 0.5,
  },
});

const SightForm = () => {
  const [Input, setInput] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(Input);
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
      <View style={styles.form}>
        <Headline>Report a Sighting</Headline>
        <Subheading>
          Fill out the form below to submit a sighting and our staffs will
          review the submitted form shortly.
        </Subheading>
        <Button onPress={showDatepicker}>Select Date</Button>

        <Button onPress={showTimepicker}>Select Time</Button>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <TextInput
          style={styles.input}
          onChangeText={setInput}
          value={Input}
          mode="outlined"
          label="Enter First Name"
        />
        <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default SightForm;
