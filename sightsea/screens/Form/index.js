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
//import Marker from "react-native-maps";
//import DropDown from "react-native-paper-dropdown";
//import DateTimePicker from "@react-native-community/datetimepicker";

import {sendEmail} from '../../scripts/send-email';

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

  const beachList = ["", "Turtle Bay", "Hanauma Bay", "Waimea Bay"];
  var beach = "";
  const [beachText, setBeachText] = React.useState(beachList[0]);
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

  //component for listitem
  function ListItem({ onItemClick, item, title }) {
    function onItemClick() {
      beach = item;
      setBeachText(beach);
      window.alert(beach);
      closeBeachDropdown();
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
        //setErrorMsg("Permission to access location was denied");
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
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
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
    else
      if (currentLocation) {
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

    console.log(JSON.stringify(newImage))
    //If an image was picked then store it
    if (!newImage.cancelled) {
      setImage(newImage.uri);
    }
  }

  //Function to ask for permission to the camera roll
//   const cameraRollPermissions = async () => {
//     if (Platform.OS !== "web") {
//       const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         alert(
//           "Please grant camera roll permissions inside your system's settings"
//         );
//       } else {
//         console.log("Media Permissions are granted");
//       }
//     }
//     //No need to premission check on Web
//   };
// >>>>>>> main

  //Grab the image from the camera
  //Works for Andriod, should be hidden on web
  //TODO test for IOS

  const handleCameraSelection = async () => {
//     var newImage = await ImagePicker.launchCameraAsync();
//
//     console.log(JSON.stringify(newImage))
// =======
//   const handleImageSubmit = async () => {
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
    if (animalDB === "Seal") {
      //Seal Doc
      const reference = ref(db, `Unverified/documents/` + `${localdocID}`);
      set(reference, {
        AnimalType: animalDB,
        GPS_Coordinate: {
          latitude: 21.302877,
          longitude: -157.843880,
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
        Image: image,
      })
          .then(() => {
            window.alert("Report Submitted Successfully!");
            sendEmail('felixclyde@gmail.com',
                'New Report, Staff action required!!!',
                `New report! See ticket number: ${"XX" + "" + currentday + "" + currenttime}`).
            then(()=>{
              console.log('Email sent!')
            })
            navigation.navigate("SightSea")
          })
          .catch((error) => {
            window.alert("Report Failed to submit.");
            //Should stay on page while throwing error
          });

      //&& Object.keys(coordinate).length > 0
    } else
      if (animalDB === "Turtle") {
        //Turtle Doc
        const observer_type = "P";
        var intitials = name.slice(0, 1) + observer_type;

        const reference = ref(db, `Unverified/documents/` + `${localdocID}`);
        set(reference, {
          AnimalType: animalDB,
          GPS_Coordinate: {
            latitude: 21.302877,
            longitude: -157.843880,
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
          Location: beachText || "",
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
          Image: image,
        })
            .then(() => {
              window.alert("Report Submitted Successfully!");
              beach = "";
              console.log(coordinate);
              sendEmail('felixclyde@gmail.com',
                  'New Report, Staff action required!!!',
                  `New report! See ticket number: ${"XX" + "" + currentday + "" + currenttime}`).
              then(()=>{
                console.log('Email sent!')
              })
              navigation.navigate("SightSea");
            })
            .catch((error) => {
              window.alert("Report Failed to submit.");
              //Should stay on page while throwing error
            });
        //&& Object.keys(coordinate).length > 0
      } else
        if (animalDB === "Bird") {
          //For Bird Docs

          const reference = ref(db, `Unverified/documents/` + `${localdocID}`);
          set(reference, {
            AnimalType: animalDB,
            GPS_Coordinate: {
              latitude: 21.302877,
              longitude: -157.843880,
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
            Type_of_Bird: birdType,
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
                sendEmail('felixclyde@gmail.com',
                    'New Report, Staff action required!!!',
                    `New report! See ticket number: ${"XX" + "" + currentday + "" + currenttime}`).
                then(()=>{
                  console.log('Email sent!')
                })
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
                                  <ListItem key={index} title={item} item={item}/>
                              );
                            })}
                          </List.Accordion>
                        </List.Section>
                    )}

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
                                        <ListItem key={index} title={item} item={item}/>
                                    );
                                  })}
                                </List.Accordion>
                              </List.Section>
                          )}

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
                                        <ListItem key={index} title={item} item={item}/>
                                    );
                                  })}
                                </List.Accordion>
                              </List.Section>
                          )}

                        </View>
                    )}

                    {/* Catch All For all three Types */}

                  </View>
              )}

              {Platform.OS !== 'web' ? (
                  <View>
                    {/*Only display the camera button on moblie */}
                    <Button stlye={styles.btn} mode="contained" onPress={() => handleCameraSelection()}>
                      Take an Image
                    </Button>
                  </View>
              ) : (
                  <View>
                    {/* Don't Return anything*/}
                  </View>

              )}

              <Button stlye={styles.btn} mode="contained" onPress={() => handleImageSelection()}>
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