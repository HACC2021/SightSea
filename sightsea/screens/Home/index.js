import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer, useTheme } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
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
    buttonText: {
      fontSize: 20,
      color: "white",
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
      padding: "5%",
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "rgba(0,0,0,0.2)",
      marginTop: "10%",
      backgroundColor: colors.primary,
    },
  });

  return (
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
  );
};

export default HomeScreen;
