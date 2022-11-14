import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
  
const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#000000", fontSize: 40 }}>Profile Screen!</Text>
      <Ionicons name="md-person-circle-outline" size={80} color="#000000" />
    </View>
  );
};
  
export default ProfileScreen;