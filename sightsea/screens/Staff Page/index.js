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
  Pressable,
  TouchableOpacity,
} from "react-native";
import Component from "react";
import Proptypes from "prop-types";
import {
  DataTable,
  Checkbox,
  Modal,
  Portal,
  Surface,
  RadioButton,
} from "react-native-paper";
import GoogleMapReact from "google-map-react";
import MapView, { Marker } from "react-native-maps";
import {
  getDatabase,
  ref,
  onValue,
  once,
  orderByKey,
  startAt,
  startAfter,
  endAt,
  query,
  limitToFirst,
  onChildAdded,
} from "firebase/database";
import ExportDatabase from "../../scripts/ExportDatabase";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { color } from "react-native-elements/dist/helpers";

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
});

const optionsPerPage = [2, 3, 4];
const animalTypes = ["Bird", "Seal", "Turtle"];
var frontAnchorKeys = [];

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
  const [tableData, setTableData] = React.useState([]);
  const [animalDisplayType, setAnimalDisplayType] = React.useState(null);
  const [backAnchorKey, setBackAnchorKey] = React.useState(null);

  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("SightSea");
      }
    });

    //setPageNewTable(0);
    //setPageVerifiedTable(0);
  }, [itemsPerPage]);

  // ##########adding Firebase query ##########
  // Firebase data query
  // data = Firebase.database();
  // ####################
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

  //query database for certain animal
  const getDocs = (animal, direction) => {
    const db = getDatabase();
    var docCounter = 0;
    console.log(pageVerifiedTable);
    console.log(direction);
    console.log("front keys: " + frontAnchorKeys);
    const reference =
      backAnchorKey === null
        ? query(ref(db, `/${animal}`), orderByKey(), limitToFirst(1))
        : direction === "forward"
        ? query(
            ref(db, `/${animal}`),
            orderByKey(),
            startAfter(backAnchorKey),
            limitToFirst(1)
          )
        : query(
            ref(db, `/${animal}`),
            orderByKey(),
            startAt(frontAnchorKeys[pageVerifiedTable - 1]),
            limitToFirst(1)
          );
    onChildAdded(reference, (snapshot) => {
      setBackAnchorKey(snapshot.key);
      docCounter++;
      if (docCounter === 1 && direction === "forward") {
        frontAnchorKeys.push(snapshot.key);
        console.log(frontAnchorKeys);
      } else if (docCounter === 1 && direction === "back"){
        frontAnchorKeys.pop();
      }
    });
    onValue(reference, (snapshot) => {
      setTableData(Object.entries(snapshot.val()));
    });
  };

  const handlePageChange = (page) => {
    page > pageVerifiedTable
      ? getDocs(animalDisplayType, "forward")
      : getDocs(animalDisplayType, "back");
    setPageVerifiedTable(page);
  };

  const handleRadioChange = (animal) => {
    setAnimalDisplayType(animal);
    setPageVerifiedTable(0);
    setBackAnchorKey(null);
    getDocs(animal, "forward");
  };

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
          <RadioButton.Group
            onValueChange={(value) => handleRadioChange(value)}
            value={animalDisplayType}
          >
            {animalTypes.map((x, index) => (
              <RadioButton.Item key={index} label={x} value={x} />
            ))}
          </RadioButton.Group>
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

            {tableData.map((element, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell style={styles.columns}>
                  {/* <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                ></Checkbox> */}
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.row}>
                  {element[0]}
                </DataTable.Cell>
                <DataTable.Cell style={styles.row}>
                  {element[1].ticket_type}
                </DataTable.Cell>
                {Platform.OS === "web" ? (
                  <>
                    <DataTable.Cell numeric style={styles.row}>
                      {element[1].Date}
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={styles.row}>
                      {element[1].Time}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.row}>
                      {element[1].Location}
                    </DataTable.Cell>
                  </>
                ) : null}
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={pageVerifiedTable}
              numberOfPages={3}
              onPageChange={(page) => handlePageChange(page)}
              label={pageVerifiedTable + 1 + "of 3"}
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </Surface>
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
    </ScrollView>
  );
};

export default StaffPage;
