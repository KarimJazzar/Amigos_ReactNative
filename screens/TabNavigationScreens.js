import { Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";


import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CartScreen from './CartScreen';
import CategoryScreen from './CategoryScreen';
import { auth } from '../firebase';
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 

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

const userLoggedInID = auth.currentUser?.uid

  const getUserDetails = async (id) => {
    const userSnapshot = await getDoc(doc(db, 'users', id));
    if (userSnapshot.exists()) {
        //console.log(userSnapshot.data());     
        return userSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
};
  
function TabNavigationScreens(){
  const [userLogged,setUserLogged] = useState({});


  useEffect(() => {
    getUserDetails(userLoggedInID).then(userDetails => {
      setUserLogged(userDetails)
    })
  }, []);
  

  if(userLogged.isAdmin==false){
    return (
      <Navigator>
            
      </Navigator>  
  );
  }else{
    return (
      <Text>Admin</Text>  
  );
  }

  
}

export default TabNavigationScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
