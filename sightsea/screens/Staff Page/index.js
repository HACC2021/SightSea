import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Component from "react";
import Proptypes from "prop-types";
import { DataTable, Checkbox, Modal, Portal } from "react-native-paper";
import GoogleMapReact from "google-map-react";
import MapView, { Marker } from "react-native-maps";
import ExportDatabase from "../../scripts/ExportDatabase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  // input: {
  //   height: 40,
  //   margin: 12,
  //   borderWidth: 1,
  //   padding: 10,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  header: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: "bold",
    borderWidth: 3,
    textAlign: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  secondaryheader: {
    fontSize: 30,
    marginTop: 40,
    fontWeight: "bold",
    borderWidth: 3,
    textAlign: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableContainer: {},
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
  columns: {
    width: 100,
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    width: 100,
    flex: 1,
    justifyContent: "space-between",
  },
  map: {
    width: 800,
    height: 600,
  },
  marker: {
    width: 50,
    height: 50,
  },
  containerStyle: {
    width: 100,
    height: 100,
    backgroundColor: "white",
  },
});

//searchable table of reports
//should default to display most recent 5 only then
//after search should refresh with search target values

//Need to place reports on Oahu/Google Map,
// as pins with accurate locations form the reports that
// are being displayed

//protected route/login
const StaffPage = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //get window dimensions
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const markerURL =
    "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png";
  const [checked, setChecked] = React.useState(false);
  //define map props
  const [mapRegion, setmapRegion] = React.useState({
    latitude: 21.315603,
    longitude: -157.858093,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
    center: {
      lat: 21.315601,
      lng: -157.85809,
    },
    zoom: 12,
  });
  const [markerRegion, setmarkerRegion] = React.useState({
    lat: 21.315603,
    lng: -157.858093,
  });
  //console.log("Checked :", checked)
  const Assign = (e) => {
    e.preventDefault();
    console.log("Assign to volunteer");
  };

  const markers = [
    {
      lat: 21.315601,
      lng: -157.95813,
    },
    {
      lat: 21.315601,
      lng: -157.85813,
    },
  ];

  //marker image
  const WebMarker = () => {
    function handleMarkerClick() {
      window.alert("Clicked");
    }

    return (
      <div onClick={handleMarkerClick}>
        {/* Render shipImage image */}
        <img src={markerURL} alt="Logo" width={50} height={50} />
      </div>
    );
  };

  //marker component
  const Markers = () => {
    return (
      <View>
        {markers.map((marker, index) => {
          <WebMarker
            style={styles.marker}
            source={markerURL}
            lat={marker.lat}
            lng={marker.lng}
            key={index}
          />;
        })}
      </View>
    );
  };

  return (
    //Can only return 1 view object for Andriod
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <Text style={styles.header}>Approve Reports</Text>

          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.columns}>
                Date & Time
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>Location</DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Identifying Markings
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>Behavior</DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Crowd Size
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>Name</DataTable.Title>
              <DataTable.Title style={styles.columns}> Phone #</DataTable.Title>
              <DataTable.Title style={styles.columns}>Images</DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Assigned?{" "}
              </DataTable.Title>
            </DataTable.Header>
            {/* Loop over new reports and display them here */}
            <DataTable.Row>
              <DataTable.Cell style={styles.row}>Today 1:00 PM</DataTable.Cell>
              <DataTable.Cell style={styles.row}>Sandys</DataTable.Cell>
              <DataTable.Cell style={styles.row}>Spot on Head</DataTable.Cell>
              <DataTable.Cell style={styles.row}>Erratic</DataTable.Cell>
              <DataTable.Cell style={styles.row}>40 People</DataTable.Cell>
              <DataTable.Cell style={styles.row}>Patrick</DataTable.Cell>
              <DataTable.Cell style={styles.row}>123-4567</DataTable.Cell>
              <DataTable.Cell style={styles.row}>None.</DataTable.Cell>
              <DataTable.Cell style={styles.row}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                ></Checkbox>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>

          {/*Assign to volunteer page */}

          <Button
            style={styles.button}
            title="Assign"
            onPress={Assign}
          ></Button>
          <Text style={styles.secondaryheader}>Reports</Text>

          {/* Display map with pins for ALL new reports */}

          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.columns}>
                Date & Time
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>Location</DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Identifying Markings
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>Behavior</DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Crowd Size
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>Name</DataTable.Title>
              <DataTable.Title style={styles.columns}> Phone #</DataTable.Title>
              <DataTable.Title style={styles.columns}>Images</DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Volunteer
              </DataTable.Title>
            </DataTable.Header>
            {/* Loop over all reports and display them here */}
            <DataTable.Row>
              <DataTable.Cell>Today 1:00 PM</DataTable.Cell>
              <DataTable.Cell>Sandys</DataTable.Cell>
              <DataTable.Cell>Spot on Head</DataTable.Cell>
              <DataTable.Cell>Erratic</DataTable.Cell>
              <DataTable.Cell>40 People</DataTable.Cell>
              <DataTable.Cell>Patrick</DataTable.Cell>
              <DataTable.Cell>123-4567</DataTable.Cell>
              <DataTable.Cell>None.</DataTable.Cell>
              <DataTable.Cell>Jeffery</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
        <Button title="Export Database" onPress={ExportDatabase} />
        {/* map */}
        <View style={styles.map}>
          {Platform.OS === "web" ? (
            <GoogleMapReact
              bootstrapURLKeys={
                {
                  //google api key
                  //key: "AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0",
                }
              }
              defaultCenter={mapRegion.center}
              zoom={mapRegion.zoom}
            >
              {/* markers on the map */}
              {markers.map((marker, index) => {
                return (
                  <WebMarker
                    style={styles.marker}
                    source={markerURL}
                    lat={marker.lat}
                    lng={marker.lng}
                    key={index}
                  />
                );
              })}
              {/* {<Markers />} */}
            </GoogleMapReact>
          ) : (
            <MapView style={styles.map} region={mapRegion}>
              <Marker key={0} coordinate={mapRegion} title={"Marker"} />
            </MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffPage;
