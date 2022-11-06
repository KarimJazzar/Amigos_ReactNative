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

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarOptions: {
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-home"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
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
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-person-circle-outline"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
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
        activeTintColor: "#006600",
      },
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons
            name="md-settings-outline"
            size={24}
            color={tabInfo.focused ? "#006600" : "#8e8e93"}
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
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Navigator>
        <Stack.Screen name="Home" component={HomeScreen} /> 
        </Navigator> 
      </Stack.Navigator>
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
