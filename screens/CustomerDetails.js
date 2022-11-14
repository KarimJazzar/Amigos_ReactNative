import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 

const getUserDetails = async (id) => {
    const userSnapshot = await getDoc(doc(db, 'users', id));
    if (userSnapshot.exists()) {
        //console.log(userSnapshot.data());     
        return userSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
  };

const CustomerDetails = ({route}) => {
    const customer = route.params;

    console.log(customer)

    return (
        <View styles={styles.container}>
            <Text>First Name: {customer.firstName}</Text>
            <Text>Last Name: {customer.lastName}</Text>
            <Text>Last Name: {customer.email}</Text>
            <Text>Address: {customer.address}</Text>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
    },
  });

  export default CustomerDetails

  