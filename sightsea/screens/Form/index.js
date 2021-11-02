import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
//import DropDown from "react-native-paper-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
//import MapView, { Marker } from "react-native-maps";
//import Marker from "react-native-maps";

import {
  TextInput,
  Button,
  Headline,
  Subheading,
  Title,
  Paragraph,
  List,
  Menu,
} from "react-native-paper";
import PhoneInput from "react-native-phone-input";
import RNDateTimePicker from "@react-native-community/datetimepicker";

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
  map: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
  },
});
const SightForm = () => {
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(false);
  const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);
  const animalTypes = [
    { label: "Turtle", value: "turtle" },
    { label: "Bird", value: "bird" },
    { label: "Seal", value: "Seal" },
  ];
  const [mapRegion, setmapRegion] = React.useState({
    latitude: 21.315603,
    longitude: -157.858093,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleAnimalDropdown = () => {
    setShowAnimalDropDown(!showAnimalDropDown);
  };
  const handleDropdownPress = (value) => {
    setAnimalType(value);
    setShowAnimalDropDown(!showAnimalDropDown);
  };

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

  //window.alert(date.getHours() + ":" + date.getMinutes());
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert(name);
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
        {/* <Marker coordinate={(37, -122)} /> */}
        {/*
        <View>
          <MapView style={styles.map} region={mapRegion}>
            <Marker key={0} coordinate={mapRegion} title={"Marker"} />
          </MapView>
        </View>
        */}

        {/* <View>
          <DropDown
            style={styles.input}
            label={"Animal Type"}
            mode={"outlined"}
            visible={showAnimalDropDown}
            showDropDown={() => setShowAnimalDropDown(true)}
            onDismiss={() => setShowAnimalDropDown(false)}
            value={animalType}
            setValue={setAnimalType}
            list={animalTypes}
          />
        </View> */}

        <View>
          <List.Section title="Animal Accordian">
            <List.Accordion
              title={animalType}
              expanded={showAnimalDropDown}
              onPress={handleAnimalDropdown}
            >
              <List.Item
                title="Turtle"
                onPress={() => {
                  setAnimalType("Turtle");
                }}
              />
              <List.Item
                title="Seal"
                onPress={() => {
                  setAnimalType("Seal");
                }}
              />
              <List.Item
                title="Bird"
                onPress={() => {
                  setAnimalType("Bird");
                  handleAnimalDropdown;
                }}
              />
            </List.Accordion>
          </List.Section>
          <TextInput
            style={styles.input}
            onChangeText={setName}
            value={name}
            mode="outlined"
            textContentType="name"
            label="Enter First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPhoneNum}
            mode="outlined"
            keyboardType="decimal-pad"
            label="Phone number"
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Is the animal on the beach or in the water?"
          />
          {animalType === "Seal" ? null : (
            <View>
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Describe any visible wounds (size/color)"
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Describe any previous wounds (ex. amputated flipper)"
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Describe the animal's behavior (ex. is it lethargic?)"
              />
              <TextInput
                style={styles.input}
                mode="outlined"
                label="About what size is the animal?"
              />
            </View>
          )}
        </View>
        <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default SightForm;
