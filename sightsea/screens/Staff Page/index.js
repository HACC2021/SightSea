import React, { useState, useEffect, Component } from "react";
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
  Pressable,
  TouchableOpacity,
} from "react-native";
import Proptypes from "prop-types";
import {
  DataTable,
  Checkbox,
  Modal,
  Portal,
  Surface,
  Title,
  Card,
  Paragraph,
  Subheading,
} from "react-native-paper";
import GoogleMapReact from "google-map-react";
import MapView, { Marker } from "react-native-maps";
import ExportDatabase from "../../scripts/ExportDatabase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
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
    textAlign: "left",
  },
  secondaryheader: {
    fontSize: 30,
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "left",
  },

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
    alignContent: "center",
    width: "100%",
    height: 600,
  },
  marker: {
    width: 50,
    height: 50,
  },
  containerStyle: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
  },
  surface: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    paddingTop: 10,
    width: "90%",
  },
  verifyButton: {
    borderRadius: 6,
    // marginRight: 15,
    padding: 4,
    // padding: 7,
  },
  Box: {
    width: windowWidth * 0.15,
    height: 90,
    marginLeft: -windowWidth * 0.15 * 0.4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    paddingTop: 3,
  },
  img: {
    width: 40,
    height: 40,
  },
  cancel: {
    textAlign: "right",
  },
});

const optionsPerPage = [2, 3, 4];

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
  const [pageNewTable, setPageNewTable] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [pageVerifiedTable, setPageVerifiedTable] = React.useState(0);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("SightSea");
      }
    });

    setPageNewTable(0);
    setPageVerifiedTable(0);
  }, [itemsPerPage]);

  // ##########adding Firebase query ##########
  // Firebase data query
  // data = Firebase.database();
  // ####################

  //console.log("Checked :", checked)
  const Assign = (e) => {
    e.preventDefault();
    console.log("Assign to volunteer");
  };

  const markerURL =
    "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png";
  const [checked, setChecked] = React.useState(false);

  const mapProps = {
    center: {
      lat: 21.315601,
      lng: -157.85809,
    },
    zoom: 12,
  };

  var markers = [
    {
      lat: 21.315601,
      lng: -157.85813,
      info: "test address 2",
    },
    {
      lat: 21.315601,
      lng: -157.95813,
      info: "test address 1",
    },
  ];

  //define marker info
  const InfoWindow = ({ marker, index, show }) => {
    //close window when X is clicked
    function setShow(show) {
      show = false;
    }
    return (
      <div>
        {show && (
          <Card style={styles.Box}>
            <Paragraph onPress={setShow(show)} style={styles.cancel}>
              X
            </Paragraph>
            <Card.Content>
              <Text>Name of Location</Text>
              <Paragraph>{marker["info"]}</Paragraph>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  };

  //define marker
  function CustomMarker({ lat, lng, onMarkerClick, marker, index }) {
    //allow user to open/close info window by clicking the info window
    const [show, setShow] = React.useState(false);
    function onMarkerClick() {
      console.log(marker["info"]);
      setShow(!show);
    }

    return (
      <div onClick={onMarkerClick} lat={lat} lng={lng}>
        {show && <InfoWindow marker={marker} index={index} show={show} />}
        <Image source={markerURL} style={styles.img} />
      </div>
    );
  }

  //initialize map
  function GoogleMap({ center, zoom, data }) {
    return (
      <GoogleMapReact
        style={{ height: "100vh", width: "100%" }}
        defaultZoom={zoom}
        defaultCenter={center}
      >
        {data.map((item, index) => {
          return (
            <CustomMarker
              key={index}
              lat={item.lat}
              lng={item.lng}
              marker={item}
              index={index}
            />
          );
        })}
      </GoogleMapReact>
    );
  }

  //convert location coordinate to address
  function convertToAddress(coordinateObj) {
    let locationString = "";
    //convert coordinate to postal address
    //@param object: {latitude: xxx, longitude:xxx}
    //@param array: address

    /*************************Enable api key when using reverseGeocodeAsync function ************************/
    Location.setGoogleApiKey("AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0");
    Location.reverseGeocodeAsync(coordinateObj).then((address) => {
      //console.log(address[0]);

      locationString =
        address[0]["name"] +
        ". " +
        address[0]["city"] +
        ", " +
        address[0]["region"] +
        " " +
        address[0]["postalCode"];
    });

    return locationString;
  }

  return (
    //Can only return 1 view object for Andriod
    <ScrollView>
      <View style={styles.container}>
        <Surface style={styles.surface}>
          <Text style={styles.header}>New Reports</Text>
          <DataTable>
            <DataTable.Header>
              {!checked ? (
                <DataTable.Title></DataTable.Title>
              ) : (
                <DataTable.Title>
                  <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={Assign}
                  >
                    <Text style={{ color: "#3478F6" }}>Verify</Text>
                  </TouchableOpacity>
                </DataTable.Title>
              )}
              <DataTable.Title style={styles.columns}>
                Ticket Number
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Ticket Type
              </DataTable.Title>

              {Platform.OS === "web" ? (
                <>
                  <DataTable.Title style={styles.columns}>Date</DataTable.Title>
                  <DataTable.Title style={styles.columns}>Time</DataTable.Title>
                  <DataTable.Title style={styles.columns}>
                    Location
                  </DataTable.Title>
                </>
              ) : null}
            </DataTable.Header>
            {/* Loop over new reports to make rows */}

            {/* ###########USE when firebase is connected ####### */}

            {/* {data.map((data) => {
                return (
                  <DataTable.Row key={data.id} onPress={() => navigation.navigate(data.id.toString())}>
                  <DataTable.Cell style={styles.columns}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                ></Checkbox>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.row}>
                {data.ticketNumber}
              </DataTable.Cell>
              <DataTable.Cell style={styles.row}>{data.ticketType}</DataTable.Cell>

              {Platform.OS === "web" ? (
                <>
                  <DataTable.Cell numeric style={styles.row}>
                  {data.date}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.row}>
                    {data.time}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.row}>{data.location}</DataTable.Cell>
                </>
              ) : null}
                  </DataTable.Row>
                  
                )
              })} */}

            {/* ###########USE when firebase is connected ####### */}
            <DataTable.Row onPress={() => console.log("Clicked")}>
              <DataTable.Cell style={styles.columns}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                ></Checkbox>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.row}>
                123
              </DataTable.Cell>
              <DataTable.Cell style={styles.row}>C</DataTable.Cell>

              {Platform.OS === "web" ? (
                <>
                  <DataTable.Cell numeric style={styles.row}>
                    32132
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.row}>
                    0500
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.row}>a beach</DataTable.Cell>
                </>
              ) : null}
            </DataTable.Row>
            {/* ################## */}
            <DataTable.Pagination
              page={pageNewTable}
              numberOfPages={3}
              onPageChange={(page) => setPageNewTable(page)}
              label="1-2 of 6"
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </Surface>
        <View />
        <Surface style={styles.surface}>
          <Text style={styles.secondaryheader}>Verified Reports</Text>
          {/* Display map with pins for ALL new reports */}
          <DataTable>
            <DataTable.Header>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Ticket Number
              </DataTable.Title>
              <DataTable.Title style={styles.columns}>
                Ticket Type
              </DataTable.Title>

              {Platform.OS === "web" ? (
                <>
                  <DataTable.Title style={styles.columns}>Date</DataTable.Title>
                  <DataTable.Title style={styles.columns}>Time</DataTable.Title>
                  <DataTable.Title style={styles.columns}>
                    Location
                  </DataTable.Title>
                </>
              ) : null}
            </DataTable.Header>
            {/* Loop over new reports to make rows */}
            <DataTable.Row>
              <DataTable.Cell style={styles.columns}>
                {/* <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                ></Checkbox> */}
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.row}>
                123
              </DataTable.Cell>
              <DataTable.Cell style={styles.row}>C</DataTable.Cell>
              {Platform.OS === "web" ? (
                <>
                  <DataTable.Cell numeric style={styles.row}>
                    32132
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.row}>
                    0500
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.row}>a beach</DataTable.Cell>
                </>
              ) : null}
            </DataTable.Row>

            <DataTable.Pagination
              page={pageVerifiedTable}
              numberOfPages={3}
              onPageChange={(page) => setPageVerifiedTable(page)}
              label="1-2 of 6"
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </Surface>
        <View>
          <Button title="Export Database" onPress={ExportDatabase} />
        </View>
        {/* map */}
        <View style={styles.map}>
          {Platform.OS === "web" ? (
            <GoogleMap
              center={mapProps.center}
              zoom={mapProps.zoom}
              data={markers}
            />
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
