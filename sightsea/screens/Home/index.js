import React from "react";
import { StyleSheet, Text, View, Button, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "aliceblue",
    alignItems: "center",
    //justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: "10%"
  },
  buttonGroup: {
    position: "relative",
    marginTop: 10,
    height: "20%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton : {
    width: "100%",
    marginTop: "5%",
    height: "5%",
  }
});

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome to SightSea!</Text>
      <View style={styles.buttonGroup}>
      <Button
        style={styles.navButton}
        title="Report an Animal Sighting"
        onPress={() => navigation.navigate("Form")}
      ></Button>
      <Button
        style={styles.navButton}
        title="Report a Distressed Animal"
      ></Button>
      </View>
    </View>
  );
};

export default HomeScreen;
