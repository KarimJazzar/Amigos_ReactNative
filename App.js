import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Platform } from "react-native";

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CartScreen from './screens/CartScreen';
import CategoryScreen from './screens/CategoryScreen';


const Stack = createNativeStackNavigator();


const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarOptions: {
        activeTintColor: "#000000",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-home"
            size={24}
            color={tabInfo.focused ? "#000000" : "#8e8e93"}
          />
        );
      },
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarOptions: {
        activeTintColor: "#000000",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-person-circle-outline"
            size={24}
            color={tabInfo.focused ? "#000000" : "#8e8e93"}
          />
        );
      },
    },
  },
  Cart: {
    screen: CartScreen,
    navigationOptions: {
      tabBarLabel: "Cart",
      tabBarOptions: {
        activeTintColor: "#000000",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-cart"
            size={24}
            color={tabInfo.focused ? "#000000" : "#8e8e93"}
          />
        );
      },
    },
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      tabBarLabel: "Category",
      tabBarOptions: {
        activeTintColor: "#000000",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-menu"
            size={24}
            color={tabInfo.focused ? "#000000" : "#8e8e93"}
          />
        );
      },
    },
  },
});


  
const Navigator = createAppContainer(TabNavigator);
  
export default function App() {

  return (
    <NavigationContainer>
      <Navigator>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
       
       
        <Stack.Screen name="Home" component={HomeScreen} /> 
        
      </Stack.Navigator>
      </Navigator>
       
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
