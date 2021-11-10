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
  const { table }  = route.params;
  console.log(table);
  const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const animalTypes = [
    { label: "Turtle", value: "turtle" },
    { label: "Bird", value: "bird" },
    { label: "Seal", value: "Seal" },
  ];

  const closeAnimalDropdown = () => {
    setShowAnimalDropDown(!showAnimalDropDown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("form submitted");
  };

  function writeData() {

  }

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Headline>Report a Sighting</Headline>
                  <View>
                    <Surface>
                      { === "Seal" ? null : (
                          <Text style={styles.input}>Date: {table.Date}</Text>
                          <Text style={styles.input}>Delivered: {table.Delivered}</Text>
                          <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initals}</Text>
                          <Text style={styles.input}>Location: {table.Location}</Text>
                          <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
                          <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
                          <Text style={styles.input}>Observer: {table.Observer}</Text>
                          <Text style={styles.input}>Observer Number: {table.Observer_Number}</Text>
                          <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
                          <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
                          <Text style={styles.input}>Observer Notes: {table.Observer_Notes}</Text>
                          <Text style={styles.input}>Outreach Provided By Operator: {table.Outreach_Provided_By_Operator}</Text>
                          <Text style={styles.input}>Sector: {table.Sector}</Text>
                          <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
                          <Text style={styles.input}>Time: {table.Time}</Text>
                          <Text style={styles.input}>Type of Bird: {table.Type_of_Bird}</Text>
                          <Text style={styles.input}>Verified: {table.Verified}</Text>
                          <Text style={styles.input}>Where To: {table.Where_To}</Text>
                          <Text style={styles.input}>Ticket Type: {table.Ticket_Type}</Text>
                    </Surface>
                  </View>

             {/*    <View>*/}
              {/*      <Surface>*/}
              {/*        <Text style={styles.input}>Name:</Text>*/}
              {/*        <Text style={styles.input}>Date:</Text>*/}
              {/*        <Text style={styles.input}>Phone Number:</Text>*/}
              {/*        <Text style={styles.input}>Location:</Text>*/}
              {/*      </Surface>*/}
              {/*    </View>*/}
              {/*)}*/}
            </View>
            <Button style={styles.btn} mode="contained" onPress={handleSubmit}>
              Submit
            </Button>
        </View>
      </ScrollView>
  );
};

export default ViewReport;