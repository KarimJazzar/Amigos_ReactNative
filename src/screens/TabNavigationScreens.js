import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CartScreen from './CartScreen';
import CategoryScreen from './CategoryScreen';


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
  
export default function TabNavigationScreens() {
  return (
      <Navigator>
            
      </Navigator>     
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
