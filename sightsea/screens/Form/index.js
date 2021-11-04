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

import MapView, { Marker } from "react-native-maps";

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
import { getFirestore, collection, addDoc } from "firebase/firestore";

//import Marker from "react-native-maps";
//import DropDown from "react-native-paper-dropdown";
//import DateTimePicker from "@react-native-community/datetimepicker";

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

  const [present, setPresent] = React.useState("");

  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);

  // In or out of water dropdown
  const [location, setLocation] = React.useState("Water");
  const [showLocationDropDown, setLocationDropDown] = React.useState(false);

  //Size drop down
  const [size, setSize] = React.useState("Unknown");
  const [showSizeDropDown, setSizeDropDown] = React.useState(false);

  //Sex drop down
  const [sex, setSex] = React.useState("Unknown");
  const [showSexDropDown, setSexDropDown] = React.useState(false);

  const [mapRegion, setmapRegion] = React.useState({
    latitude: 21.315603,
    longitude: -157.858093,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const closeAnimalDropdown = () => {
    setShowAnimalDropDown(!showAnimalDropDown);
  };

  const closeLocationDropdown = () => {
    setLocationDropDown(!showLocationDropDown);
  };

  const closeSizeDropdown = () => {
    setSizeDropDown(!showSizeDropDown);
  };

  const closeSexDropdown = () => {
    setSexDropDown(!showSexDropDown);
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

  //format the date for the form
  const currentDate = () => {
    var day = new Date().getDate();
    //append 0 to front of single digit days
    if (day.toString().length === 1) {
      day = 0 + "" + day
    }
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var lasttwo = year.toString().slice(-2);

    //MMDDYY as required
    var datestring = month + "" + day + "" + lasttwo
    return datestring;
  }

  //get the time in military format
  const currentTime = () => {
    var hour = new Date().getHours()
    var minutes = new Date().getMinutes()

    //HHMM in 24 time as required
    var time = hour + "" + minutes
    return time;
  }

  //format number form input
  const phoneNumFormat = () => {
    var first_three = phoneNum.toString().slice(0, 3);
    var middle_three = phoneNum.toString().slice(3, 6);
    var last_four = phoneNum.toString().slice(-4);

    var num = first_three + "-" + middle_three + "-" + last_four
    return num;

  }
  //window.alert(date.getHours() + ":" + date.getMinutes());
  const handleSubmit = (e) => {
    e.preventDefault();

    //All Required info for seal input
    var new_date = currentDate();
    var new_time = currentTime();
    var ticket = "XX" + "" + new_date + "" + new_time
    const hotline = "";
    const ticket_type = "I";
    const observer = name;
    var observer_phone = phoneNumFormat();
    const observer_type = "P";
    var observer_intitials = name.slice(0, 1) + observer_type;
    const sector = "";

    //is either land or water
    var location_data = location;

    const location_notes = "";
    const seal_present = present;
    const seal_size = size;
    const animal_sex = sex;
    const how_ident = "";
    const id_temp = "";
    const tag_number = "";
    const tag_side = "";
    const tag_color = "";
    const ID_PERM = "";
    const molt = "";
    const additional_ID = "";
    const id_verified = "";
    const seal_log = "";
    const pair = "";
    const volunteers = 0;
    const departed = "";
    const departed_date = "";
    const departed_time = "";
    const number_calls = 0;
    const other = "";

    window.alert(animal_sex);

  };

  async function inputTest ()  {
    window.alert("inside funciton")
    const db = getFirestore();
    try {
      const docRef = await addDoc(collection(db, "test"), {
        test2: "this is a 2nd test"
      });
      console.log("written: ", docRef.id);
      window.alert("success")
    } catch (e) {
      console.error("Error adding document: ", e);
      window.alert("There was an erro")
    }
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
                <Marker key={0} coordinate={mapRegion} title={"Marker"}/>
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
                  label="Where is the animal located?"
                  onChangeText={setLocation}
              />

              {/*Values of 1 for land and 0 for water */}
              <List.Section title="Is the animal in the water or on land?">
                <List.Accordion
                    title={location}
                    expanded={showLocationDropDown}
                    onPress={closeLocationDropdown}
                >
                  <List.Item
                      title="Water"
                      onPress={function () {
                        setLocation("Water");
                        closeLocationDropdown();
                      }}
                  />
                  <List.Item
                      title="Land"
                      onPress={function () {
                        setLocation("Land");
                        closeLocationDropdown();
                      }}
                  />
                </List.Accordion>
              </List.Section>

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

              {/*Make a drop down with Pup, Weaner, Juvenile, subAudult, Adult, Uknown*/}
              <List.Section title="How big is the animal?">
                <List.Accordion
                    title={size}
                    expanded={showSizeDropDown}
                    onPress={closeSizeDropdown}
                >
                  <List.Item
                      title="Pup"
                      onPress={function () {
                        setSize("Pup");
                        closeSizeDropdown();
                      }}
                  />
                  <List.Item
                      title="Weaner"
                      onPress={function () {
                        setSize("Weaner");
                        closeSizeDropdown();
                      }}
                  />
                  <List.Item
                      title="Juvenile"
                      onPress={function () {
                        setSize("Juvenile");
                        closeSizeDropdown();
                      }}
                  />
                  <List.Item
                      title="Subadult"
                      onPress={function () {
                        setSize("Subadult");
                        closeSizeDropdown();
                      }}
                  />
                  <List.Item
                      title="Adult"
                      onPress={function () {
                        setSize("Adult");
                        closeSizeDropdown();
                      }}
                  />
                  <List.Item
                      title="Unknown"
                      onPress={function () {
                        setSize("Unknown");
                        closeSizeDropdown();
                      }}
                  />

                </List.Accordion>
              </List.Section>


              {/*Make a drop down with male,female or unknown*/}
              <List.Section title="What is the sex of the Animal?">
                <List.Accordion
                    title={sex}
                    expanded={showSexDropDown}
                    onPress={closeSexDropdown}
                >
                  <List.Item
                      title="Male"
                      onPress={function () {
                        setSex("Male");
                        closeSexDropdown();
                      }}
                  />
                  <List.Item
                      title="Female"
                      onPress={function () {
                        setSex("Female");
                        closeSexDropdown();
                      }}
                  />
                  <List.Item
                      title="Unknown"
                      onPress={function () {
                        setSex("Unknown");
                        closeSexDropdown();
                      }}
                  />
                </List.Accordion>
              </List.Section>



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
