import React from "react";
import { StyleSheet, Text, View, Button, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Report/Sight an animal"
        onPress={() => navigation.navigate("Form")}
      ></Button>
    </View>
  );
};

export default HomeScreen;
