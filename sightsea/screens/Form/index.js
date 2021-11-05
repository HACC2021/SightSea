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
import { getDatabase, ref, onValue, set, child, get } from 'firebase/database';

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

  const [docID, setDocID] = React.useState("");
  const [present, setPresent] = React.useState("");

  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);

  const [location, setLocation] = React.useState("");
  const [turtleSize, setTurtleSize] = React.useState("");

  // In or out of water dropdown
  const [beachLocation, setBeachLocation] = React.useState("Water");
  const [showLocationDropDown, setLocationDropDown] = React.useState(false);

  //Size drop down
  const [size, setSize] = React.useState("Unknown");
  const [showSizeDropDown, setSizeDropDown] = React.useState(false);

  //Sex drop down
  const [sex, setSex] = React.useState("Unknown");
  const [showSexDropDown, setSexDropDown] = React.useState(false);

  //Island Dropdown
  const [island, setIsland] = React.useState("Oahu");
  const [showIslandDropDown, setIslandDropDown] = React.useState(false);

  //Type of Turtle Drop Down
  const [turtle, setTurtle] = React.useState("Cm");
  const [showTurtuleDropDown, setTurtleDropDown] = React.useState(false);

  //Turtle Alive Drop Down
  const [turtleStatus, setTurtleStatus] = React.useState("Alive");
  const [showTurtleStatus, setTurtleStatusDropDown] = React.useState(false);


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

  const closeIslandDropdown = () => {
    setIslandDropDown(!showIslandDropDown);
  };

  const closeTurtleDropdown = () => {
    setTurtleDropDown(!showTurtuleDropDown);
  };

  const closeTurtleStatusDropdown = () => {
    setTurtleStatusDropDown(!showTurtleStatus);
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

  //Generate a random Document ID for each document
  const generateID = () => {
    const tempID = Math.floor(Math.random() * 100000).toString();
    //TODO need to poll the database to see if the random id exists before return

    return tempID;
  };

  function addDoc() {

    //filter to correct DB based on animal type
    var animalDB = animalType;
    //generate the random doc ID
    var localdocID = generateID();

    //submit via code below, may need to change via the type
    const db = getDatabase();
    var currentday = currentDate();
    var currenttime = currentTime();
    const observer_type = "P";
    var intitials = name.slice(0, 1) + observer_type;

    if (animalDB === "Seal") {
      const reference = ref(db, `${animalDB}/` + `${localdocID}`);
      set(reference, {
        Date: currentday,
        Time: currenttime,
        Ticket_Number: "XX" + "" + currentday + "" + currenttime,
        Hotline_Operator_Initials: "",
        ticket_type: "I",
        Observer: name,
        Observer_Contact_Nubmer: phoneNumFormat(),
        Observer_Type: "P",
        Observer_Initials: intitials,
        Sector: "",
        Location: location,
        Location_Notes: "",
        Seal_Present: present,
        Size: size,
        Sex: sex,
        Beach_Position: beachLocation,
        How_Identified: "",
        ID_temp: "",
        Tag_Number: "",
        Tag_Side: "",
        Tag_Color: "",
        ID_Perm: "",
        Molt: "",
        Additional_Notes_on_ID: "",
        ID_Verified_By: "",
        Seal_Logging: "",
        Mom_and_Pup_Pair: "",
        SRA_Set_Up: "",
        SRA_Set_By: "",
        Number_Volunteers_Engaged: 0,
        Seal_Depart_Info_Avial: "",
        Seal_Departed_Date: "",
        Seal_Departed_Time: "",
        Number_of_Calls_Received: 1,
        Other_Notes: "",
      }).then(() => {
        window.alert("Report Submitted Successfully!");
        //TODO back to main page
      }).catch((error) => {
        window.alert("Report Failed to submit.");
        //TODO Stay on page and flag errors
      });
    } else
      if (animalDB === "Turtle") {

        //Turtle Doc
        const observer_type = "P";
        var intitials = name.slice(0, 1) + observer_type;

        const reference = ref(db, `${animalDB}/` + `${localdocID}`);
        set(reference, {
          Date: currentday,
          Time: currenttime,
          Ticket_Number: "XX" + "" + currentday + "" + currenttime,
          Hotline_Operator_Initials: "",
          ticket_type: "R",
          Observer: name,
          Observer_Contact_Number: phoneNumFormat(),
          Observer_Initials: intitials,
          Observer_Type: "P",
          Island: island,
          Sector: "",
          Location: location,
          Location_Notes: "",
          Type_of_Turtle: turtle,
          Size: turtleSize,
          Stauts: turtleStatus,
          Primary_issue_or_cause_of_death: "",
          Responder: "",
          Time_Responder_left: "",
          Responder_arrival_time: "",
          Outreach_provided_by_operator: "",
          FAST: "",
          Number_of_Calls_Received: 1,
          Other_Notes: "",
        }).then(() => {
          window.alert("Report Submitted Successfully!");
          //TODO back to main page
        }).catch((error) => {
          window.alert("Report Failed to submit.");
          //TODO Stay on page and flag errors
        });

      } else {
        //For Bird Docs
        const reference = ref(db, `${animalDB}/` + `${localdocID}`);
        set(reference, {
          Date: currentday,
          Time: currenttime,
          Ticket_Number: "XX" + "" + currentday + "" + currenttime,
          Hotline_Operator_Initials: "",
          ticket_type: "I",
          Observer: name,
          Observer_Contact_Nubmer: phoneNumFormat(),
          Observer_Type: "P",
          Observer_Initials: intitials,
          Sector: "",
          Location: location,
          Location_Notes: "",
          Seal_Present: present,
          Size: size,
          Sex: sex,
          Beach_Position: beachLocation,
          How_Identified: "",
          ID_temp: "",
          Tag_Number: "",
          Tag_Side: "",
          Tag_Color: "",
          ID_Perm: "",
          Molt: "",
          Additional_Notes_on_ID: "",
          ID_Verified_By: "",
          Seal_Logging: "",
          Mom_and_Pup_Pair: "",
          SRA_Set_Up: "",
          SRA_Set_By: "",
          Number_Volunteers_Engaged: 0,
          Seal_Depart_Info_Avial: "",
          Seal_Departed_Date: "",
          Seal_Departed_Time: "",
          Number_of_Calls_Received: 1,
          Other_Notes: "",
        }).then(() => {
          window.alert("Report Submitted Successfully!");
          //TODO back to main page
        }).catch((error) => {
          window.alert("Report Failed to submit.");
          //TODO Stay on page and flag errors
        });
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

              {animalType === "Seal" ? (
                  <View>
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
                          title={beachLocation}
                          expanded={showLocationDropDown}
                          onPress={closeLocationDropdown}
                      >
                        <List.Item
                            title="Water"
                            onPress={function () {
                              setBeachLocation("Water");
                              closeLocationDropdown();
                            }}
                        />
                        <List.Item
                            title="Land"
                            onPress={function () {
                              setBeachLocation("Land");
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

                  </View>

              ) : (

                  <View>
                    {/* Questions for turtles and Birds*/}
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

                    {/*Island Drop Down */}
                    <List.Section title="Which Island are you Located on?">
                      <List.Accordion
                          title={island}
                          expanded={showIslandDropDown}
                          onPress={closeIslandDropdown}
                      >
                        <List.Item
                            title="Oahu"
                            onPress={function () {
                              setIsland("Oahu");
                              closeIslandDropdown();
                            }}
                        />
                        <List.Item
                            title="Maui"
                            onPress={function () {
                              setIsland("Maui");
                              closeIslandDropdown();
                            }}
                        />
                        <List.Item
                            title="Hawaii"
                            onPress={function () {
                              setIsland("Hawaii");
                              closeIslandDropdown();
                            }}
                        />
                        <List.Item
                            title="Kauai"
                            onPress={function () {
                              setIsland("Kauai");
                              closeIslandDropdown();
                            }}
                        />
                        <List.Item
                            title="Molokai"
                            onPress={function () {
                              setIsland("Molokai");
                              closeIslandDropdown();
                            }}
                        />
                        <List.Item
                            title="Uknown"
                            onPress={function () {
                              setIsland("Uknown");
                              closeIslandDropdown();
                            }}
                        />


                      </List.Accordion>
                    </List.Section>


                    <TextInput
                        style={styles.input}
                        mode="outlined"
                        label="Where is the animal located?"
                        onChangeText={setLocation}
                    />


                    {/*Turtle Specific Questions */}
                    {animalType === "Turtle" ? (

                        <View>
                          {/*Type of Turtle Drop Down */}
                          <List.Section title="What type of Turtle is it?">
                            <List.Accordion
                                title={turtle}
                                expanded={showTurtuleDropDown}
                                onPress={closeTurtleDropdown}
                            >
                              <List.Item
                                  title="Cm"
                                  onPress={function () {
                                    setTurtle("Cm");
                                    closeTurtleDropdown();
                                  }}
                              />
                              <List.Item
                                  title="Ei"
                                  onPress={function () {
                                    setTurtle("Ei");
                                    closeTurtleDropdown();
                                  }}
                              />
                              <List.Item
                                  title="Unknown"
                                  onPress={function () {
                                    setTurtle("Unknown");
                                    closeTurtleDropdown();
                                  }}
                              />
                            </List.Accordion>
                          </List.Section>

                          <TextInput
                              style={styles.input}
                              mode="outlined"
                              label="How big is the Turtle?"
                              onChangeText={setTurtleSize}
                          />

                          {/* Alive or Dead Drop Down */}
                          <List.Section title="Is the Turtle Alive?">
                            <List.Accordion
                                title={turtleStatus}
                                expanded={showTurtleStatus}
                                onPress={closeTurtleStatusDropdown}
                            >
                              <List.Item
                                  title="Alive"
                                  onPress={function () {
                                    setTurtleStatus("Alive");
                                    closeTurtleStatusDropdown();
                                  }}
                              />
                              <List.Item
                                  title="Deceased"
                                  onPress={function () {
                                    setTurtleStatus("Deceased");
                                    closeTurtleStatusDropdown();
                                  }}
                              />
                              <List.Item
                                  title="Unknown"
                                  onPress={function () {
                                    setTurtleStatus("Unknown");
                                    closeTurtleStatusDropdown();
                                  }}
                              />
                            </List.Accordion>
                          </List.Section>



                        </View>

                    ) : (

                        <View>
                          {/* Bird Specific Questions*/}

                        </View>

                    )}

                    {/* Catch All For all three Types */}
                    {/*<TextInput*/}
                    {/*    style={styles.input}*/}
                    {/*    mode="outlined"*/}
                    {/*    label="Describe any visible wounds (size/color)"*/}
                    {/*/>*/}
                    {/*<TextInput*/}
                    {/*    style={styles.input}*/}
                    {/*    mode="outlined"*/}
                    {/*    label="Describe any previous wounds (ex. amputated flipper)"*/}
                    {/*/>*/}
                    {/*<TextInput*/}
                    {/*    style={styles.input}*/}
                    {/*    mode="outlined"*/}
                    {/*    label="Describe the animal's behavior (ex. is it lethargic?)"*/}
                    {/*/>*/}
                    {/*<TextInput*/}
                    {/*    style={styles.input}*/}
                    {/*    mode="outlined"*/}
                    {/*    label="About what size is the animal?"*/}
                    {/*/>*/}


                  </View>

              )}

            </View>
            <Button style={styles.btn} mode="contained" onPress={() => addDoc()}>
              Submit
            </Button>
          </View>
        </ScrollView>
      </View>
  );
};

export default SightForm;
