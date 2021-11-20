import React, {
  useState,
  useEffect,
  Component,
  useMemo,
  useCallback,
} from "react";
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
  List,
} from "react-native-paper";
import GoogleMapReact from "google-map-react";
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
  set,
  runTransaction,
  remove,
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
    width: windowWidth * 0.2,
    height: 120,
    marginLeft: -windowWidth * 0.2 * 0.4,
    marginTop: -windowWidth * 0.2 * 0.45,
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
var frontAnchorKeysVerified = [];
var frontAnchorKeysNew = [];

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
  const [totalPagesNew, setTotalPagesNew] = React.useState(3);
  const [pageVerifiedTable, setPageVerifiedTable] = React.useState(0);
  const [tableDataVerified, setTableDataVerified] = React.useState([]);
  const [tableDataNew, setTableDataNew] = React.useState([]);
  const [markerDataState, setMarkerDataState] = React.useState([]);
  const [animalDisplayType, setAnimalDisplayType] = React.useState(null);
  const [backAnchorKeyVerified, setBackAnchorKeyVerified] =
    React.useState(null);
  const [backAnchorKeyNew, setBackAnchorKeyNew] = React.useState(null);
  const [search, setSearch] = React.useState(false);
  const [newChecked, setNewChecked] = React.useState(
    new Array(optionsPerPage[0]).fill(false)
  );

  var markerOldData = [];
  var markerData = [];

  const [showItemNumDropdown, setShowItemNumDropdown] = React.useState(false);

  const closeItemNumDropdown = () => {
    setShowItemNumDropdown(!showItemNumDropdown);
  };

  React.useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate("SightSea");
      }
    });

    //setPageNewTable(0);
    //setPageVerifiedTable(0);
    getNewDocs("switch");
  }, [itemsPerPage, shouldComponentUpdate(markerOldData, markerDataState)]);

  // ##########adding Firebase query ##########
  // Firebase data query
  // data = Firebase.database();
  // ####################

  //console.log("Checked :", checked)
  const Assign = (e) => {
    e.preventDefault();
    console.log("Assign to volunteer");
  };

  //test data for markers
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
      info: "56 N Vineyard Blvd. Honolulu, Hawaii 96817",
    },
  ];

  var markers2 = [
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
      info: "56 N Vineyard Blvd. Honolulu, Hawaii 96817",
    },
  ];
  const markerURL =
    "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png";
  const [checked, setChecked] = React.useState(false);

  // 21.4389° N, 158.0001°
  const mapProps = {
    center: {
      lat: 21.4389,
      lng: -158.0001,
    },
    zoom: 11,
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
  const CustomMarker = ({ lat, lng, onMarkerClick, marker, index }) => {
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
  };

  //initialize map
  function GoogleMap({ center, zoom, update }) {
    markerOldData = markerDataState;
    console.log("renders");

    return (
      <GoogleMapReact
        style={{ height: "100vh", width: "100%" }}
        defaultZoom={zoom}
        defaultCenter={center}
        //   bootstrapURLKeys={{ key: "AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0" }}
      >
        {markerOldData.map((item, index) => {
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

  function shouldComponentUpdate(currentMarkers, newMarkers) {
    //check if markers have different length
    if (currentMarkers.length != newMarkers.length) {
      return true;
    }
    //check if markers have same latitude & latitude
    else {
      for (let i = 0; i < currentMarkers.length; i++) {
        if (currentMarkers[i].latitude != newMarkers[i].latitude) {
          return true;
        } else if (currentMarkers[i].longitude != newMarkers[i].longitude) {
          return true;
        }
      }
      return false;
    }
  }

  //query database for certain animal
  const getDocs = (animal, direction) => {
    //console.log(backAnchorKeyVerified);
    const db = getDatabase();
    const pageref = ref(db, `${animal}/count`);
    onValue(pageref, (snapshot) => {
      //console.log(snapshot.val());
      //console.log(itemsPerPage);
      // console.log(Number(snapshot.val()) / itemsPerPage);
      setTotalPages(Math.ceil(Number(snapshot.val()) / itemsPerPage));
    });
    var docCounter = 0;
    //console.log(pageVerifiedTable);
    //console.log(direction);
    //console.log("front keys: " + frontAnchorKeysVerified);
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
            startAfter(backAnchorKeyVerified),
            limitToFirst(itemsPerPage)
          )
        : query(
            ref(db, `/${animal}/documents`),
            orderByKey(),
            startAt(frontAnchorKeysVerified[pageVerifiedTable - 1]),
            limitToFirst(itemsPerPage)
          );
    onChildAdded(reference, (snapshot) => {
      setBackAnchorKeyVerified(snapshot.key);
      docCounter++;
      if (
        docCounter === 1 &&
        (direction === "forward" || direction === "switch")
      ) {
        frontAnchorKeysVerified.push(snapshot.key);
        console.log(frontAnchorKeysVerified);
      } else if (docCounter === 1 && direction === "back") {
        frontAnchorKeysVerified.pop();
      }
    });
    onValue(reference, (snapshot) => {
      var data = [];
      data = Object.entries(snapshot.val());
      snapshot.val() === null
        ? null
        : setTableDataVerified(Object.entries(snapshot.val()));
      handleMapChange(data);
    });
  };

  const getNewDocs = (direction) => {
    const db = getDatabase();
    const pageref = ref(db, `Unverified/count`);
    onValue(pageref, (snapshot) => {
      setTotalPagesNew(Math.ceil(Number(snapshot.val()) / itemsPerPage));
    });
    var docCounter = 0;
    const reference =
      direction === "switch"
        ? query(
            ref(db, `Unverified/documents`),
            orderByKey(),
            limitToFirst(itemsPerPage)
          )
        : direction === "forward"
        ? query(
            ref(db, `/Unverified/documents`),
            orderByKey(),
            startAfter(backAnchorKeyNew),
            limitToFirst(itemsPerPage)
          )
        : query(
            ref(db, `/Unverified/documents`),
            orderByKey(),
            startAt(frontAnchorKeysNew[pageNewTable - 1]),
            limitToFirst(itemsPerPage)
          );
    onChildAdded(reference, (snapshot) => {
      setBackAnchorKeyNew(snapshot.key);
      docCounter++;
      if (
        docCounter === 1 &&
        (direction === "forward" || direction === "switch")
      ) {
        frontAnchorKeysNew.push(snapshot.key);
        //console.log(frontAnchorKeysNew);
      } else if (docCounter === 1 && direction === "back") {
        frontAnchorKeysNew.pop();
      }
    });
    onValue(reference, (snapshot) => {
      snapshot.val() === null
        ? setTableDataNew([])
        : setTableDataNew(Object.entries(snapshot.val()));
    });
  };

  const handlePageChange = (page, callback) => {
    page > pageVerifiedTable
      ? getDocs(animalDisplayType, "forward")
      : getDocs(animalDisplayType, "back");
    setPageVerifiedTable(page);
  };

  const handlePageChangeNew = (page) => {
    page > pageNewTable ? getNewDocs("forward") : getNewDocs("back");
    setPageNewTable(page);
  };

  const handleMapChange = (data) => {
    var markers = [];
    data.map((element) => {
      markers.push({
        ticketNum: element[0],
        latitude: element[1].GPS_Coordinate.latitude,
        longitude: element[1].GPS_Coordinate.longitude,
      });
    });

    //convert GPS coordinate to postal address and update marker array
    //convertToAddress(markers);
    //pass the GPS coordinate object to the MarkerData array
    markerData = markers;
    setMarkerDataState(markerData);
  };

  const handleRadioChange = (animal) => {
    setAnimalDisplayType(animal);
    setPageVerifiedTable(0);
    setBackAnchorKeyVerified(null);
    frontAnchorKeysVerified = [];
    getDocs(animal, "switch");
  };

  const handleNewCheckedChange = (position) => {
    console.log(position);
    const newState = new Array(itemsPerPage);
    newChecked.map((x, index) => {
      console.log(x);
      newState[index] = index === position ? !x : x;
    });
    setNewChecked(newState);
  };

  const handleVerify = () => {
    newChecked.map((checked, index) => {
      if (checked === true) {
        const db = getDatabase();
        const item = tableDataNew[index];
        const addref = ref(db, `${item[1].AnimalType}/documents/${item[0]}`);
        set(addref, item[1]);
        const addCountRef = ref(db, `${item[1].AnimalType}/`);
        runTransaction(addCountRef, (post) => {
          if (post) {
            if (post.count) {
              post.count++;
            }
          }
          return post;
        });
        const removeref = ref(db, `Unverified/documents/${item[0]}`);
        remove(removeref);
        const removeCountRef = ref(db, `Unverified/`);
        runTransaction(removeCountRef, (post) => {
          if (post) {
            if (post.count) {
              post.count--;
            }
          }
          return post;
        });
      }
    });
  };

  const handleRelated = () => {
    newChecked.map((checked, index) => {
      if (checked === true) {
        const db = getDatabase();
        const item = tableDataNew[index];
        const addref = ref(db, `${item[1].AnimalType}/documents/${item[0]}`);
        set(addref, item[1]);
        const addCountRef = ref(db, `${item[1].AnimalType}/`);
        runTransaction(addCountRef, (post) => {
          if (post) {
            if (post.count) {
              post.count++;
            }
          }
          return post;
        });
        const removeref = ref(db, `Unverified/documents/${item[0]}`);
        remove(removeref);
        const removeCountRef = ref(db, `Unverified/`);
        runTransaction(removeCountRef, (post) => {
          if (post) {
            if (post.count) {
              post.count--;
            }
          }
          return post;
        });
      }
    });
  };

  //console.log(markerData);
  //convert location coordinate to address
  function convertToAddress(arrayOfMarker) {
    /*************************Enable api key when using reverseGeocodeAsync function ************************/
    Location.setGoogleApiKey("AIzaSyA-3F902_biObW4BKO0VgIuZpBeS9Ptrn0");
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
  console.log(newChecked);
  return (
    //Can only return 1 view object for Andriod
    <ScrollView>
      <View style={styles.container}>
        {Platform.OS === "web" ? (
          <Surface style={styles.surface}>
            <Text style={styles.header}>New Reports</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title></DataTable.Title>
                <DataTable.Title>Ticket Number</DataTable.Title>
                <DataTable.Title>Ticket Type</DataTable.Title>

                <DataTable.Title style={styles.columns}>Date</DataTable.Title>
                <DataTable.Title style={styles.columns}>Time</DataTable.Title>
                <DataTable.Title style={styles.columns}>
                  Location
                </DataTable.Title>
              </DataTable.Header>
              {/* Loop over new reports to make rows */}

              {tableDataNew.map((element, index) => (
                <DataTable.Row key={index}>
                  <Checkbox
                    status={newChecked[index] ? "checked" : "unchecked"}
                    onPress={() => {
                      handleNewCheckedChange(index);
                    }}
                  ></Checkbox>
                  <DataTable.Cell
                    style={styles.columns}
                    key={index}
                  ></DataTable.Cell>
                  <DataTable.Cell numeric style={styles.row}>
                    {element[0]}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.row}>
                    {element[1].ticket_type}
                  </DataTable.Cell>

                  <DataTable.Cell numeric style={styles.row}>
                    {element[1].Date}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.row}>
                    {element[1].Time}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.row}>
                    {element[1].Location}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}

              <DataTable.Pagination
                page={pageNewTable}
                numberOfPages={totalPagesNew}
                onPageChange={(page) => handlePageChangeNew(page)}
                label={pageNewTable + 1 + "of " + totalPagesNew}
                // optionsPerPage={optionsPerPage}
                // itemsPerPage={itemsPerPage}
                // setItemsPerPage={setItemsPerPage}
                showFastPagination
                optionsLabel={"Rows per page"}
              />
            </DataTable>
            <Button
              mode="contained"
              onPress={() => handleVerify()}
              style={styles.Exportbtn}
            >
              Verify
            </Button>
          </Surface>
        ) : null}
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
          <View>
            <List.Section title="Entries per Page">
              <List.Accordion
                title={itemsPerPage}
                expanded={showItemNumDropdown}
                onPress={closeItemNumDropdown}
              >
                {optionsPerPage.map((x, index) => (
                  <List.Item
                    key={index}
                    title={x}
                    onPress={() => {
                      frontAnchorKeysNew = [];
                      setItemsPerPage(x);
                      closeItemNumDropdown();
                      getDocs(animalDisplayType, "switch");
                      getNewDocs("switch");
                      setPageNewTable(0);
                      setPageVerifiedTable(0);
                    }}
                  />
                ))}
              </List.Accordion>
            </List.Section>
          </View>
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

            {tableDataVerified.map((element, index) => (
              <DataTable.Row
                key={index}
                onPress={() =>
                  navigation.navigate("ViewReport", {
                    table: element[1],
                    animal: animalDisplayType,
                    documentID: element[0],
                  })
                }
              >
                <Checkbox
                  status={newChecked[index] ? "checked" : "unchecked"}
                  onPress={() => {
                    handleNewCheckedChange(index);
                  }}
                ></Checkbox>
                <DataTable.Cell
                  style={styles.columns}
                  key={index}
                ></DataTable.Cell>
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
          <Button
            mode="contained"
            onPress={() => handleRelated()}
            style={styles.Exportbtn}
          >
            Related
          </Button>
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
              data={markers}
            />
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffPage;
