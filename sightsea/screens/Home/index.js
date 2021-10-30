import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    //justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: "10%",
  },
  buttonText: {
    fontSize: 20,
  },
  buttonGroup: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    marginTop: "30%",
  },
  navButton: {
    textAlign: "center",
    justifyContent: "center",
    width: "160%",
    height: 75,
    backgroundColor: "#DDDDDD",
    //backgroundColor: "lightblue",
    padding: "5%",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "rgba(0,0,0,0.2)",
    marginTop: "5%",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

const image = {
  uri: "https://i.ibb.co/Wc2RzBV/Swimming-with-a-Hawaiian-Sea-Turtle-6-1024x683.jpg",
};

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to SightSea!</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Form")}
          >
            <Text style={styles.buttonText}>Report an Animal Sighting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.buttonText}>Report a Distressed Animal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("StaffLogin")}
          >
            <Text style={styles.buttonText}>Staff Portal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
