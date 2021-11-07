import React from "react";
import { getDatabase, ref, onValue, once } from "firebase/database";

const ExportDatabase = () => {
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
  //   var dataJson = {};
  //   const db = getDatabase();
  //   const reference = ref(db, "/Bird");
  //   onValue(reference, (snapshot) => {
  //     console.log(snapshot.val());
  //   });

  const json = testJson.Bird;
  const docArray = Object.entries(json);
  console.log(docArray);
  var fields = Object.keys(docArray[0][1]);
  var replacer = function (key, value) {
    return value === null ? "" : value;
  };
  console.log(fields);
  var csv = docArray.map(function (row) {
    return fields
      .map(function (fieldName) {
        return JSON.stringify(row[1][fieldName], replacer);
      })
      .join(",");
  });
  csv.unshift(fields.join(","));
  csv = csv.join("\r\n");
  console.log(csv);
};

export default ExportDatabase;
