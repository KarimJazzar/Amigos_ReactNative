import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';
  
const EditProduct = ({navigation}) => {
    const goBack = () => {
      navigation.goBack()
    }

    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={styles.inputContainer}>

          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Edit Product:</Text>
        
          </View>
        </KeyboardAvoidingView>
      )
};
  
export default EditProduct;

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
  })