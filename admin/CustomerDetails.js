import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

const getUserDetails = async (id) => {
    const userSnapshot = await getDoc(doc(db, 'users', id));
    if (userSnapshot.exists()) {
        //console.log(userSnapshot.data());     
        return userSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
  };

const CustomerDetails = ({navigation, route}) => {
    const customer = route.params;

    const goBack = () => {
      navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={goBack} style={styles.backGroup}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
              <Text style={styles.backTxt}>Back</Text>
            </Pressable>

            <Text style={styles.headline}>{customer.firstName} {customer.lastName}</Text>
            <Text style={styles.customerTxt}>Email: {customer.email}</Text>
            <Text style={styles.customerTxt}>Address: {customer.address}</Text>
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#000',
      paddingTop: 35,
      paddingHorizontal: 15
    },
    backGroup: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 30,
      marginTop: 15
    },
    backTxt: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 5
    },
    headline: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#fff',
      marginBottom: 15
    },
    customerTxt: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15
    }
  });

  export default CustomerDetails

  