import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import Component from 'react';
import Proptypes from 'prop-types';
import { DataTable, Checkbox } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71EEB0",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: "bold",
    borderWidth: 3,
    textAlign: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  secondaryheader: {
    fontSize: 30,
    marginTop: 40,
    fontWeight: "bold",
    borderWidth: 3,
    textAlign: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

  },
  table: {
    marginTop: 10,
    marginBottom: 10,

  },
  columns: {
    width: 100,
    flex: 1,
    justifyContent: 'space-between',

  },
  row: {
    width: 100,
    flex: 1,
    justifyContent: 'space-between',

  },


});

//searchable table of reports
//should default to display most recent 5 only then
//after search should refresh with search target values

//Need to place reports on Oahu/Google Map,
// as pins with accurate locations form the reports that
// are being displayed

//protected route/login
const StaffPage = () => {


  const [checked, setChecked] = React.useState(false)

  //console.log("Checked :", checked)
  const Assign = (e) => {
    e.preventDefault();
    console.log("Assign to volunteer");
  };

  return (
      //Can only return 1 view object for Andriod

      <View style={styles.container}>
        <Text style={styles.header}>Approve Reports</Text>

        <DataTable style={styles.table}>

          <DataTable.Header>
            <DataTable.Title style={styles.columns}>Date & Time</DataTable.Title>
            <DataTable.Title style={styles.columns}>Location</DataTable.Title>
            <DataTable.Title style={styles.columns}>Identifying Markings</DataTable.Title>
            <DataTable.Title style={styles.columns}>Behavior</DataTable.Title>
            <DataTable.Title style={styles.columns}>Crowd Size</DataTable.Title>
            <DataTable.Title style={styles.columns}>Name</DataTable.Title>
            <DataTable.Title style={styles.columns}> Phone #</DataTable.Title>
            <DataTable.Title style={styles.columns}>Images</DataTable.Title>
            <DataTable.Title style={styles.columns}>Assigned? </DataTable.Title>
          </DataTable.Header>
          {/* Loop over new reports and display them here */}
          <DataTable.Row>
            <DataTable.Cell style={styles.row}>Today 1:00 PM</DataTable.Cell>
            <DataTable.Cell style={styles.row}>Sandys</DataTable.Cell>
            <DataTable.Cell style={styles.row}>Spot on Head</DataTable.Cell>
            <DataTable.Cell style={styles.row}>Erratic</DataTable.Cell>
            <DataTable.Cell style={styles.row}>40 People</DataTable.Cell>
            <DataTable.Cell style = {styles.row}>Patrick</DataTable.Cell>
            <DataTable.Cell style = {styles.row}>123-4567</DataTable.Cell>
            <DataTable.Cell style = {styles.row}>None.</DataTable.Cell>
            <DataTable.Cell style={styles.row}>
              <Checkbox status ={checked ? 'checked': 'unchecked'}  onPress={() => {setChecked(!checked)}}>

              </Checkbox>
            </DataTable.Cell>

          </DataTable.Row>

        </DataTable>

        {/*Assign to volunteer page */}

        <Button style = {styles.button} title = "Assign" onPress = {Assign}></Button>
        <Text style={styles.secondaryheader}>Reports</Text>

        {/* Display map with pins for ALL new reports */}

        <DataTable style={styles.table}>

          <DataTable.Header>
            <DataTable.Title style={styles.columns}>Date & Time</DataTable.Title>
            <DataTable.Title style={styles.columns}>Location</DataTable.Title>
            <DataTable.Title style={styles.columns}>Identifying Markings</DataTable.Title>
            <DataTable.Title style={styles.columns}>Behavior</DataTable.Title>
            <DataTable.Title style={styles.columns}>Crowd Size</DataTable.Title>
            <DataTable.Title style={styles.columns}>Name</DataTable.Title>
            <DataTable.Title style={styles.columns}> Phone #</DataTable.Title>
            <DataTable.Title style={styles.columns}>Images</DataTable.Title>
            <DataTable.Title style={styles.columns}>Volunteer</DataTable.Title>
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
  );
};

export default StaffPage;
