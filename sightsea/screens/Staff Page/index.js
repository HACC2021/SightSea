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
  Title,
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
import * as Location from "expo-location";

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
  // Box: {
  //   border: "1px solid",
  //   width: 50,
  //   height: 50,
  //   backgroundColor: "white",
  // },
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
  const [open, setOpen] = React.useState(false);
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
      id: 3,
      lat: 21.315601,
      lng: -157.85813,
      info: "test address 2",
    },
    {
      id: 1,
      lat: 21.315601,
      lng: -157.95813,
      info: "test address 1",
    },
  ];

  // const markerInfos = [
  //   {
  //     id: 1,
  //     address: "test address 1",
  //   },
  //   {
  //     id: 3,
  //     address: "test address 2",
  //   },
  // ];
  var activeIndex = null; //index of active marker
  var activeMarker = null;
  //marker image
  const WebMarker = (marker) => {
    function handleMarkerClick() {
      //get index of active marker
      activeMarker = marker;
      activeIndex = marker["$dimensionKey"];
      // console.log(markers[activeIndex].info);
      // console.log(activeMarker);
    }

    //display a list of info windows
    //show a specific info windows INPUTS: (boolean open, number id)
    //shows a info window after clicks on the marker
    //clears the info window after clicking outside

    return (
      <div onClick={handleMarkerClick}>
        <WebInfoWindow marker={marker} />
        <img src={markerURL} alt="Logo" width={50} height={50} />
      </div>
    );
  };

  const WebInfoWindow = (marker) => {
    console.log(marker.marker);
    return <div>HI</div>;
  };

  //query database for certain animal
  const getDocs = (animal, direction) => {
    console.log(backAnchorKey);
    const db = getDatabase();
    var docCounter = 0;
    //console.log(pageVerifiedTable);
    //console.log(direction);
    //console.log("front keys: " + frontAnchorKeys);
    const reference =
      direction === "switch"
        ? query(ref(db, `/${animal}`), orderByKey(), limitToFirst(itemsPerPage))
        : direction === "forward"
        ? query(
            ref(db, `/${animal}`),
            orderByKey(),
            startAfter(backAnchorKey),
            limitToFirst(itemsPerPage)
          )
        : query(
            ref(db, `/${animal}`),
            orderByKey(),
            startAt(frontAnchorKeys[pageVerifiedTable - 1]),
            limitToFirst(itemsPerPage)
          );
    onChildAdded(reference, (snapshot) => {
      setBackAnchorKey(snapshot.key);
      docCounter++;
      if (docCounter === 1 && (direction === "forward" || direction === "switch")) {
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
    frontAnchorKeys = [];
    getDocs(animal, "switch");
  };
  // {open && markerObj.id == markerInfos[index].id ? (
  //   <View style={styles.Box}>
  //     <Text> Box</Text>
  //   </View>
  // ) : null}

  //marker component
  // const Markers = () => {
  //   return (
  //     <View>
  //       {markers.map((marker, index) => {
  //         <WebMarker
  //           style={styles.marker}
  //           source={markerURL}
  //           lat={marker.lat}
  //           lng={marker.lng}
  //           key={index}
  //         />;
  //       })}
  //     </View>
  //   );
  // };

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
              // optionsPerPage={optionsPerPage}
              // itemsPerPage={itemsPerPage}
              // setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </Surface>
        <Button title="Export Database" onPress={ExportDatabase} />
        {/* map */}
        <View style={styles.map}>
          {Platform.OS === "web" ? (
            <GoogleMapReact
              bootstrapURLKeys={
                {
                  /*************************Enable api key before deployment ************************/
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
                    lat={marker.lat}
                    lng={marker.lng}
                    key={index}
                    marker={marker}
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
