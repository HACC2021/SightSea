import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

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
import { getDatabase, ref, onValue, set, child, get } from "firebase/database";
import * as Location from "expo-location";
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
    height: windowHeight * 0.5,
  },
  marker: {
    width: 50,
    height: 50,
  },
});
const SightForm = () => {
  const [date, setDate] = React.useState(new Date());
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [name, setName] = React.useState("");
  const [docID, setDocID] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);

  const [location, setLocation] = React.useState("");
  const [turtleSize, setTurtleSize] = React.useState("");

  // Animal Type dropdown
  const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);

  // In or out of water dropdown
  const [beachLocation, setBeachLocation] = React.useState("Water");
  const [showLocationDropDown, setLocationDropDown] = React.useState(false);

  // Seal still present or not dropdown
  const [present, setPresent] = React.useState("Yes");
  const [showPresentDropDown, setPresentDropDown] = React.useState(false);

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
  const [turtle, setTurtle] = React.useState("Unknown");
  const [showTurtuleDropDown, setTurtleDropDown] = React.useState(false);

  //Turtle Alive Drop Down
  const [turtleStatus, setTurtleStatus] = React.useState("Alive");
  const [showTurtleStatus, setTurtleStatusDropDown] = React.useState(false);

  //Type of Bird Drop Down
  const [birdType, setBirdType] = React.useState("Albatross");
  const [showBirdType, setBirdTypeDropDown] = React.useState(false);

  const animalTypes = [
    { label: "Turtle", value: "turtle" },
    { label: "Bird", value: "bird" },
    { label: "Seal", value: "Seal" },
  ];

  var coordinate = {};

  const closePresentDropdown = () => {
    setPresentDropDown(!showPresentDropDown);
  };

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

  const closeBirdTypeDropdown = () => {
    setBirdTypeDropDown(!showBirdType);
  };

  //format the date for the form
  const currentDate = () => {
    var day = new Date().getDate();
    //append 0 to front of single digit days
    if (day.toString().length === 1) {
      day = 0 + "" + day;
    }
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var lasttwo = year.toString().slice(-2);

    //MMDDYY as required
    var datestring = month + "" + day + "" + lasttwo;
    return datestring;
  };

  //get the time in military format
  const currentTime = () => {
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();

    //HHMM in 24 time as required
    var time = hour + "" + minutes;
    return time;
  };

  //get current user location
  React.useEffect(() => {
    (async () => {
      //check if location is enabled by user
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      //get user current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation(currentLocation);
    })();
  }, []);

  //get location coordinate from currentLocation (location object)
  //return object: latitude, longitude, postal address
  function getUserLocation() {
    let locationCoordinate = {};
    let errorText = "Waiting..";
    if (errorMsg) {
      //console.log(errorText);
      window.alert(errorText);
    }
    //convert to postal address if no errors are found
    else if (currentLocation) {
      //convert to array of values
      const locationArray = Object.values(currentLocation);
      //store location coordinate in a object
      locationCoordinate["latitude"] = locationArray[0].latitude;
      locationCoordinate["longitude"] = locationArray[0].longitude;
    }

    return locationCoordinate;
  }
  //format number form input
  const phoneNumFormat = () => {
    var first_three = phoneNum.toString().slice(0, 3);
    var middle_three = phoneNum.toString().slice(3, 6);
    var last_four = phoneNum.toString().slice(-4);

    var num = first_three + "-" + middle_three + "-" + last_four;
    return num;
  };

  //window.alert(date.getHours() + ":" + date.getMinutes());
  const handleSubmit = (e) => {
    e.preventDefault();

    //All Required info for seal input
    var new_date = currentDate();
    var new_time = currentTime();
    var ticket = "XX" + "" + new_date + "" + new_time;
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

  //get location coordinate
  coordinate = getUserLocation();

  function addDoc() {
    //filter to correct DB based on animal type
    var animalDB = animalType;
    //generate the random doc ID
    var localdocID = generateID();

    //Get the db Reference
    const db = getDatabase();

    var currentday = currentDate();

    var currenttime = currentTime();

    const observer_type = "P";
    var intitials = name.slice(0, 1) + observer_type;

    //check if the gps coordinate object is empty
    if (animalDB === "Seal" && Object.keys(coordinate).length > 0) {
      //Seal Doc
      const reference = ref(db, `${animalDB}/` + `${localdocID}`);
      set(reference, {
        GPS_Coordinate: {
          latitude: coordinate["latitude"],
          longitude: coordinate["longitude"],
        },
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
        Number_of_Calls_Received: 0,
        Other_Notes: "",
        Verified: "",
      })
        .then(() => {
          window.alert("Report Submitted Successfully!");
          //TODO back to main page
        })
        .catch((error) => {
          window.alert("Report Failed to submit.");
          //TODO Stay on page and flag errors
        });
    } else if (animalDB === "Turtle" && Object.keys(coordinate).length > 0) {
      //Turtle Doc
      const observer_type = "P";
      var intitials = name.slice(0, 1) + observer_type;

      const reference = ref(db, `${animalDB}/` + `${localdocID}`);
      set(reference, {
        GPS_Coordinate: {
          latitude: coordinate["latitude"],
          longitude: coordinate["longitude"],
        },
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
        Number_of_Calls_Received: 0,
        Other_Notes: "",
        Verified: "",
      })
        .then(() => {
          window.alert("Report Submitted Successfully!");
          //TODO back to main page
        })
        .catch((error) => {
          window.alert("Report Failed to submit.");
          //TODO Stay on page and flag errors
        });
    } else if (animalDB === "Bird" && Object.keys(coordinate).length > 0) {
      //For Bird Docs
      const reference = ref(db, `${animalDB}/` + `${localdocID}`);
      set(reference, {
        GPS_Coordinate: {
          latitude: coordinate["latitude"],
          longitude: coordinate["longitude"],
        },
        Date: currentday,
        Time: currenttime,
        Ticket_Number: "XX" + "" + currentday + "" + currenttime,
        Hotline_Operator_Initials: "",
        ticket_type: "C",
        Observer: name,
        Observer_Contact_Nubmer: phoneNumFormat(),
        Observer_Initials: intitials,
        Observer_Type: "P",
        Sector: "",
        Location: location,
        Location_Notes: "",
        Type_of_Bird: birdType,
        Responders_name: "",
        Delivered: "",
        Where_to: "",
        Outreach_provided_by_operator: "",
        Number_of_Calls_Received: 0,
        Other_Notes: "",
        Verified: "",
      })
        .then(() => {
          window.alert("Report Submitted Successfully!");
          //TODO back to main page
        })
        .catch((error) => {
          window.alert("Report Failed to submit.");
          //TODO Stay on page and flag errors
        });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Headline>Report a Sighting</Headline>
          <Subheading>
            Fill out the form below to submit a sighting and our staffs will
            review the submitted form shortly.
          </Subheading>
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
                  label="Where is the seal located?"
                  onChangeText={setLocation}
                />

                {/*Values of 1 for land and 0 for water */}
                <List.Section title="Is the seal in the water or on land?">
                  <List.Accordion
                    title={beachLocation}
                    expanded={showLocationDropDown}
                    onPress={closeLocationDropdown}
                  >
                    <List.Item
                      title="Water"
                      onPress={function () {
                        setBeachLocation(0);
                        closeLocationDropdown();
                      }}
                    />
                    <List.Item
                      title="Land"
                      onPress={function () {
                        setBeachLocation(1);
                        closeLocationDropdown();
                      }}
                    />
                  </List.Accordion>
                </List.Section>

                {/* Drop down for if the seal is still present or not*/}
                <List.Section title="Is the Seal still present?">
                  <List.Accordion
                    title={present}
                    expanded={showPresentDropDown}
                    onPress={closePresentDropdown}
                  >
                    <List.Item
                      title="Yes"
                      onPress={function () {
                        setPresent("Y");
                        closePresentDropdown();
                      }}
                    />
                    <List.Item
                      title="No"
                      onPress={function () {
                        setPresent("N");
                        closePresentDropdown();
                      }}
                    />
                  </List.Accordion>
                </List.Section>

                {/*Make a drop down with Pup, Weaner, Juvenile, subAudult, Adult, Uknown*/}
                <List.Section title="How big is the Seal?">
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
                <List.Section title="Is the Seal Male or Female?">
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

                {/*Turtle Specific Questions */}
                {animalType === "Turtle" ? (
                  <View>
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
                      label="Where is the Turtle located?"
                      onChangeText={setLocation}
                    />

                    {/*Type of Turtle Drop Down */}
                    <List.Section title="What type of Turtle is it?">
                      <List.Accordion
                        title={turtle}
                        expanded={showTurtuleDropDown}
                        onPress={closeTurtleDropdown}
                      >
                        <List.Item
                          title="Green Turtle"
                          onPress={function () {
                            setTurtle("Cm");
                            closeTurtleDropdown();
                          }}
                        />
                        <List.Item
                          title="Hawksbill Turtle"
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

                    <TextInput
                      style={styles.input}
                      mode="outlined"
                      label="Where is the Bird located?"
                      onChangeText={setLocation}
                    />

                    {/* Drop Down for Bird Type */}
                    {/* TODO Break out the Same types after they select the generic Type into seperate drop downs */}
                    <List.Section title="What type of Bird is it?">
                      <List.Accordion
                        title={birdType}
                        expanded={showBirdType}
                        onPress={closeBirdTypeDropdown}
                      >
                        <List.Item
                          title="Blackfoot Albatross"
                          onPress={function () {
                            setBirdType("BFAL");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Short Tail Albatross"
                          onPress={function () {
                            setBirdType("STAL");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Albatross"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Brown Booby"
                          onPress={function () {
                            setBirdType("BRBO");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Masked Booby"
                          onPress={function () {
                            setBirdType("MABO");
                            closeBirdTypeDropdown();
                          }}
                        />

                        <List.Item
                          title="Red Footed Booby"
                          onPress={function () {
                            setBirdType("RFBO");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Booby"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Great Frigate"
                          onPress={function () {
                            setBirdType("GRFR");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Blue Noddy"
                          onPress={function () {
                            setBirdType("BGNO");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Brown Noddy"
                          onPress={function () {
                            setBirdType("BRNO");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Noddy"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Bonin Petrel"
                          onPress={function () {
                            setBirdType("BOPE");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Bluwer's Petrel"
                          onPress={function () {
                            setBirdType("BUPE");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Tristam's Storm Petrel"
                          onPress={function () {
                            setBirdType("TRSP");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Petrel"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Wedge Tail Shearwater"
                          onPress={function () {
                            setBirdType("WTSH");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Newell Shearwater"
                          onPress={function () {
                            setBirdType("NESH");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Christmas Shearwater"
                          onPress={function () {
                            setBirdType("CHSH");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Shearwater"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Gray-Black Tern"
                          onPress={function () {
                            setBirdType("GRAT");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Sooty Tern"
                          onPress={function () {
                            setBirdType("SOTE");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="White Tern"
                          onPress={function () {
                            setBirdType("WHTE");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Tern"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Red Tail Tropicbird"
                          onPress={function () {
                            setBirdType("RTTR");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="White Tail Tropicbird"
                          onPress={function () {
                            setBirdType("WTTR");
                            closeBirdTypeDropdown();
                          }}
                        />
                        <List.Item
                          title="Tropicbird"
                          onPress={function () {
                            setBirdType("Unknown");
                            closeBirdTypeDropdown();
                          }}
                        />
                      </List.Accordion>
                    </List.Section>
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
