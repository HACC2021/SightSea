import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
  Picker,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  TextInput,
  Button,
  Headline,
  Subheading,
  Title,
  Paragraph,
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
  const [name, setName] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(name);
  };

  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [animalType, setAnimalType] = React.useState("turtle");

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
        {/*  datatimepicker must be wrapped in a view to work */}
        <View>
          <Title>Select Date and Time:</Title>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 0.5, flexDirection: "column" }}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            </View>
            <View style={{ flex: 0.5, flexDirection: "column" }}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            </View>
          </View>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={(itemValue, itemIndex) => setName(itemValue)}
          value={name}
          mode="outlined"
          label="Enter First Name"
        />
        <Picker
          selectedValue={animalType}
          onValueChange={(itemValue, itemIndex) => setAnimalType(itemValue)}
        >
          <Picker.Item label="Turtle" value="turtle" />
          <Picker.Item label="Bird" value="bird" />
          <Picker.Item label="Seal" value="seal" />
        </Picker>
        <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default SightForm;
