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
//import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
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
  const [time, setTime] = React.useState("");
  const [mode, setMode] = React.useState("date");
  const [showDate, setShowDate] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);
  const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [present , setPresent] = React.useState("");
  const [size, setSize] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);



  const [mapRegion, setmapRegion] = React.useState({
    latitude: 21.315603,
    longitude: -157.858093,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const closeAnimalDropdown = () => {
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

  //date format for form
  const currentDate = () => {
    var day = new Date().getDate();
    //append 0 to front of single digit days
    if (day.toString().length === 1 ){
      day = 0 + "" + day
    }
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var lasttwo = year.toString().slice(-2);

    //MMDDYY as required
    var datestring = month + "" + day + "" + lasttwo
    return datestring;
  }

  const currentTime = () => {
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()

    //HHMM in 24 time as required
    var time = hour + "" + minutes
    return time;
  }

  const phoneNumFormat = () => {
    var first_three = phoneNum.toString().slice(0,3);
    var middle_three = phoneNum.toString().slice(3, 6);
    var last_four = phoneNum.toString().slice(-4);

    var num = first_three + "-" + middle_three + "-" + last_four
    return num;

  }
  //window.alert(date.getHours() + ":" + date.getMinutes());
  const handleSubmit = (e) => {
    e.preventDefault();

    //For Seal input
    var new_date = currentDate();
    var new_time = currentTime();
    var ticket = "XX" + "" + new_date + "" + new_time
    const hotline = "";
    const ticket_type = "I";
    const observer =  name;
    var observer_phone = phoneNumFormat();
    const observer_type = "P";
    var observer_intitials = name.slice(0,1) + observer_type;
    const sector = "";
    var location_data = location;
    const location_notes = "";
    const seal_present = present;
    const seal_size = size;




    window.alert(location_data);
    window.alert(name);

    //Grab the current date and time


  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Headline>Report a Sighting</Headline>
          <Subheading>
            Fill out the form below to submit a sighting and our staffs will
            review the submitted form shortly.
          </Subheading>
          {/* datatimepicker must be wrapped in a view to work
          <View>
            <Title>Select Date and Time:</Title>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  display={showDate}
                  onChange={onChange}
                />
              </View>
              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  display={showTime}
                  onChange={onChange}
                />
              </View>
           </View>
           </View> */}
          {/* <Marker coordinate={(37, -122)} /> */}

          <View>
            <MapView style={styles.map} region={mapRegion}>
              <Marker key={0} coordinate={mapRegion} title={"Marker"} />
            </MapView>
          </View>

          <View>
            <List.Section title="Animal Type">
              <List.Accordion
                title={animalType}
                expanded={showAnimalDropDown}
                onPress={closeAnimalDropdown}
              >
                <List.Item
                  title="Turtle"
                  onPress={function () {
                    setAnimalType("Turtle");
                    closeAnimalDropdown();
                  }}
                />
                <List.Item
                  title="Seal"
                  onPress={function () {
                    setAnimalType("Seal");
                    closeAnimalDropdown();
                  }}
                />
                <List.Item
                  title="Bird"
                  onPress={function () {
                    setAnimalType("Bird");
                    closeAnimalDropdown();
                  }}
                />
              </List.Accordion>
            </List.Section>
            {/* Using as the list of Seal questions */}
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
                label="Where is the Animal Located?"
                onChangeText={setLocation}
            />

            <TextInput
                style={styles.input}
                mode="outlined"
                label="Is the animal still present?"
                onChangeText={setPresent}
            />
            {/*Make a drop down with Pup, Weaner, Juvenile, subAudult, Adult, Uknown*/}
            <TextInput
                style={styles.input}
                mode="outlined"
                label="How big is the animal?"
                onChangeText={setSize}
            />

            <TextInput
              style={styles.input}
              mode="outlined"
              label="Is the animal on the beach or in the water?"
              onChangeText={setSize}
            />

            {/* Questions Below only show up if Not seal is selected via the drop down */}
            {animalType === "Seal" ? null : (
              <View>
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Where is the Animal Located?"
                    onChangeText={setLocation}
                />
                <TextInput
                    style={styles.input}
                    mode="outlined"
                    label="Is the animal still present?"
                    onChangeText={setPresent}
                />
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
      </ScrollView>
    </View>
  );
};

export default SightForm;
