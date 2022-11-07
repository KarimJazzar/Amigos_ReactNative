import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
  
const CartScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#000000", fontSize: 40 }}>Cart Screen!</Text>
      <Ionicons name="md-cart" size={80} color="#000000" />
    </View>
  );
};
  
export default CartScreen;