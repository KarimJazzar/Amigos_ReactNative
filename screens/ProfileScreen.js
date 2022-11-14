import React, { useEffect, useState } from 'react'
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from '../firebase';
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
  
const ProfileScreen = () => {

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


  const [userLogged,setUserLogged] = useState({});


  useEffect(() => {
    getUserDetails(userLoggedInID).then(userDetails => {
      setUserLogged(userDetails)
    })
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Ionicons name="md-person-circle-outline" size={80} color="#000000" />
      <Text style={{ color: "#000000", fontSize: 20 }}>{"Name: " + userLogged.firstName + " " + userLogged.lastName}</Text>
      <Text style={{ color: "#000000", fontSize: 12 }}>{"Email: " + userLogged.email}</Text>
      <Text style={{ color: "#000000", fontSize: 12 }}>{"Address: " + userLogged.address}</Text>
      
    </View>
  );
};
  
export default ProfileScreen;