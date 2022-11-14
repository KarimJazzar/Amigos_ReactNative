import { Button, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import CategoryScreen from '../screens/CategoryScreen';
import AdminHomeScreen from '../screens/AdminHomeScreen';

import { auth } from '../firebase';
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 


const routHome = "Home";
const routCart = "Cart";
const routProfile = "Profile";
const routAdmin = "Admin";

const Tap = createBottomTabNavigator();
  
export default function TabNavigationScreens() {
  const userLoggedInID = auth.currentUser?.uid
  const [userLogged, setUserLogged] = useState(null);

  const getUserDetails = async (id) => {
    const userSnapshot = await getDoc(doc(db, 'users', id));
    if (userSnapshot.exists()) {
        //console.log(userSnapshot.data());     
        return userSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
  };

  useEffect(() => {
    getUserDetails(userLoggedInID).then(userDetails => {
      setUserLogged(userDetails)
      console.log(userDetails.isAdmin);
    })
  }, []);

  return (
    <Tap.Navigator
    screenOptions={ ({route}) => ({ 
      headerShown: false,
      tabBarStyle: { backgroundColor: '#000' },
      tabBarActiveTintColor: '#84B026',
      tabBarInactiveTintColor: '#fff',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconColor = focused ? "#84B026" : "#fff";
        let rn = route.name;

        if (rn == routHome) {
          iconName = "md-home";
        } else if (rn == routCart) {
          iconName = "md-cart";
        } else if (rn == routProfile) {
          iconName = "md-person-circle-outline";
        } else {
          iconName = "md-menu";
        }

        return <Ionicons name={iconName} size={24} color={iconColor}/>
      },
    })}>
      <Tap.Screen name={routHome} component={HomeScreen}/>
      <Tap.Screen name={routCart} component={CartScreen} options={{ 
        tabBarBadge: 3, 
        tabBarBadgeStyle: { 
          backgroundColor: 'red',
          opacity: 0
        }
      }}/>
      <Tap.Screen name={routProfile} component={ProfileScreen}/>
      { (userLogged != null && userLogged.isAdmin) ?
        <Tap.Screen name={routAdmin} component={CategoryScreen}/>
        : <></>
      }
    </Tap.Navigator>
  );
}