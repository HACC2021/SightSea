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
  HelperText,
  TouchableRipple,
} from "react-native-paper";

import PhoneInput from "react-native-phone-input";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  getDatabase,
  ref,
  onValue,
  set,
  child,
  get,
  runTransaction,
} from "firebase/database";
import * as Location from "expo-location";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import { sendEmail } from "../../scripts/send-email";

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
    margin: 20,
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

const SightForm = ({ navigation }) => {
  const [date, setDate] = React.useState(new Date());
  const [image, setImage] = React.useState("");
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [name, setName] = React.useState("");
  const [docID, setDocID] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);
  const [coordinate, setCoordinate] = React.useState({});
  const [location, setLocation] = React.useState("");
  const [allowLocation, setAllowLocation] = React.useState(null);
  const [turtleSize, setTurtleSize] = React.useState("");

  // Animal Type dropdown
  const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);

  // In or out of water dropdown
  const beachLocationList = ["Water", "Land"];
  const [beachLocationText, setBeachLocationText] = React.useState(
    beachLocationList[0]
  );
  const [showLocationDropDown, setLocationDropDown] = React.useState(false);
  var beachLocation = "Water";

  // Seal still present or not dropdown
  const presentList = ["Yes", "No"];
  const [presentText, setPresentText] = React.useState(presentList[0]);
  const [showPresentDropDown, setPresentDropDown] = React.useState(false);
  var present = "Yes";

  //Size drop down
  const sizeList = [
    "Pup",
    "Weaner",
    "Juvenile",
    "Subadult",
    "Adult",
    "Unknown",
  ];
  const [sizeText, setSizeText] = React.useState("Unknown");
  const [showSizeDropDown, setSizeDropDown] = React.useState(false);
  var size = "Unknown";

  //Sex drop down
  const sexList = ["Male", "Female", "Unknown"];
  const [sexText, setSexText] = React.useState("Unknown");
  const [showSexDropDown, setSexDropDown] = React.useState(false);
  var sex = "Unknown";

  //Island Dropdown
  const islandList = ["Oahu", "Maui", "Hawaii", "Kauai", "Molokai", "Unknown"];
  const [islandText, setIslandText] = React.useState(islandList[0]);
  const [showIslandDropDown, setIslandDropDown] = React.useState(false);
  var island = "Oahu";

  //Type of Turtle Drop Down
  const turtleList = ["Green Turtle", "Hawksbill Turtle", "Unknown"];
  const [turtleText, setTurtleText] = React.useState("Unknown");
  const [showTurtuleDropDown, setTurtleDropDown] = React.useState(false);
  var turtle = "Unknown";

  //Turtle Alive Drop Down
  const turtleStatusList = ["Alive", "Deceased", "Unknown"];
  const [turtleStatusText, setTurtleStatusText] = React.useState(
    turtleStatusList[0]
  );
  const [showTurtleStatus, setTurtleStatusDropDown] = React.useState(false);
  var turtleStatus = "Alive";

  //Type of Bird Drop Down
  const birdTypeList = [
    { name: "Blackfoot Albatross", initial: "BFAL" },
    { name: "Short Tail Albatross", initial: "STAL" },
    { name: "Albatross", initial: "Unknown" },
    { name: "Brown Booby", initial: "BRBO" },
    { name: "Masked Booby", initial: "MABO" },
    { name: "Red Footed Booby", initial: "RFBO" },
    { name: "Booby", initial: "Unknown" },
    { name: "Great Frigate", initial: "GRFR" },
    { name: "Blue Noddy", initial: "BGNO" },
    { name: "Brown Noddy", initial: "BRNO" },
    { name: "Noddy", initial: "Unknown" },
    { name: "Bonin Petrel", initial: "BOPE" },
    { name: "Bluwer's Petrel", initial: "BUPE" },
    { name: "Tristam's Storm Petrel", initial: "TRSP" },
    { name: "Petrel", initial: "Unknown" },
    { name: "Wedge Tail Shearwater", initial: "WTSH" },
    { name: "Newell Shearwater", initial: "NESH" },
    { name: "Christmas Shearwater", initial: "CHSH" },
    { name: "Shearwater", initial: "Unknown" },
    { name: "Gray-Black Tern", initial: "GRAT" },
    { name: "Sooty Tern", initial: "SOTE" },
    { name: "White Tern", initial: "WHTE" },
    { name: "Tern", initial: "Unknown" },
    { name: "Red Tail Tropicbird", initial: "RTTR" },
    { name: "White Tail Tropicbird", initial: "WTTR" },
    { name: "Tropicbird", initial: "Unknown" },
  ];
  const [birdTypeText, setBirdTypeText] = React.useState("Albatross");
  const [showBirdType, setBirdTypeDropDown] = React.useState(false);
  var birdType = "Albatross";

  const animalTypes = [
    { label: "Turtle", value: "turtle" },
    { label: "Bird", value: "bird" },
    { label: "Seal", value: "Seal" },
  ];

  const beachList = ["", "Turtle Bay", "Hanauma Bay", "Waimea Bay"];
  var beach = "";
  const [beachText, setBeachText] = React.useState(beach);
  const [showBeachDropDown, setBeachDropDown] = React.useState(false);

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

  const closeBeachDropdown = () => {
    setBeachDropDown(!showBeachDropDown);
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

  //component for list items
  function ListItem({ onItemClick, item, title, value, onChange, close }) {
    function onItemClick() {
      value = item;
      onChange(value);
      console.log(value);
      close();
    }

    return (
      <View onClick={onItemClick}>
        <List.Item title={title} onPress={() => onItemClick()}></List.Item>
      </View>
    );
  }

  //Get Information while the Page is Rendering
  React.useEffect(() => {
    //Get User Data Permission
    (async () => {
      //check if location is enabled by user
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setAllowLocation(false); //display beach drop down if location is not enabled
        return;
      }
      //get user current location
      setAllowLocation(true); //hide beach drop down if location is enabled
      let currentLocation = await Location.getCurrentPositionAsync({});
      setCurrentLocation(currentLocation);
    })();

    //Get camera roll permission on IOS and Andriod
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    //Get camera permissions on IOS and Andriod
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  //get location coordinate from currentLocation (location object)
  //return object: latitude, longitude, postal address
  function getUserLocation() {
    let locationCoordinate = {};
    let errorText = "Waiting..";

    if (errorMsg) {
      console.log(errorText);
      console.log("beachText = " + beachText);

      if (beachText == "") {
        locationCoordinate = { latitude: 21.302877, longitude: -157.84388 };
      } else {
        locationCoordinate = addressToCoordinate(beachText);
      }
    }

    //convert to postal address if no errors are found
    else if (currentLocation) {
      //convert to array of values
      const locationArray = Object.values(currentLocation);
      //store location coordinate in a object
      locationCoordinate["latitude"] = locationArray[0].latitude;
      locationCoordinate["longitude"] = locationArray[0].longitude;
    }
    setCoordinate(locationCoordinate);
  }

  //convert place name to gps coordinate object
  function addressToCoordinate(address) {
    let addressCoordinate = {};
    Location.setGoogleApiKey("AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0");
    Location.geocodeAsync(address).then((result) => {
      addressCoordinate["latitude"] = result[0].latitude;
      addressCoordinate["longitude"] = result[0].longitude;
    });

    return addressCoordinate;
  }

  //format number form input
  const phoneNumFormat = () => {
    var first_three = phoneNum.toString().slice(0, 3);
    var middle_three = phoneNum.toString().slice(3, 6);
    var last_four = phoneNum.toString().slice(-4);

    var num = first_three + "-" + middle_three + "-" + last_four;
    return num;
  };

  //Grab the Image from the UI of the Device
  //Works for Web and Andriod
  //TODO test for IOS
  const handleImageSelection = async () => {
    var newImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      //scale down to half of the incoming quality to
      //prevent overly large image submissions
      quality: 0.5,
    });

    console.log(JSON.stringify(newImage));
    //If an image was picked then store it
    if (!newImage.cancelled) {
      setImage(newImage.uri);
      // console.log(newImage.uri);
    }
  };

  const handleCameraSelection = async () => {
    var newImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      //scale down to half of the incoming quality to
      //prevent overly large image submissions
      quality: 0.5,
    });

    console.log(JSON.stringify(newImage));

    //If an image was picked then store it
    if (!newImage.cancelled) {
      setImage(newImage.uri);
      // console.log(newImage.uri);
    }
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
    const seal_present = presentText;
    const seal_size = sizeText;
    const animal_sex = sexText;
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
    console.log(
      "Seal_Present: " +
        presentText +
        " Size:  " +
        sizeText +
        " Sex: " +
        sexText
    );

    //get GPS location if location service is enabled
    getUserLocation();
    //filter to correct DB based on animal type
    var animalDB = animalType;
    //generate the random doc ID
    var localdocID = generateID();

    //Get the db Reference
    const db = getDatabase();
    var currentday = currentDate();
    var currenttime = currentTime();

    //21.302877, -157.843880
    const observer_type = "P";
    var intitials = name.slice(0, 1) + observer_type;
    //console.log(image);
    //check if the gps coordinate object is empty
    //window.alert(Object.keys(coordinate).length)

    //&& Object.keys(coordinate).length > 0
    if (animalDB === "Seal" && Object.keys(coordinate).length > 0) {
      //Seal Doc
      const reference = ref(db, `Unverified/documents/` + `${localdocID}`);
      set(reference, {
        AnimalType: animalDB,
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
        Location: beachText || "",
        Location_Notes: "",
        Seal_Present: presentText,
        Size: sizeText,
        Sex: sexText,
        Beach_Position: beachLocationText,
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
        Image: image,
      })
        .then(() => {
          window.alert("Report Submitted Successfully!");
          sendEmail(
            "felixclyde@gmail.com",
            "New Report, Staff action required!!!",
            `New report! See ticket number: ${
              "XX" + "" + currentday + "" + currenttime
            }`
          ).then(() => {
            console.log("Email sent!");
          });
          navigation.navigate("SightSea");
        })
        .catch((error) => {
          window.alert("Report Failed to submit.");
          //Should stay on page while throwing error
        });

      //&& Object.keys(coordinate).length > 0
    } else if (animalDB === "Turtle" && Object.keys(coordinate).length > 0) {
      //Turtle Doc
      const observer_type = "P";
      var intitials = name.slice(0, 1) + observer_type;

      const reference = ref(db, `Unverified/documents/` + `${localdocID}`);
      set(reference, {
        AnimalType: animalDB,
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
        Island: islandText,
        Sector: "",
        Location: beachText || "",
        Location_Notes: "",
        Type_of_Turtle: turtleText,
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
        Image: image,
      })
        .then(() => {
          window.alert("Report Submitted Successfully!");
          beach = "";
          console.log(coordinate);
          sendEmail(
            "felixclyde@gmail.com",
            "New Report, Staff action required!!!",
            `New report! See ticket number: ${
              "XX" + "" + currentday + "" + currenttime
            }`
          ).then(() => {
            console.log("Email sent!");
          });
          navigation.navigate("SightSea");
        })
        .catch((error) => {
          window.alert("Report Failed to submit.");
          //Should stay on page while throwing error
        });
      //&& Object.keys(coordinate).length > 0
    } else if (animalDB === "Bird" && Object.keys(coordinate).length > 0) {
      //For Bird Docs

      const reference = ref(db, `Unverified/documents/` + `${localdocID}`);
      set(reference, {
        AnimalType: animalDB,
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
        Location: beachText || "",
        Location_Notes: "",
        Type_of_Bird: birdTypeText,
        Responders_name: "",
        Delivered: "",
        Where_to: "",
        Outreach_provided_by_operator: "",
        Number_of_Calls_Received: 0,
        Other_Notes: "",
        Verified: "",
        Image: image,
      })
        .then(() => {
          window.alert("Report Submitted Successfully!");
          sendEmail(
            "felixclyde@gmail.com",
            "New Report, Staff action required!!!",
            `New report! See ticket number: ${
              "XX" + "" + currentday + "" + currenttime
            }`
          ).then(() => {
            console.log("Email sent!");
          });
          navigation.navigate("SightSea");
        })
        .catch((error) => {
          window.alert("Report Failed to submit.");
          //Should stay on page while throwing error
        });
    }

    //TODO Count not updating when at 0
    //Ensure it can update when at 0
    const countref = ref(db, `Unverified/`);
    runTransaction(countref, (post) => {
      if (post) {
        if (post.count) {
          post.count++;
        }
      }
      return post;
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          <Headline>Report a Sighting</Headline>
          <Subheading style={{ textAlign: "center", padding: 3 }}>
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

                {/*<HelperText type="error" visible= {true}>*/}
                {/*  This should display when there is an error.*/}
                {/*</HelperText>*/}

                <TextInput
                  style={styles.input}
                  onChangeText={setPhoneNum}
                  mode="outlined"
                  keyboardType="decimal-pad"
                  label="Phone number"
                />

                {/* Beach Drop Down */}
                {!allowLocation && (
                  <List.Section title="Where is the Seal located?">
                    <List.Accordion
                      title={beachText}
                      expanded={showBeachDropDown}
                      onPress={closeBeachDropdown}
                    >
                      {beachList.map((item, index) => {
                        return (
                          <ListItem
                            key={index}
                            title={item}
                            item={item}
                            value={beach}
                            onChange={setBeachText}
                            close={closeBeachDropdown}
                          />
                        );
                      })}
                    </List.Accordion>
                  </List.Section>
                )}

                {/*Values of 1 for land and 0 for water */}
                <List.Section title="Is the seal in the water or on land?">
                  <List.Accordion
                    title={beachLocationText}
                    expanded={showLocationDropDown}
                    onPress={closeLocationDropdown}
                  >
                    {beachLocationList.map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          title={item}
                          item={item}
                          value={beachLocation}
                          onChange={setBeachLocationText}
                          close={closeLocationDropdown}
                        />
                      );
                    })}
                  </List.Accordion>
                </List.Section>

                {/* Drop down for if the seal is still present or not*/}
                <List.Section title="Is the Seal still present?">
                  <List.Accordion
                    title={presentText}
                    expanded={showPresentDropDown}
                    onPress={closePresentDropdown}
                  >
                    {presentList.map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          title={item}
                          item={item}
                          value={present}
                          onChange={setPresentText}
                          close={closePresentDropdown}
                        />
                      );
                    })}
                  </List.Accordion>
                </List.Section>

                {/*Make a drop down with Pup, Weaner, Juvenile, subAudult, Adult, Uknown*/}
                <List.Section title="How big is the Seal?">
                  <List.Accordion
                    title={sizeText}
                    expanded={showSizeDropDown}
                    onPress={closeSizeDropdown}
                  >
                    {sizeList.map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          title={item}
                          item={item}
                          value={size}
                          onChange={setSizeText}
                          close={closeSizeDropdown}
                        />
                      );
                    })}
                  </List.Accordion>
                </List.Section>

                {/*Make a drop down with male,female or unknown*/}
                <List.Section title="Is the Seal Male or Female?">
                  <List.Accordion
                    title={sexText}
                    expanded={showSexDropDown}
                    onPress={closeSexDropdown}
                  >
                    {sexList.map((item, index) => {
                      return (
                        <ListItem
                          key={index}
                          title={item}
                          item={item}
                          value={sex}
                          onChange={setSexText}
                          close={closeSexDropdown}
                        />
                      );
                    })}
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
                        title={islandText}
                        expanded={showIslandDropDown}
                        onPress={closeIslandDropdown}
                      >
                        {islandList.map((item, index) => {
                          return (
                            <ListItem
                              key={index}
                              title={item}
                              item={item}
                              value={island}
                              onChange={setIslandText}
                              close={closeIslandDropdown}
                            />
                          );
                        })}
                      </List.Accordion>
                    </List.Section>

                    {/* Beach Drop Down */}
                    {!allowLocation && (
                      <List.Section title="Where is the Turtle located?">
                        <List.Accordion
                          title={beachText}
                          expanded={showBeachDropDown}
                          onPress={closeBeachDropdown}
                        >
                          {beachList.map((item, index) => {
                            return (
                              <ListItem
                                key={index}
                                title={item}
                                item={item}
                                value={beach}
                                onChange={setBeachText}
                                close={closeBeachDropdown}
                              />
                            );
                          })}
                        </List.Accordion>
                      </List.Section>
                    )}

                    {/*Type of Turtle Drop Down */}
                    <List.Section title="What type of Turtle is it?">
                      <List.Accordion
                        title={turtleText}
                        expanded={showTurtuleDropDown}
                        onPress={closeTurtleDropdown}
                      >
                        {turtleList.map((item, index) => {
                          return (
                            <ListItem
                              key={index}
                              title={item}
                              item={item}
                              value={turtle}
                              onChange={setTurtleText}
                              close={closeTurtleDropdown}
                            />
                          );
                        })}
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
                        title={turtleStatusText}
                        expanded={showTurtleStatus}
                        onPress={closeTurtleStatusDropdown}
                      >
                        {turtleStatusList.map((item, index) => {
                          return (
                            <ListItem
                              key={index}
                              title={item}
                              item={item}
                              value={turtleStatus}
                              onChange={setTurtleStatusText}
                              close={closeTurtleStatusDropdown}
                            />
                          );
                        })}
                      </List.Accordion>
                    </List.Section>
                  </View>
                ) : (
                  <View>
                    {/* Bird Specific Questions*/}

                    {/* Beach Drop Down */}
                    {!allowLocation && (
                      <List.Section title="Where is the Bird located?">
                        <List.Accordion
                          title={beachText}
                          expanded={showBeachDropDown}
                          onPress={closeBeachDropdown}
                        >
                          {beachList.map((item, index) => {
                            return (
                              <ListItem
                                key={index}
                                title={item}
                                item={item}
                                value={beach}
                                onChange={setBeachText}
                                close={closeBeachDropdown}
                              />
                            );
                          })}
                        </List.Accordion>
                      </List.Section>
                    )}

                    {/* Drop Down for Bird Type */}
                    {/* TODO Break out the Same types after they select the generic Type into seperate drop downs */}
                    <List.Section title="What type of Bird is it?">
                      <List.Accordion
                        title={birdTypeText}
                        expanded={showBirdType}
                        onPress={closeBirdTypeDropdown}
                      >
                        {birdTypeList.map((item, index) => {
                          return (
                            <ListItem
                              key={index}
                              title={item.name} //full name
                              item={item.initial} //letter symbols
                              value={birdType}
                              onChange={setBirdTypeText}
                              close={closeBirdTypeDropdown}
                            />
                          );
                        })}
                      </List.Accordion>
                    </List.Section>
                  </View>
                )}

                {/* Catch All For all three Types */}
              </View>
            )}

            {Platform.OS !== "web" ? (
              <View>
                {/*Only display the camera button on moblie */}
                <Button
                  stlye={styles.btn}
                  mode="contained"
                  onPress={() => handleCameraSelection()}
                >
                  Take an Image
                </Button>
              </View>
            ) : (
              <View>{/* Don't Return anything*/}</View>
            )}

            <Button
              stlye={styles.btn}
              mode="contained"
              onPress={() => handleImageSelection()}
            >
              Choose an Image
            </Button>
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
