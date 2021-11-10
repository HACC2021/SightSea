import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
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
  RadioButton,
  Title,
  Card,
  Paragraph,
  Subheading,
  Button,
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
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
    width: "90%",
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
    width: windowWidth * 0.18,
    height: 100,
    marginLeft: -windowWidth * 0.18 * 0.4,
    marginTop: -windowWidth * 0.18 * 0.45,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    paddingBottom: 5,
    paddingRight: 1,
  },
  img: {
    width: 40,
    height: 40,
  },
  cancel: {
    textAlign: "right",
  },
  btn: {
    width: "15%",
    padding: 3,
    margin: 20,
  },
  Exportbtn: {
    width: windowWidth * 0.9,
    padding: 3,
    margin: 20,
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
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = useState();
  const [pageNewTable, setPageNewTable] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [totalPages, setTotalPages] = React.useState(3);
  const [pageVerifiedTable, setPageVerifiedTable] = React.useState(0);
  const [tableData, setTableData] = React.useState([]);
  const [markerData, setMarkerData] = React.useState([]);
  const [animalDisplayType, setAnimalDisplayType] = React.useState(null);
  const [backAnchorKey, setBackAnchorKey] = React.useState(null);
  const [search, setSearch] = React.useState(false);

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

  //console.log("Checked :", checked)
  const Assign = (e) => {
    e.preventDefault();
    console.log("Assign to volunteer");
  };

  var markers = [
    {
      ticketNum: 12345,
      latitude: 21.315601,
      longitude: -157.85813,
      info: "56 N Vineyard Blvd. Honolulu, Hawaii 96817",
    },
    {
      ticketNum: 12345,
      latitude: 21.315601,
      longitude: -157.95813,
      info: "828R+6P Joint Base Pearl Harbor-Hickam. Joint Base Pearl Harbor-Hickam, Hawaii undefined",
    },
  ];

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
              <Paragraph> Ticket Number: {marker["ticketNum"]}</Paragraph>
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
      <div onClick={onMarkerClick}>
        {show && <InfoWindow marker={marker} index={index} show={show} />}
        <Image source={markerURL} style={styles.img} lat={lat} lng={lng} />
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
        bootstrapURLKeys={{ key: "AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0" }}
      >
        {data.map((item, index) => {
          return (
            <CustomMarker
              key={index}
              lat={item.latitude}
              lng={item.longitude}
              marker={item}
              index={index}
            />
          );
        })}
      </GoogleMapReact>
    );
  }
  //query database for certain animal
  const getDocs = (animal, direction) => {
    console.log(backAnchorKey);
    const db = getDatabase();
    const pageref = ref(db, `${animal}/count`);
    onValue(pageref, (snapshot) => {
      console.log(snapshot.val());
      console.log(itemsPerPage);
      console.log((Number(snapshot.val()) / itemsPerPage))
      setTotalPages(Math.ceil(Number(snapshot.val()) / itemsPerPage));
    });
    var docCounter = 0;
    //console.log(pageVerifiedTable);
    //console.log(direction);
    //console.log("front keys: " + frontAnchorKeys);
    const reference =
      direction === "switch"
        ? query(
            ref(db, `/${animal}/documents`),
            orderByKey(),
            limitToFirst(itemsPerPage)
          )
        : direction === "forward"
        ? query(
            ref(db, `/${animal}/documents`),
            orderByKey(),
            startAfter(backAnchorKey),
            limitToFirst(itemsPerPage)
          )
        : query(
            ref(db, `/${animal}/documents`),
            orderByKey(),
            startAt(frontAnchorKeys[pageVerifiedTable - 1]),
            limitToFirst(itemsPerPage)
          );
    onChildAdded(reference, (snapshot) => {
      setBackAnchorKey(snapshot.key);
      docCounter++;
      if (
        docCounter === 1 &&
        (direction === "forward" || direction === "switch")
      ) {
        frontAnchorKeys.push(snapshot.key);
        console.log(frontAnchorKeys);
      } else if (docCounter === 1 && direction === "back") {
        frontAnchorKeys.pop();
      }
    });
    onValue(reference, (snapshot) => {
      setTableData(Object.entries(snapshot.val()));
    });
  };

  const handlePageChange = (page, callback) => {
    page > pageVerifiedTable
      ? getDocs(animalDisplayType, "forward")
      : getDocs(animalDisplayType, "back");
    setPageVerifiedTable(page);
  };

  const handleRadioChange = (animal) => {
    var markers = [];
    setAnimalDisplayType(animal);
    setPageVerifiedTable(0);
    setBackAnchorKey(null);
    frontAnchorKeys = [];
    getDocs(animal, "switch");
    tableData.map((element) => {
      markers.push({
        ticketNum: element[1].Ticket_Number,
        latitude: element[1].GPS_Coordinate.latitude,
        longitude: element[1].GPS_Coordinate.longitude,
      });
    }
    );

    //convert GPS coordinate to postal address and update marker array
    convertToAddress(markers);
    //pass the GPS coordinate object to the MarkerData array
    setMarkerData(markers);
  };

  //console.log(markerData);
  //convert location coordinate to address
  function convertToAddress(arrayOfMarker) {
    /*************************Enable api key when using reverseGeocodeAsync function ************************/
    // Location.setGoogleApiKey("AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0");
    //loop through each marker object and convert them to postal address
    var string = "";
    arrayOfMarker.map((obj, index) => {
      Location.reverseGeocodeAsync({
        latitude: obj.latitude,
        longitude: obj.longitude,
      }).then((address) => {
        string =
          address[0]["name"] +
          ". " +
          address[0]["city"] +
          ", " +
          address[0]["region"] +
          " " +
          address[0]["postalCode"];

        arrayOfMarker[index]["info"] = string;
      });
    });
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
            {Platform.OS === "web" ? (
              <View style={{ flexDirection: "row" }}>
                {animalTypes.map((x, index) => (
                  <View style={{ flexDirection: "column" }} key={index}>
                    <RadioButton.Item key={index} label={x} value={x} />
                  </View>
                ))}
              </View>
            ) : (
              animalTypes.map((x, index) => (
                <RadioButton.Item key={index} label={x} value={x} />
              ))
            )}
          </RadioButton.Group>
          {/* <Button
            mode="contained"
            style={styles.btn}
            onPress={handleRadioChange}
          >
            Search
          </Button> */}
          {/* Display map with pins for ALL new reports */}
          <DataTable>
            <DataTable.Header>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title>Ticket Number</DataTable.Title>
              <DataTable.Title>Ticket Type</DataTable.Title>

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
                <DataTable.Row key={index} onPress={ () => navigation.navigate(
                    'ViewReport', {table: element[1], animal: animalDisplayType, documentID: element[0], }
                )}>
                <DataTable.Cell style={styles.columns} key={index}>
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
              numberOfPages={totalPages}
              onPageChange={(page) => handlePageChange(page)}
              label={pageVerifiedTable + 1 + "of " + totalPages}
              // optionsPerPage={optionsPerPage}
              // itemsPerPage={itemsPerPage}
              // setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        </Surface>
        <View>
          <Button
            mode="contained"
            onPress={ExportDatabase}
            style={styles.Exportbtn}
          >
            Export Database
          </Button>
        </View>
        {/* map */}
        <View style={styles.map}>
          {Platform.OS === "web" ? (
            <GoogleMap
              center={mapProps.center}
              zoom={mapProps.zoom}
              data={markerData}
            />
          ) : (
            <MapView style={styles.map} region={mapProps.center}>
              <Marker key={0} coordinate={mapProps.center} title={"Marker"} />
            </MapView>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffPage;
