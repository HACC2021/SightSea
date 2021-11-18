import React from "react";
import { getDatabase, ref, onValue, once, set } from "firebase/database";
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
  Surface,
} from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import GoogleMapReact from "google-map-react";

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
  surface: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
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
const ViewReport = ({route, navigation}) => {
  const { table, animal, documentID }  = route.params;
  // const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);

  const [date, setDate] = React.useState(new Date());
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [docID, setDocID] = React.useState("");

  const [location, setLocation] = React.useState("");
  const [turtleSize, setTurtleSize] = React.useState("");

  // Animal Type dropdown
  const [animalType, setAnimalType] = React.useState("Turtle");

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

  // const animalTypes = [
  //   { label: "Turtle", value: "turtle" },
  //   { label: "Bird", value: "bird" },
  //   { label: "Seal", value: "Seal" },
  // ];

  const closeAnimalDropdown = () => {
    setShowAnimalDropDown(!showAnimalDropDown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("form submitted");
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

  //format number form input
  const phoneNumFormat = () => {
    var first_three = phoneNum.toString().slice(0, 3);
    var middle_three = phoneNum.toString().slice(3, 6);
    var last_four = phoneNum.toString().slice(-4);

    var num = first_three + "-" + middle_three + "-" + last_four;
    return num;
  };

  function addDoc() {
    //Get the db Reference
    const db = getDatabase();
    var currentday = currentDate();
    var currenttime = currentTime();
    const observer_type = "P";
    var intitials = name.slice(0, 1) + observer_type;

    if (animal === "Seal") {
      //Seal Doc
      const reference = ref(db, `${animal}/documents/` + documentID);
      update(reference, {
        // Date: birdDate.value,
        // Time: birdTime.value,
        // Ticket_Number: birdTicketNum.value,
        // Hotline_Operator_Initials: birdHOI.value,
        // ticket_type: birdTicketType.value,
        // Observer: birdObserver.value,
        // Observer_Contact_Nubmer: birdOCN.value,
        // Observer_Type: birdObsType.value,
        // Observer_Initials: birdObsInitials.value,
        // Sector: birdSector.value,
        // Location: birdLocation.value,
        // Location_Notes: birdLocNotes.value,
        // Seal_Present: present,
        // Size: size,
        // Sex: sex,
        // Beach_Position: beachLocation,
        // How_Identified: "",
        // ID_temp: "",
        // Tag_Number: "",
        // Tag_Side: "",
        // Tag_Color: "",
        // ID_Perm: "",
        // Molt: "",
        // Additional_Notes_on_ID: "",
        // ID_Verified_By: "",
        // Seal_Logging: "",
        // Mom_and_Pup_Pair: "",
        // SRA_Set_Up: "",
        // SRA_Set_By: "",
        // Number_Volunteers_Engaged: 0,
        // Seal_Depart_Info_Avial: "",
        // Seal_Departed_Date: "",
        // Seal_Departed_Time: "",
        // Number_of_Calls_Received: 0,
        // Other_Notes: "",
        // Verified: "",
      })
          .then(() => {
            window.alert("Report Submitted Successfully!");
            //TODO back to main page
          })
          .catch((error) => {
            window.alert("Report Failed to submit.");
            //TODO Stay on page and flag errors
          });
    } else if (animal === "Turtle") {
      //Turtle Doc
      const observer_type = "P";
      var intitials = name.slice(0, 1) + observer_type;

      const reference = ref(db, `${animal}/documents/` + documentID);
      set(reference, {
        // Date: currentday,
        // Time: currenttime,
        // Ticket_Number: "XX" + "" + currentday + "" + currenttime,
        // Hotline_Operator_Initials: "",
        // ticket_type: "R",
        // Observer: name,
        // Observer_Contact_Number: phoneNumFormat(),
        // Observer_Initials: intitials,
        // Observer_Type: "P",
        // Island: island,
        // Sector: "",
        // Location: location,
        // Location_Notes: "",
        // Type_of_Turtle: turtle,
        // Size: turtleSize,
        // Stauts: turtleStatus,
        // Primary_issue_or_cause_of_death: "",
        // Responder: "",
        // Time_Responder_left: "",
        // Responder_arrival_time: "",
        // Outreach_provided_by_operator: "",
        // FAST: "",
        // Number_of_Calls_Received: 0,
        // Other_Notes: "",
        // Verified: "",
      })
          .then(() => {
            window.alert("Report Submitted Successfully!");
            //TODO back to main page
          })
          .catch((error) => {
            window.alert("Report Failed to submit.");
            //TODO Stay on page and flag errors
          });
    } else if (animal === "Bird") {
      //For Bird Docs
      // UGLY CODE WILL FIX LATER
      const reference = ref(db, `${animal}/documents/` + documentID);
      set(reference, {
        // Date: birdDate.value,
        // Time: birdTime.value,
        // Ticket_Number: birdTicketNum.value,
        // Hotline_Operator_Initials: birdHOI.value,
        // ticket_type: birdTicketType.value,
        // Observer: birdObserver.value,
        Observer_Contact_Number: table.Observer_Contact_Number,
        // Observer_Type: birdObsType.value,
        // Observer_Initials: birdObsInitials.value,
        // Sector: birdSector.value,
        // Location: birdLocation.value,
        // Location_Notes: birdLocNotes.value,
        // Type_of_Bird: birdType.value,
        // Responders_name: birdRespName.value,
        // Delivered: birdDelivered.value,
        // Where_to: birdWhereTo.value,
        // Outreach_provided_by_operator: birdOPBO.value,
        // Number_of_Calls_Received: birdNOCR.value,
        // Other_Notes: birdOtherNotes.value,
        // Verified: birdVerified.value,
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Headline>Report a Sighting</Headline>
            { animal === "Bird" ? (
                <View>
                  <Surface>
                    <Text style={styles.input}>Date: {table.Date}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdDate"*/}
                    {/*    style={styles.input}*/}
                    {/*    // value={table.Date}*/}
                    {/*    // onPress={() => this.setState({ disabled: false })}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Delivered: {table.Delivered}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdDelivered"*/}
                    {/*    style={styles.input} onChangeText={setName}*/}
                    {/*    value={table.Delivered}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initals}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdHOI"*/}
                    {/*    style={styles.input} onChangeText={setName}*/}
                    {/*    value={table.Hotline_Operator_Initals}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Location: {table.Location}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdLocation"*/}
                    {/*    style={styles.input} onChangeText={setName}*/}
                    {/*    value={table.Location}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdLocNotes"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Location_Notes}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdNOCR"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Number_of_Calls_Received}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    {/*good*/}
                    <Text style={styles.input}>Observer: {table.Observer}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdObserver"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Observer}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Observer Number: {table.Observer_Contact_Number}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdObsNum"*/}
                    {/*    style={styles.input} onChangeText={setPhoneNum} value={table.Observer_Contact_Number}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdObsInitials"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Observer_Initials}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdObsType"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Observer_Type}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Other Notes: {table.Other_Notes}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdObsNotes"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Other_Notes}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Outreach Provided By Operator: {table.Outreach_Provided_By_Operator}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdOPBO"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Outreach_Provided_By_Operator}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Responders Name: {table.Responders_name}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdRespName"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Responders_name}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Sector: {table.Sector}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdSector"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Sector}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdTicketNum"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Ticket_Number}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Time: {table.Time}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdTime"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Time}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Type of Bird: {table.Type_of_Bird}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdType"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Type_of_Bird}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Verified: {table.Verified}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdVerified"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Verified}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Where To: {table.Where_To}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdWhere"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Where_To}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                    <Text style={styles.input}>Ticket Type: {table.Ticket_Type}</Text>
                    {/*<TextInput*/}
                    {/*    id="birdTicketType"*/}
                    {/*    style={styles.input} onChangeText={setName} value={table.Ticket_Type}*/}
                    {/*>*/}
                    {/*</TextInput>*/}
                  </Surface>
                </View>
            ) : animal === "Seal" ? (
                <View>
                  <Surface>
                    <Text style={styles.input}>Additional Notes on ID: {table.Additional_Notes_on_ID}</Text>
                    <Text style={styles.input}>Beach Position: {table.Beach_Position}</Text>
                    <Text style={styles.input}>Date: {table.Date}</Text>
                    <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initals}</Text>
                    <Text style={styles.input}>How Identified: {table.How_Identified}</Text>
                    <Text style={styles.input}>ID Perm: {table.ID_Perm}</Text>
                    <Text style={styles.input}>ID Verified By: {table.ID_Verified_By}</Text>
                    <Text style={styles.input}>ID Temp: {table.ID_temp}</Text>
                    <Text style={styles.input}>Location: {table.Location}</Text>
                    <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
                    <Text style={styles.input}>Molt: {table.Molt}</Text>
                    <Text style={styles.input}>Mom and PupPair: {table.Mom_and_Pup_Pair}</Text>
                    <Text style={styles.input}>Number of Volunteers Engaged: {table.Number_Volunteers_Engaged}</Text>
                    <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
                    <Text style={styles.input}>Observer: {table.Observer}</Text>
                    <Text style={styles.input}>Observer Number: {table.Observer_Contact_Number}</Text>
                    <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
                    <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
                    <Text style={styles.input}>ObserverO Notes: {table.Other_Notes}</Text>
                    <Text style={styles.input}>SRA Set By: {table.SRA_Set_By}</Text>
                    <Text style={styles.input}>SRA Set Up: {table.SRA_Set_Up}</Text>
                    <Text style={styles.input}>Seal Depart Info Avial: {table.Seal_Depart_Info_Avial}</Text>
                    <Text style={styles.input}>Seal Departed Date: {table.Seal_Departed_Date}</Text>
                    <Text style={styles.input}>Seal Departed Time: {table.Seal_Departed_Time}</Text>
                    <Text style={styles.input}>Seal Logging: {table.Seal_Logging}</Text>
                    <Text style={styles.input}>Seal Present: {table.Seal_Present}</Text>
                    <Text style={styles.input}>Sector: {table.Sector}</Text>
                    <Text style={styles.input}>Sex: {table.Sex}</Text>
                    <Text style={styles.input}>Size: {table.Size}</Text>

                    <Text style={styles.input}>Tag Color: {table.Tag_Color}</Text>
                    <Text style={styles.input}>Tag Number: {table.Tag_Number}</Text>
                    <Text style={styles.input}>Tag Side: {table.Tag_Side}</Text>

                    <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
                    <Text style={styles.input}>Time: {table.Time}</Text>
                    <Text style={styles.input}>Verified: {table.Verified}</Text>
                    <Text style={styles.input}>Ticket Type: {table.Ticket_Type}</Text>
                  </Surface>
                </View>
            ) : (
                <View>
                  <Surface>
                    <Text style={styles.input}>Date: {table.Date}</Text>
                    <Text style={styles.input}>FAST: {table.FAST}</Text>
                    <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initals}</Text>
                    <Text style={styles.input}>Island: {table.Island}</Text>

                    <Text style={styles.input}>Location: {table.Location}</Text>
                    <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
                    <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
                    <Text style={styles.input}>Observer: {table.Observer}</Text>
                    <Text style={styles.input}>Observer Number: {table.Observer_Contact_Number}</Text>
                    <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
                    <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
                    <Text style={styles.input}>Other Notes: {table.Other_Notes}</Text>
                    <Text style={styles.input}>Outreach Provided By Operator: {table.Outreach_Provided_By_Operator}</Text>
                    <Text style={styles.input}>Primary issue or cause of death: {table.Primary_issue_or_cause_of_death}</Text>
                    <Text style={styles.input}>Responder: {table.Responder}</Text>
                    <Text style={styles.input}>Responder Arrival Time: {table.Responder_arrival_time}</Text>
                    <Text style={styles.input}>Sector: {table.Sector}</Text>
                    <Text style={styles.input}>Size: {table.Size}</Text>
                    <Text style={styles.input}>Status: {table.Stauts}</Text>
                    <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
                    <Text style={styles.input}>Time: {table.Time}</Text>
                    <Text style={styles.input}>Time Responder Left: {table.Time_Responder_left}</Text>
                    <Text style={styles.input}>Type of Turtle: {table.Type_of_Turtle}</Text>
                    <Text style={styles.input}>Verified: {table.Verified}</Text>
                    <Text style={styles.input}>Ticket Type: {table.Ticket_Type}</Text>
                  </Surface>
                </View>
            )}
          </View>
          <Button style={styles.btn} mode="contained" onPress={() => addDoc()}>
            Update
          </Button>
        </View>
      </ScrollView>
  );
};

export default ViewReport;