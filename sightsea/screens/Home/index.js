import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { getDatabase, ref, onValue, set } from "firebase/database";

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
    paddingTop: "10%",
  },
  buttonGroup: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    marginTop: "30%",
  },
  navButton: {
    fontSize: 10,
    textAlign: "center",
    justifyContent: "center",
    width: "160%",
    height: 75,
    //backgroundColor: "#DDDDDD",
    padding: "3%",
    borderWidth: 1,
    borderRadius: 30,
    // borderColor: "rgba(0,0,0,0.2)",
    marginTop: "10%",
  },
});

const image = {
  uri: "https://i.ibb.co/Wc2RzBV/Swimming-with-a-Hawaiian-Sea-Turtle-6-1024x683.jpg",
};
//get window size of current device
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    titleText: {
      fontSize: 50,
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: windowHeight * 0.1,
    },
    buttonText: {
      fontSize: 20,
    },
    buttonGroup: {
      position: "relative",
      flex: 1,
      alignItems: "center",
      ...Platform.select({
        ios: {
          marginTop: windowHeight * 0.15,
        },
        android: {
          marginTop: windowHeight * 0.15,
        },
        default: {
          marginTop: windowHeight * 0.03,
        },
      }),
    },
    navButton: {
      textAlign: "center",
      justifyContent: "center",
      width: windowHeight * 0.45,
      height: 75,
      backgroundColor: "#DDDDDD",
      //backgroundColor: "lightblue",
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "rgba(0,0,0,0.2)",

      ...Platform.select({
        ios: {
          padding: windowWidth * 0.05,
          marginTop: windowWidth * 0.05,
        },
        android: {
          padding: windowWidth * 0.05,
          marginTop: windowWidth * 0.05,
        },
        default: {
          padding: windowWidth * 0.03,
          marginTop: windowHeight * 0.03,
        },
      }),
    },
    image: {
      flex: 1,
      justifyContent: "center",
    },
  });

  async function addDoc() {
    const db = getDatabase();
    const reference = ref(db, "test/" + "testdoc");
    await set(reference, {
      field1: "hello2",
    });
    window.alert("clicked");
  }

  return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to SightSea!</Text>
        <View style={styles.buttonGroup}>
          <Button
            style={styles.navButton}
            onPress={() => navigation.navigate("Form")}
          >
            Report an Animal Sighting
          </Button>
          <Button style={styles.navButton}>Report a Distressed Animal</Button>
          <Button
            style={styles.navButton}
            onPress={() => navigation.navigate("StaffLogin")}
          >
            Staff Portal
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
