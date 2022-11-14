import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from '../firebase';
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite";
import { useNavigation } from '@react-navigation/core'
  
const ProfileScreen = () => {

  const navigation = useNavigation()

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

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleUpdate = () => {
        navigation.replace("Update")
  }

  const handleOrders = () => {
    navigation.navigate("OrdersScreen")
}



  useEffect(() => {
    getUserDetails(userLoggedInID).then(userDetails => {
      setUserLogged(userDetails)
    })
  }, []);

  return (
    <View style={styles.container}>
      <Ionicons name="md-person-circle-outline" size={80} color="white" />
      <Text style={{ color: "white", fontSize: 20 }}>{"Name: " + userLogged.firstName + " " + userLogged.lastName}</Text>
      <Text style={{ color: "white", fontSize: 12 }}>{"Email: " + userLogged.email}</Text>
      <Text style={{ color: "white", fontSize: 12 }}>{"Address: " + userLogged.address}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.item}
      >
        <Text style={styles.backTxt}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleUpdate}
        style={styles.item}
      >
        <Text style={styles.backTxt}>Update Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleOrders}
        style={styles.item}
      >
        <Text style={styles.backTxt}>View Orders</Text>
      </TouchableOpacity>
      
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingTop: 35,
    paddingHorizontal: 15
  },
  backTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  item: {
      backgroundColor: '#095A47',
      padding: 10,
      marginVertical: 15,
      borderRadius: 5,
      width:'50%',
    },
});

export default ProfileScreen;