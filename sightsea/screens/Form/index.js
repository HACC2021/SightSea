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
  const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [validPhone, setValidPhone] = React.useState(false);
  const [mapRegion, setmapRegion] = React.useState({
    latitude: 21.315603,
    longitude: -157.858093,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [markerRegion, setmarkerRegion] = React.useState({
    lat: 21.315603,
    lng: -157.858093,
  });
  var mapProps = {
    center: {
      lat: 21.315603,
      lng: -157.858093,
    },
    zoom: 12,
  };

  const markerURL =
    "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png";

  const closeAnimalDropdown = () => {
    setShowAnimalDropDown(!showAnimalDropDown);
  };

  //window.alert(date.getHours() + ":" + date.getMinutes());
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("window submitted");
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

          <View style={styles.map}>
            {Platform.OS === "web" ? (
              <GoogleMapReact
                bootstrapURLKeys={
                  {
                    //google api key
                    //key: "AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0",
                  }
                }
                defaultCenter={mapProps.center}
                zoom={mapProps.zoom}
              >
                {/* markers on the map */}
                <Image
                  style={styles.marker}
                  source={markerURL}
                  lat={markerRegion.lat}
                  lng={markerRegion.lng}
                />
              </GoogleMapReact>
            ) : (
              <MapView style={styles.map} region={mapRegion}>
                <Marker key={0} coordinate={mapRegion} title={"Marker"} />
              </MapView>
            )}
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
      </ScrollView>
    </View>
  );
};

export default SightForm;
