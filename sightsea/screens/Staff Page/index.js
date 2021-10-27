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
import { DataTable } from 'react-native-paper';


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
  table : {
    marginTop: 10,


  },
  columns : {
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
  // const [Input, setInput] = React.useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(Input);
  // };

  return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Staff Page</Text>

          <DataTable style= {styles.table}>

            <DataTable.Header>
              <DataTable.Title style={styles.columns} >Date & Time</DataTable.Title>
              <DataTable.Title style={styles.columns} >Location</DataTable.Title>
              <DataTable.Title style={styles.columns} >Identifying Markings</DataTable.Title>
              <DataTable.Title style={styles.columns} >Behavior</DataTable.Title>
              <DataTable.Title style={styles.columns}>Crowd Size</DataTable.Title>
              <DataTable.Title style={styles.columns}>Name</DataTable.Title>
              <DataTable.Title style={styles.columns}> Phone #</DataTable.Title>
              <DataTable.Title style={styles.columns}>Images</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>Today 1:00 PM</DataTable.Cell>
              <DataTable.Cell>Sandys</DataTable.Cell>
              <DataTable.Cell>Spot on Head</DataTable.Cell>
              <DataTable.Cell>Erratic</DataTable.Cell>
              <DataTable.Cell>40 People</DataTable.Cell>
              <DataTable.Cell>Patrick</DataTable.Cell>
              <DataTable.Cell>123-4567</DataTable.Cell>
              <DataTable.Cell>None.</DataTable.Cell>

            </DataTable.Row>

          </DataTable>


        </View>
      </View>
  );
};

export default StaffPage;
