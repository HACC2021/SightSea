import React from "react";
import { Alert, Platform } from "react-native";
import { getDatabase, ref, onValue, once } from "firebase/database";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const ExportDatabase = (animalType) => {
  const testJson = {
    Bird: {
      5618: {
        Date: "110521",
        Delivered: "",
        Hotline_Operator_Initials: "",
        Location: "My house",
        Location_Notes: "",
        Number_of_Calls_Received: 0,
        Observer: "Jake",
        Observer_Contact_Nubmer: "888-888-8888",
        Observer_Initials: "JP",
        Observer_Type: "P",
        Other_Notes: "",
        Outreach_provided_by_operator: "",
        Responders_name: "",
        Sector: "",
        Ticket_Number: "XX1105211417",
        Time: "1417",
        Type_of_Bird: "Unknown",
        Where_to: "",
        ticket_type: "C",
      },
      35356: {
        Date: "110521",
        Delivered: "",
        Hotline_Operator_Initials: "",
        Location: "Sandys",
        Location_Notes: "",
        Number_of_Calls_Received: 1,
        Observer: "Patrick ",
        Observer_Contact_Nubmer: "808-675-6962",
        Observer_Initials: "PP",
        Observer_Type: "P",
        Other_Notes: "",
        Outreach_provided_by_operator: "",
        Responders_name: "",
        Sector: "",
        Ticket_Number: "XX1105211346",
        Time: "1346",
        Type_of_Bird: "STAL",
        Where_to: "",
        ticket_type: "C",
      },
    },
    Seal: {
      50259: {
        Additional_Notes_on_ID: "",
        Beach_Position: 1,
        Date: "110521",
        Hotline_Operator_Initials: "",
        How_Identified: "",
        ID_Perm: "",
        ID_Verified_By: "",
        ID_temp: "",
        Location: "Sandys",
        Location_Notes: "",
        Molt: "",
        Mom_and_Pup_Pair: "",
        Number_Volunteers_Engaged: 0,
        Number_of_Calls_Received: 0,
        Observer: "Patrick ",
        Observer_Contact_Nubmer: "808-675-6962",
        Observer_Initials: "PP",
        Observer_Type: "P",
        Other_Notes: "",
        SRA_Set_By: "",
        SRA_Set_Up: "",
        Seal_Depart_Info_Avial: "",
        Seal_Departed_Date: "",
        Seal_Departed_Time: "",
        Seal_Logging: "",
        Seal_Present: "No",
        Sector: "",
        Sex: "Unknown",
        Size: "Subadult",
        Tag_Color: "",
        Tag_Number: "",
        Tag_Side: "",
        Ticket_Number: "XX1105211348",
        Time: "1348",
        ticket_type: "I",
      },
      61312: {
        Additional_Notes_on_ID: "",
        Beach_Position: 0,
        Date: "110521",
        Hotline_Operator_Initials: "",
        How_Identified: "",
        ID_Perm: "",
        ID_Verified_By: "",
        ID_temp: "",
        Location: "Lankai",
        Location_Notes: "",
        Molt: "",
        Mom_and_Pup_Pair: "",
        Number_Volunteers_Engaged: 0,
        Number_of_Calls_Received: 0,
        Observer: "Jake",
        Observer_Contact_Nubmer: "888-888-8888",
        Observer_Initials: "JP",
        Observer_Type: "P",
        Other_Notes: "",
        SRA_Set_By: "",
        SRA_Set_Up: "",
        Seal_Depart_Info_Avial: "",
        Seal_Departed_Date: "",
        Seal_Departed_Time: "",
        Seal_Logging: "",
        Seal_Present: "N",
        Sector: "",
        Sex: "Male",
        Size: "Weaner",
        Tag_Color: "",
        Tag_Number: "",
        Tag_Side: "",
        Ticket_Number: "XX1105211416",
        Time: "1416",
        ticket_type: "I",
      },
    },
    Turtle: {
      47758: {
        Date: "110521",
        FAST: "",
        Hotline_Operator_Initials: "",
        Island: "Oahu",
        Location: "Sandys",
        Location_Notes: "",
        Number_of_Calls_Received: 0,
        Observer: "Patrick ",
        Observer_Contact_Number: "808-675-6962",
        Observer_Initials: "PP",
        Observer_Type: "P",
        Other_Notes: "",
        Outreach_provided_by_operator: "",
        Primary_issue_or_cause_of_death: "",
        Responder: "",
        Responder_arrival_time: "",
        Sector: "",
        Size: "2ft",
        Stauts: "Deceased",
        Ticket_Number: "XX1105211350",
        Time: "1350",
        Time_Responder_left: "",
        Type_of_Turtle: "Ei",
        ticket_type: "R",
      },
      68590: {
        Date: "110521",
        FAST: "",
        Hotline_Operator_Initials: "",
        Island: "Oahu",
        Location: "Lankai",
        Location_Notes: "",
        Number_of_Calls_Received: 0,
        Observer: "Jake",
        Observer_Contact_Number: "888-888-8888",
        Observer_Initials: "JP",
        Observer_Type: "P",
        Other_Notes: "",
        Outreach_provided_by_operator: "",
        Primary_issue_or_cause_of_death: "",
        Responder: "",
        Responder_arrival_time: "",
        Sector: "",
        Size: "2ft",
        Stauts: "Alive",
        Ticket_Number: "XX1105211416",
        Time: "1416",
        Time_Responder_left: "",
        Type_of_Turtle: "Cm",
        ticket_type: "R",
      },
    },
  };
  console.log(animalType);
  var dataJson = {};
  const db = getDatabase();
  const reference = ref(db, `/${animalType}/documents`);
  var ready = 0;
  var csv = "";
  onValue(reference, (snapshot) => {
    const json = snapshot.val();
    const docArray = Object.entries(json);
    docArray.map((item, index) => {
      delete item[1].AnimalType;
      delete item[1].GPS_Coordinate;
      delete item[1].Image;
      delete item[1].Verified;
      delete item[1].Related;
    })
    console.log(docArray);
    var fields = Object.keys(docArray[0][1]);
    var replacer = function (key, value) {
      return value === null ? "" : value;
    };
    console.log(fields);
    csv = docArray.map(function (row) {
      return fields
        .map(function (fieldName) {
          return JSON.stringify(row[1][fieldName], replacer);
        })
        .join(",");
    });
    csv.unshift(fields.join(","));
    csv = csv.join("\r\n");
    ready = 1;
    console.log(csv);

    if (Platform.OS == "web") {
      var blob = new Blob(["\ufeff", csv]);
      var url = URL.createObjectURL(blob);
      console.log(url.substring(5));
      var downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "data.csv";
      downloadLink.click();
    } else if (Platform.OS === "android") {
      saveImageMobile();
    } else {
      window.alert(
        "CSV file downloads are not supported on IOS.  Please download the CSV file on the desktop site"
      );
    }
  });

  async function saveImageMobile() {
    const permission = await MediaLibrary.requestPermissionsAsync();
    //window.alert(JSON.stringify(permission));

    if (permission.granted) {
      //await MediaLibrary.createAlbumAsync("Download", asset, false);
      const album = await MediaLibrary.getAlbumAsync("SightSea");
      if (album === null) {
        console.log("adding asset to new album");
        const uri = FileSystem.documentDirectory + "data.csv";
        const systemFile = await FileSystem.writeAsStringAsync(uri, csv, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log("asset:" + JSON.stringify(asset));
        console.log("creating album");
        await MediaLibrary.createAlbumAsync("Expo", asset)
          .then(() => {
            console.log("album created");
            Alert.alert("file saved, please check your photo album");
          })
          .catch((error) => {
            window.alert("unable to save photo");
            console.log("err", error);
          });
      } else {
        const uri = FileSystem.documentDirectory + "data.csv";
        const systemFile = await FileSystem.writeAsStringAsync(uri, csv, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        const asset = await MediaLibrary.createAssetAsync(uri);
        let added = await MediaLibrary.addAssetsToAlbumAsync(
          asset,
          album,
          false
        );
        if (added === true) {
          console.log("asset added to existing album");
        } else {
          console.log("error adding asset to existing album");
        }
      }
    }

    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
    }
    //permission cases:
    //https://ndpniraj.com/reading-audio-files-from-device-using-react-native-expo/
  }
};

export default ExportDatabase;
