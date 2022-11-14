import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

const OrdersScreenFinal = ({navigation, route}) => {
    const order = route.params;

    const goBack = () => {
      navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={goBack} style={styles.backGroup}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
              <Text style={styles.backTxt}>Back</Text>
            </Pressable>

            <Text style={styles.headline}>Product: {order.name}</Text>
            <Text style={styles.customerTxt}>Price: {order.price}</Text>
            <Text style={styles.customerTxt}>Quantity: {String(order.amount)}</Text>
            <Text style={styles.customerTxt}>Category: {order.category}</Text>
            <Text style={styles.customerTxt}>Discount: {order.discount}</Text>
            <Text style={styles.customerTxt}>Total: {order.total}</Text>
            <Text style={styles.customerTxt}>Status: {order.status}</Text>
            
            
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

  export default OrdersScreenFinal

  