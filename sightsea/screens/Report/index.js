import React from "react";
import { getDatabase, ref, onValue, once } from "firebase/database";
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
const ViewReport = () => {
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

  const closeAnimalDropdown = () => {
    setShowAnimalDropDown(!showAnimalDropDown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("form submitted");
  };

  const db = getDatabase();
  const birdReference = ref(db, "/Bird/documents");
  onValue(birdReference, (snapshot) => {
    var data = snapshot.val();
    for(let i in data) {
      console.log(data[i]);
    }
  })

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <Headline>Report a Sighting</Headline>
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
              {animalType === "Seal" ? null : (
                  <View>
                    <Surface>
                      <Text style={styles.input}>Name:</Text>
                      <Text style={styles.input}>Date:</Text>
                      <Text style={styles.input}>Phone Number:</Text>
                      <Text style={styles.input}>Location:</Text>
                    </Surface>
                  </View>
              )}
            </View>
            {/*<Button style={styles.btn} mode="contained" onPress={handleSubmit}>*/}
            {/*  Submit*/}
            {/*</Button>*/}
          </View>
        </View>
      </ScrollView>
  );
};

export default ViewReport;