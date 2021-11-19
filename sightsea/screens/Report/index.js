import React from "react";
import { getDatabase, ref, onValue, once, set, update, query, orderByKey,
  startAt, startAfter, endAt,
  limitToFirst,
  onChildAdded,
} from "firebase/database";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  Image,
    form,
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
  DataTable,
  Checkbox,
} from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import GoogleMapReact from "google-map-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


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
  image: {
    width: "100%",
    maxWidth: "20px",
    height: "100$",
    maxHeight: "30px",
  },
  map: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
  },
  marker: {
    width: 50,
    height: 50,
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
});

const optionsPerPage = [2, 3, 4];
const animalTypes = ["Bird", "Seal", "Turtle"];
var frontAnchorKeysVerified = [];
var frontAnchorKeysNew = [];

const ViewReport = ({route, navigation}) => {
  const { table, animal, documentID }  = route.params;
  // const [animalType, setAnimalType] = React.useState("Turtle");
  const [showAnimalDropDown, setShowAnimalDropDown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [time, setTime] = React.useState(table.Time);
  const [validPhone, setValidPhone] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);

  // for table
  const [tableDataNew, setTableDataNew] = React.useState([]);
  const [pageNewTable, setPageNewTable] = React.useState(0);
  const [totalPagesNew, setTotalPagesNew] = React.useState(3);
  const [backAnchorKeyVerified, setBackAnchorKeyVerified] =
      React.useState(null);
  const [backAnchorKeyNew, setBackAnchorKeyNew] = React.useState(null);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [newChecked, setNewChecked] = React.useState(
      new Array(optionsPerPage[0]).fill(false)
  );
  const [animalDisplayType, setAnimalDisplayType] = React.useState("Bird");
  const [totalPages, setTotalPages] = React.useState(3);
  const [tableDataVerified, setTableDataVerified] = React.useState([]);



  const [delivered, setDelivered] = React.useState(table.Delivered);
  const [hoi, setHOI] = React.useState(table.Hotline_Operator_Initials);
  const [Location_Notes, setLocation_Notes] = React.useState(table.Location_Notes);

  const [Number_of_Calls_Received, setNumber_of_Calls_Received] = React.useState(table.Number_of_Calls_Received);
  const [Observer, setObserver] = React.useState(table.Observer);
  const [Observer_Contact_Number, setObserver_Contact_Number] = React.useState(table.Observer_Contact_Number);
  const [Observer_Initials, setObserver_Initials] = React.useState(table.Observer_Initials);
  const [Observer_Type, setObserver_Type] = React.useState(table.Observer_Type);
  const [Other_Notes, setOther_Notes] = React.useState(table.Other_Notes);
  const [opbo, setOPBO] = React.useState(table.Outreach_provided_by_operator);
  const [Responders_name, setResponders_name] = React.useState(table.Responders_name);
  const [Sector, setSector] = React.useState(table.Sector);
  const [Ticket_Number, setTicket_Number] = React.useState(table.Ticket_Number);
  const [Type_of_Bird, setType_of_Bird] = React.useState(table.Type_of_Bird);
  const [Verified, setVerified] = React.useState(table.Verified);
  const [WhereTo, setWhereTo] = React.useState(table.Where_to);
  const [TicketType, setTicketType] = React.useState(table.ticket_type);



  const [Additional_Notes_on_ID, setAdditional_Notes_on_ID] = React.useState(table.Additional_Notes_on_ID);
  const [Beach_Position, setBeach_Position] = React.useState(table.Beach_Position);
  const [How_Identified, setHow_Identified] = React.useState(table.How_Identified);
  const [ID_Perm, setID_Perm] = React.useState(table.ID_Perm);
  const [ID_Verified_By, setID_Verified_By] = React.useState(table.ID_Verified_By);
  const [ID_temp, setID_temp] = React.useState(table.ID_temp);
  const [Molt, setMolt] = React.useState(table.Molt);
  const [Mom_and_Pup_Pair, setMom_and_Pup_Pair] = React.useState(table.Mom_and_Pup_Pair);
  const [Number_Volunteers_Engaged, setNumber_Volunteers_Engaged] = React.useState(table.Number_Volunteers_Engaged);
  const [SRA_Set_By, setSRA_Set_By] = React.useState(table.SRA_Set_By);
  const [SRA_Set_Up, setSRA_Set_Up] = React.useState(table.SRA_Set_Up);
  const [Seal_Depart_Info_Avial, setSeal_Depart_Info_Avial] = React.useState(table.Seal_Depart_Info_Avial);
  const [Seal_Departed_Date, setSeal_Departed_Date] = React.useState(table.Seal_Departed_Date);
  const [Seal_Departed_Time, setSeal_Departed_Time] = React.useState(table.Seal_Departed_Time);
  const [Seal_Logging, setSeal_Logging] = React.useState(table.Seal_Logging);
  const [Seal_Present, setSeal_Present] = React.useState(table.Seal_Present);
  const [Tag_Color, setTag_Color] = React.useState(table.Tag_Color);
  const [Tag_Number, setTag_Number] = React.useState(table.Tag_Number);
  const [Tag_Side, setTag_Side] = React.useState(table.Tag_Side);

  const [Primary_issue_or_cause_of_death, setPrimary_issue_or_cause_of_death] = React.useState(table.Primary_issue_or_cause_of_death);
  const [FAST, setFAST] = React.useState(table.FAST);
  const [Responder, setResponder] = React.useState(table.Responder);
  const [Responder_arrival_time, setResponder_arrival_time] = React.useState(table.Responder_arrival_time);
  const [Stauts, setStauts] = React.useState(table.Stauts);
  const [Time_Responder_left, setTime_Responder_left] = React.useState(table.Time_Responder_left);
  const [Type_of_Turtle, setType_of_Turtle] = React.useState(table.Type_of_Turtle);

  // const [date, setDate] = React.useState(new Date());
  const [date, setDate] = React.useState(table.Date);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [docID, setDocID] = React.useState("");

  const [location, setLocation] = React.useState(table.Location);
  const [turtleSize, setTurtleSize] = React.useState(table.turtleSize);

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
    getDocs(animalDisplayType, "switch");
  }, [itemsPerPage]);

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

  //query database for certain animal
  const getDocs = (animal, direction) => {
    console.log(backAnchorKeyVerified);
    const db = getDatabase();
    const pageref = ref(db, `${animal}/count`);
    onValue(pageref, (snapshot) => {
      console.log(snapshot.val());
      console.log(itemsPerPage);
      console.log(Number(snapshot.val()) / itemsPerPage);
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
      snapshot.val() === null ? null :
          setTableDataVerified(Object.entries(snapshot.val()));
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
        console.log(frontAnchorKeysNew);
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

  const handleRadioChange = (animal) => {
    var markers = [];
    setAnimalDisplayType(animal);
    setPageVerifiedTable(0);
    setBackAnchorKeyVerified(null);
    frontAnchorKeysVerified = [];
    getDocs(animal, "switch");
    // tableDataVerified.map((element) => {
    //   markers.push({
    //     ticketNum: element[1].GPS_Coordinate.Ticket_Number,
    //     latitude: element[1].GPS_Coordinate.latitude,
    //     longitude: element[1].GPS_Coordinate.longitude,
    //   });
    // });

    // //convert GPS coordinate to postal address and update marker array
    // convertToAddress(markers);
    // //pass the GPS coordinate object to the MarkerData array
    // setMarkerData(markers);
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
        Additional_Notes_on_ID: Additional_Notes_on_ID,
        Beach_Position: Beach_Position,
        Date: date,
        Hotline_Operator_Initials: hoi,
        How_Identified: How_Identified,
        ID_Perm: ID_Perm,
        ID_Verified_By: ID_Verified_By,
        ID_temp: ID_temp,
        Location: location,
        Location_Notes: Location_Notes,
        Molt: Molt,
        Mom_and_Pup_Pair: Mom_and_Pup_Pair,
        Number_Volunteers_Engaged: Number_Volunteers_Engaged,
        Number_of_Calls_Received: Number_of_Calls_Received,
        Observer: Observer,
        Observer_Contact_Number: Observer_Contact_Number,
        Observer_Initials: Observer_Initials,
        Observer_Type: Observer_Type,
        Other_Notes: Other_Notes,
        SRA_Set_By: SRA_Set_By,
        SRA_Set_Up: SRA_Set_Up,
        Seal_Depart_Info_Avial: Seal_Depart_Info_Avial,
        Seal_Departed_Date: Seal_Departed_Date,
        Seal_Departed_Time: Seal_Departed_Time,
        Seal_Logging: Seal_Logging,
        Seal_Present: Seal_Present,
        Sector: Sector,
        Sex: sex,
        Size: size,
        Tag_Color: Tag_Color,
        Tag_Number: Tag_Number,
        Tag_Side: Tag_Side,
        Ticket_Number: Ticket_Number,
        Time: time,
        Verified: Verified,
        ticket_type: TicketType,
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
      update(reference, {
        Date: date,
        FAST: FAST,
        Hotline_Operator_Initials: hoi,
        Island: island,
        Location: location,
        Location_Notes: Location_Notes,
        Number_of_Calls_Received: Number_of_Calls_Received,
        Observer: Observer,
        Observer_Contact_Number: Observer_Contact_Number,
        Observer_Initials: Observer_Initials,
        Observer_Type: Observer_Type,
        Other_Notes: Other_Notes,
        Outreach_provided_by_operator: opbo,
        Primary_issue_or_cause_of_death: Primary_issue_or_cause_of_death,
        Responder: Responder,
        Responder_arrival_time: Responder_arrival_time,
        Sector: Sector,
        Size: size,
        Stauts: Stauts,
        // Ticket_Number: "XX" + "" + currentday + "" + currenttime,
        Ticket_Number: Ticket_Number,
        Time: time,
        Time_Responder_left: Time_Responder_left,
        Type_of_Turtle: Type_of_Turtle,
        Verified: Verified,
        ticket_type: TicketType,
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
      //TODO: Cleanup code
      const reference = ref(db, `${animal}/documents/` + documentID);
      update(reference, {
        Date: date,
        Delivered: delivered,
        Hotline_Operator_Initials: hoi,
        Location: location,
        Location_Notes: Location_Notes,
        Number_of_Calls_Received: Number_of_Calls_Received,
        Observer: Observer,
        Observer_Contact_Number: Observer_Contact_Number,
        Observer_Initials: Observer_Initials,
        Observer_Type: Observer_Type,
        Other_Notes: Other_Notes,
        Outreach_provided_by_operator: opbo,
        Responders_name: Responders_name,
        Sector: Sector,
        Ticket_Number: Ticket_Number,
        Time: time,
        Type_of_Bird: Type_of_Bird,
        Verified: Verified,
        Where_to: WhereTo,
        ticket_type: TicketType,
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
                    <TextInput
                        id="birdDate"
                        style={styles.input}
                        onChangeText={setDate}
                        // onChange={ e => setDate(e.target.value)}
                        defaultValue={table.Date}
                        // onPress={() => this.setState({ disabled: false })}
                    >
                    </TextInput>
                    <Text style={styles.input}>Delivered: {table.Delivered}</Text>
                    <TextInput
                        id="birdDelivered"
                        style={styles.input}
                        onChangeText={setDelivered}
                        // onChange={ e => setDelivered(e.target.value)}
                        defaultValue={table.Delivered}
                    >
                    </TextInput>
                    <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initials}</Text>
                    <TextInput
                        id="birdHOI"
                        style={styles.input} onChangeText={setHOI}
                        defaultValue={table.Hotline_Operator_Initials}
                    >
                    </TextInput>
                    <Text style={styles.input}>Location: {table.Location}</Text>
                    <TextInput
                        id="birdLocation"
                        style={styles.input} onChangeText={setLocation}
                        defaultValue={table.Location}
                    >
                    </TextInput>
                    <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
                    <TextInput
                        id="birdLocNotes"
                        style={styles.input}
                        onChangeText={setLocation_Notes}
                        defaultValue={table.Location_Notes}
                    >
                    </TextInput>
                    <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
                    <TextInput
                        id="birdNOCR"
                        style={styles.input} onChangeText={setNumber_of_Calls_Received}
                        defaultValue={table.Number_of_Calls_Received}
                    >
                    </TextInput>
                    <Text style={styles.input}>Observer: {table.Observer}</Text>
                    <TextInput
                        id="birdObserver"
                        style={styles.input} onChangeText={setObserver}
                        defaultValue={table.Observer}
                    >
                    </TextInput>
                    <Text style={styles.input}>Observer Number: {table.Observer_Contact_Number}</Text>
                    <TextInput
                        id="birdObsNum"
                        style={styles.input} onChangeText={setObserver_Contact_Number}
                        defaultValue={table.Observer_Contact_Number}
                    >
                    </TextInput>
                    <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
                    <TextInput
                        id="birdObsInitials"
                        style={styles.input} onChangeText={setObserver_Initials}
                        defaultValue={table.Observer_Initials}
                    >
                    </TextInput>
                    <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
                    <TextInput
                        id="birdObsType"
                        style={styles.input} onChangeText={setObserver_Type}
                        defaultValue={table.Observer_Type}
                    >
                    </TextInput>
                    <Text style={styles.input}>Other Notes: {table.Other_Notes}</Text>
                    <TextInput
                        id="birdObsNotes"
                        style={styles.input} onChangeText={setOther_Notes}
                        defaultValue={table.Other_Notes}
                    >
                    </TextInput>
                    <Text style={styles.input}>Outreach Provided By Operator: {table.Outreach_provided_by_operator}</Text>
                    <TextInput
                        id="birdOPBO"
                        style={styles.input} on ChangeText={setOPBO}
                        defaultValue={table.Outreach_provided_by_operator}
                    >
                    </TextInput>
                    <Text style={styles.input}>Responders Name: {table.Responders_name}</Text>
                    <TextInput
                        id="birdRespName"
                        style={styles.input} onChangeText={setResponders_name}
                        defaultValue={table.Responders_name}
                    >
                    </TextInput>
                    <Text style={styles.input}>Sector: {table.Sector}</Text>
                    <TextInput
                        id="birdSector"
                        style={styles.input} onChangeText={setSector}
                        defaultValue={table.Sector}
                    >
                    </TextInput>
                    <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
                    <TextInput
                        id="birdTicketNum"
                        style={styles.input} onChangeText={setTicket_Number}
                        defaultValue={table.Ticket_Number}
                    >
                    </TextInput>
                    <Text style={styles.input}>Time: {table.Time}</Text>
                    <TextInput
                        id="birdTime"
                        style={styles.input} onChangeText={setTime}
                        defaultValue={table.Time}
                    >
                    </TextInput>
                    <Text style={styles.input}>Type of Bird: {table.Type_of_Bird}</Text>
                    <TextInput
                        id="birdType"
                        style={styles.input} onChangeText={setType_of_Bird}
                        defaultValue={table.Type_of_Bird}
                    >
                    </TextInput>
                    <Text style={styles.input}>Verified: {table.Verified}</Text>
                    <TextInput
                        id="birdVerified"
                        style={styles.input} onChangeText={setVerified}
                        defaultValue={table.Verified}
                    >
                    </TextInput>
                    <Text style={styles.input}>Where To: {table.Where_to}</Text>
                    <TextInput
                        id="birdWhere"
                        style={styles.input} onChangeText={setWhereTo}
                        defaultValue={table.Where_to}
                    >
                    </TextInput>
                    <Text style={styles.input}>Ticket Type: {table.ticket_type}</Text>
                    <TextInput
                        id="birdTicketType"
                        style={styles.input} onChangeText={setTicketType}
                        defaultValue={table.ticket_type}
                    >
                    </TextInput>
                  </Surface>
                  <div id="image">
                    <img id="image" src={table.Image}/>
                  </div>
                </View>
              ) : animal === "Seal" ? (
                <View>
                  <Surface>
                    <Text style={styles.input}>Additional Notes on ID: {table.Additional_Notes_on_ID}</Text>
                    <TextInput
                        id="sealNotes"
                        style={styles.input} onChangeText={setAdditional_Notes_on_ID}
                        defaultValue={table.Additional_Notes_on_ID}
                    ></TextInput>
                    <Text style={styles.input}>Beach Position: {table.Beach_Position}</Text>
                      <TextInput
                          id="sealPosition"
                          style={styles.input} onChangeText={setBeach_Position}
                          defaultValue={table.Beach_Position}
                      ></TextInput>
                    <Text style={styles.input}>Date: {table.Date}</Text>
                        <TextInput
                            id="sealDate"
                            style={styles.input}
                            onChangeText={setDate}
                            defaultValue={table.Date}
                        ></TextInput>
                    <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initials}</Text>
                          <TextInput
                              id="sealInitials"
                              style={styles.input}
                              onChangeText={setHOI}
                              defaultValue={table.Hotline_Operator_Initials}
                          ></TextInput>
                    <Text style={styles.input}>How Identified: {table.How_Identified}</Text>
                            <TextInput
                                id="sealIdentification"
                                style={styles.input}
                                onChangeText={setHow_Identified}
                                defaultValue={table.How_Identified}
                            ></TextInput>
                    <Text style={styles.input}>ID Perm: {table.ID_Perm}</Text>
                              <TextInput
                                  id="sealIdPerm"
                                  style={styles.input}
                                  onChangeText={setID_Perm}
                                  defaultValue={table.ID_Perm}
                              ></TextInput>
                    <Text style={styles.input}>ID Verified By: {table.ID_Verified_By}</Text>
                                <TextInput
                                    id="sealIdVerfiedBy"
                                    style={styles.input}
                                    onChangeText={setID_Verified_By}
                                    defaultValue={table.ID_Verified_By}
                                ></TextInput>
                    <Text style={styles.input}>ID Temp: {table.ID_temp}</Text>
                                  <TextInput
                                      id="sealIdTemp"
                                      style={styles.input} onChangeText={setID_temp}
                                      defaultValue={table.ID_temp}
                                  ></TextInput>
                    <Text style={styles.input}>Location: {table.Location}</Text>
                                    <TextInput
                                        id="sealLocation"
                                        style={styles.input} onChangeText={setLocation}
                                        defaultValue={table.Location}
                                    ></TextInput>
                    <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
                                      <TextInput
                                          id="sealLocationNotes"
                                          style={styles.input} onChangeText={setLocation_Notes}
                                          defaultValue={table.Location_Notes}
                                      ></TextInput>
                    <Text style={styles.input}>Molt: {table.Molt}</Text>
                                        <TextInput
                                            id="sealMolt"
                                            style={styles.input} onChangeText={setMolt}
                                            defaultValue={table.Molt}
                                        ></TextInput>
                    <Text style={styles.input}>Mom and PupPair: {table.Mom_and_Pup_Pair}</Text>
                                          <TextInput
                                              id="sealPair"
                                              style={styles.input} onChangeText={setMom_and_Pup_Pair}
                                              defaultValue={table.Mom_and_Pup_Pair}
                                          ></TextInput>
                    <Text style={styles.input}>Number of Volunteers Engaged: {table.Number_Volunteers_Engaged}</Text>
                                            <TextInput
                                                id="sealVolunteersEngaged"
                                                style={styles.input} onChangeText={setNumber_Volunteers_Engaged}
                                                defaultValue={table.Number_Volunteers_Engaged}
                                            ></TextInput>
                    <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
                                              <TextInput
                                                  id="sealCallReceived"
                                                  style={styles.input} onChangeText={setNumber_of_Calls_Received}
                                                  defaultValue={table.Number_of_Calls_Received}
                                              ></TextInput>
                    <Text style={styles.input}>Observer: {table.Observer}</Text>
                                                <TextInput
                                                    id="sealObserver"
                                                    style={styles.input} onChangeText={setObserver}
                                                    defaultValue={table.Observer}
                                                ></TextInput>
                    <Text style={styles.input}>Observer Number: {table.Observer_Contact_Number}</Text>
                                                  <TextInput
                                                      id="sealObserverContact"
                                                      style={styles.input} onChangeText={setObserver_Contact_Number}
                                                      defaultValue={table.Observer_Contact_Number}
                                                  ></TextInput>
                    <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
                                                    <TextInput
                                                        id="sealObserverInitials"
                                                        style={styles.input} onChangeText={setObserver_Initials}
                                                        defaultValue={table.Observer_Initials}
                                                    ></TextInput>
                    <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
                                                      <TextInput
                                                          id="sealObserverType"
                                                          style={styles.input} onChangeText={setObserver_Type}
                                                          defaultValue={table.Observer_Type}
                                                      ></TextInput>
                    <Text style={styles.input}>ObserverO Notes: {table.Other_Notes}</Text>
                                                        <TextInput
                                                            id="sealOtherNotes"
                                                            style={styles.input} onChangeText={setOther_Notes}
                                                            defaultValue={table.Other_Notes}
                                                        ></TextInput>
                    <Text style={styles.input}>SRA Set By: {table.SRA_Set_By}</Text>
                                                          <TextInput
                                                              id="sealSraSetBy"
                                                              style={styles.input} onChangeText={setSRA_Set_By}
                                                              defaultValue={table.SRA_Set_By}
                                                          ></TextInput>
                    <Text style={styles.input}>SRA Set Up: {table.SRA_Set_Up}</Text>
                                                            <TextInput
                                                                id="sealSraSetUp"
                                                                style={styles.input} onChangeText={setSRA_Set_Up}
                                                                defaultValue={table.SRA_Set_Up}
                                                            ></TextInput>
                    <Text style={styles.input}>Seal Depart Info Avial: {table.Seal_Depart_Info_Avial}</Text>
                                                              <TextInput
                                                                  id="sealDepartInfo"
                                                                  style={styles.input} onChangeText={setSeal_Depart_Info_Avial}
                                                                  defaultValue={table.Seal_Depart_Info_Avial}
                                                              ></TextInput>
                    <Text style={styles.input}>Seal Departed Date: {table.Seal_Departed_Date}</Text>
                                                                <TextInput
                                                                    id="sealDepartDate"
                                                                    style={styles.input} onChangeText={setSeal_Departed_Date}
                                                                    defaultValue={table.Seal_Departed_Date}
                                                                ></TextInput>
                    <Text style={styles.input}>Seal Departed Time: {table.Seal_Departed_Time}</Text>
                                                                  <TextInput
                                                                      id="sealDepartTime"
                                                                      style={styles.input} onChangeText={setSeal_Departed_Time}
                                                                      defaultValue={table.Seal_Departed_Time}
                                                                  ></TextInput>
                    <Text style={styles.input}>Seal Logging: {table.Seal_Logging}</Text>
                                                                    <TextInput
                                                                        id="sealLogging"
                                                                        style={styles.input} onChangeText={setSeal_Logging}
                                                                        defaultValue={table.Seal_Logging}
                                                                    ></TextInput>
                    <Text style={styles.input}>Seal Present: {table.Seal_Present}</Text>
                                                                      <TextInput
                                                                          id="sealPresent"
                                                                          style={styles.input} onChangeText={setSeal_Present}
                                                                          defaultValue={table.Seal_Present}
                                                                      ></TextInput>
                    <Text style={styles.input}>Sector: {table.Sector}</Text>
                                                                        <TextInput
                                                                            id="sealSector"
                                                                            style={styles.input} onChangeText={setSector}
                                                                            defaultValue={table.Sector}
                                                                        ></TextInput>
                    <Text style={styles.input}>Sex: {table.Sex}</Text>
                                                                          <TextInput
                                                                              id="sealSex"
                                                                              style={styles.input} onChangeText={setSex}
                                                                              defaultValue={table.Sex}
                                                                          ></TextInput>
                    <Text style={styles.input}>Size: {table.Size}</Text>
                                                                            <TextInput
                                                                                id="sealSize"
                                                                                style={styles.input} onChangeText={setSize}
                                                                                defaultValue={table.Size}
                                                                            ></TextInput>
                    <Text style={styles.input}>Tag Color: {table.Tag_Color}</Text>
                                                                              <TextInput
                                                                                  id="sealTagColor"
                                                                                  style={styles.input} onChangeText={setTag_Color}
                                                                                  defaultValue={table.Tag_Color}
                                                                              ></TextInput>
                    <Text style={styles.input}>Tag Number: {table.Tag_Number}</Text>
                                                                                <TextInput
                                                                                    id="sealTagNumber"
                                                                                    style={styles.input} onChangeText={setTag_Number}
                                                                                    defaultValue={table.Tag_Number}
                                                                                ></TextInput>
                    <Text style={styles.input}>Tag Side: {table.Tag_Side}</Text>
                                                                                  <TextInput
                                                                                      id="sealTagSide"
                                                                                      style={styles.input} onChangeText={setTag_Side}
                                                                                      defaultValue={table.Tag_Side}
                                                                                  ></TextInput>
                    <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
                                                                                    <TextInput
                                                                                        id="sealTicketNumber"
                                                                                        style={styles.input} onChangeText={setTicket_Number}
                                                                                        defaultValue={table.Ticket_Number}
                                                                                    ></TextInput>
                    <Text style={styles.input}>Time: {table.Time}</Text>
                                                                                      <TextInput
                                                                                          id="sealTime"
                                                                                          style={styles.input} onChangeText={setTime}
                                                                                          defaultValue={table.Time}
                                                                                      ></TextInput>
                    <Text style={styles.input}>Verified: {table.Verified}</Text>
                                                                                        <TextInput
                                                                                            id="sealVerified"
                                                                                            style={styles.input} onChangeText={setVerified}
                                                                                            defaultValue={table.Verified}
                                                                                        ></TextInput>
                    <Text style={styles.input}>Ticket Type: {table.ticket_type}</Text>
                                                                                          <TextInput
                                                                                              id="sealTicketType"
                                                                                              style={styles.input} onChangeText={setTicketType}
                                                                                              defaultValue={table.ticket_type}
                                                                                          ></TextInput>
                    <div id="image">
                      <img id="image" src={table.Image}/>
                    </div>
                  </Surface>
                </View>
            ) : (
                <View>
                  <Surface>
                    <Text style={styles.input}>Date: {table.Date}</Text>
                    <TextInput
                    id="turtleDate"
                    style={styles.input} onChangeText={setDate}
                    defaultValue={table.Date}
                    ></TextInput>
                    <Text style={styles.input}>FAST: {table.FAST}</Text>
              <TextInput
              id="turtleFast"
              style={styles.input} onChangeText={setFAST}
              defaultValue={table.FAST}
              ></TextInput>
                    <Text style={styles.input}>Hotline Operator Initals: {table.Hotline_Operator_Initials}</Text>
              <TextInput
              id="turtleInitials"
              style={styles.input} onChangeText={setHOI}
              defaultValue={table.Hotline_Operator_Initials}></TextInput>
                    <Text style={styles.input}>Island: {table.Island}</Text>
              <TextInput
              id="turtleIsland"
              style={styles.input} onChangeText={setIsland}
              defaultValue={table.Island}></TextInput>
                    <Text style={styles.input}>Location: {table.Location}</Text>
              <TextInput
              id="turtleLocation"
              style={styles.input} onChangeText={setLocation}
              defaultValue={table.Location}></TextInput>
                    <Text style={styles.input}>Location Notes: {table.Location_Notes}</Text>
              <TextInput
              id="turtleLocationNotes"
              style={styles.input} onChangeText={setLocation_Notes}
              defaultValue={table.Location_Notes}
              ></TextInput>
                    <Text style={styles.input}>Number of Calls Received: {table.Number_of_Calls_Received}</Text>
              <TextInput
              id="turtleNumberCalls"
              style={styles.input} onChangeText={setNumber_of_Calls_Received}
              defaultValue={table.Number_of_Calls_Received}
              ></TextInput>
                    <Text style={styles.input}>Observer: {table.Observer}</Text>
              <TextInput
              id="turtleObserver"
              style={styles.input} onChangeText={setObserver}
              defaultValue={table.Observer}
              ></TextInput>
                    <Text style={styles.input}>Observer Number: {table.Observer_Contact_Number}</Text>
              <TextInput
              id="turtleObserverContact"
              style={styles.input} onChangeText={setObserver_Contact_Number}
              defaultValue={table.Observer_Contact_Number}
              ></TextInput>
                    <Text style={styles.input}>Observer Initials: {table.Observer_Initials}</Text>
              <TextInput
              id="turtleObserverIntiials"
              style={styles.input} onChangeText={setObserver_Initials}
              defaultValue={table.Observer_Initials}
              ></TextInput>
                    <Text style={styles.input}>Observer Type: {table.Observer_Type}</Text>
              <TextInput
              id="turtleObserverType"
              style={styles.input} onChangeText={setObserver_Type}
              defaultValue={table.Observer_Type}
              ></TextInput>
                    <Text style={styles.input}>Other Notes: {table.Other_Notes}</Text>
              <TextInput
              id="turtleOtherNotes"
              style={styles.input} onChangeText={setOther_Notes}
              defaultValue={table.Other_Notes}
              ></TextInput>
                    <Text style={styles.input}>Outreach Provided By Operator: {table.Outreach_provided_by_operator}</Text>
              <TextInput
              id="turtleOutreach"
              style={styles.input} onChangeText={setOPBO}
              defaultValue={table.Outreach_provided_by_operator}
              ></TextInput>
                    <Text style={styles.input}>Primary issue or cause of death: {table.Primary_issue_or_cause_of_death}</Text>
              <TextInput
              id="turtleCod"
              style={styles.input} onChangeText={setPrimary_issue_or_cause_of_death}
              defaultValue={table.Primary_issue_or_cause_of_death}
              ></TextInput>
                    <Text style={styles.input}>Responder: {table.Responder}</Text>
              <TextInput
              id="turtleResponder"
              style={styles.input} onChangeText={setResponder}
              defaultValue={table.Responder}
              ></TextInput>
                    <Text style={styles.input}>Responder Arrival Time: {table.Responder_arrival_time}</Text>
              <TextInput
              id="turtleArrivalTime"
              style={styles.input} onChangeText={setResponder_arrival_time}
              defaultValue={table.Responder_arrival_time}
              ></TextInput>
                    <Text style={styles.input}>Size: {table.Size}</Text>
              <TextInput
              id="turtleSize"
              style={styles.input} onChangeText={setSize}
              defaultValue={table.Size}
              ></TextInput>
                    <Text style={styles.input}>Sector: {table.Sector}</Text>
                    <TextInput
                        id="turtleSector"
                        style={styles.input} onChangeText={setSector}
                        defaultValue={table.Sector}
                    ></TextInput>
                    <Text style={styles.input}>Status: {table.Stauts}</Text>
              <TextInput
              id="turtleStauts"
              style={styles.input} onChangeText={setStauts}
              defaultValue={table.Stauts}
              ></TextInput>
                    <Text style={styles.input}>Ticket Number: {table.Ticket_Number}</Text>
              <TextInput
              id="turtleTicketNumber"
              style={styles.input} onChangeText={setTicket_Number}
              defaultValue={table.Ticket_Number}
              ></TextInput>
                    <Text style={styles.input}>Time: {table.Time}</Text>
              <TextInput
              id="turtleTime"
              style={styles.input} onChangeText={setTime}
              defaultValue={table.Time}
              ></TextInput>
                    <Text style={styles.input}>Time Responder Left: {table.Time_Responder_left}</Text>
              <TextInput
              id="turtleResponderLeft"
              style={styles.input} onChangeText={setTime_Responder_left}
              defaultValue={table.Time_Responder_left}
              ></TextInput>
                    <Text style={styles.input}>Type of Turtle: {table.Type_of_Turtle}</Text>
              <TextInput
              id="turtleType"
              style={styles.input} onChangeText={setType_of_Turtle}
              defaultValue={table.Type_of_Turtle}
              ></TextInput>
                    <Text style={styles.input}>Verified: {table.Verified}</Text>
              <TextInput
              id="turtleVerified"
              style={styles.input} onChangeText={setVerified}
              defaultValue={table.Verified}
              ></TextInput>
                    <Text style={styles.input}>Ticket Type: {table.ticket_type}</Text>
              <TextInput
              id="turtleTicketType"
              style={styles.input} onChangeText={setTicketType}
              defaultValue={table.ticket_type}
              ></TextInput>
                    <div id="image">
                      <img id="image" src={table.Image}/>
                    </div>
                  </Surface>
                </View>
            )}
            </View>
          <Button style={styles.btn} mode="contained" onPress={() => addDoc()}>
            Update
          </Button>


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
            {/*<Button*/}
            {/*    mode="contained"*/}
            {/*    onPress={() => handleVerify()}*/}
            {/*    style={styles.Exportbtn}*/}
            {/*>*/}
            {/*  Verify*/}
            {/*</Button>*/}

          </Surface>

        </View>
      </ScrollView>
  );
};

export default ViewReport;