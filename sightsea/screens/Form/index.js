import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  TextInput,
  Button,
  Headline,
  Subheading,
  Title,
  Paragraph,
  List,
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
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const animalTypes = [
    { label: "Turtle", value: "turtle" },
    { label: "Bird", value: "bird" },
    { label: "Seal", value: "Seal" },
  ];
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);

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
        <View>
          <DropDown
            label={"Animal Type"}
            mode={"outlined"}
            visible={showAnimalDropDown}
            showDropDown={() => setShowAnimalDropDown(true)}
            onDismiss={() => setShowAnimalDropDown(false)}
            value={animalType}
            setValue={setAnimalType}
            list={animalTypes}
          />
        </View>
        <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default SightForm;
