import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 

  
const AddCategoryScreen = () => {

    const [CatName, setCatName] = useState('')
    const [CatDesc, setCatDesc] = useState('')


    const validation = () =>{

        if(CatName==''){
            Alert.alert("Enter Category")
        }else{
            addToDb()
           

        }
    }

    const addToDb = () => {
        try {
          const docRef = addDoc(collection(db, "category"), {
            name: CatName,
            //catDesc: CatDesc,
          });

          clearInputs()
          Alert.alert("Added Successfully")
          
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: "+ formValues.student_id, e);
        }
      };

    const clearInputs = () => {
        setCatName('')
        setCatDesc('')

    }


    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={styles.inputContainer}>
    
          <TextInput
              placeholder="Category Name"
              value={CatName}
              onChangeText={text => setCatName(text)}
              style={styles.input}
            />
  
          </View>
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={validation}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Create Category</Text>
            </TouchableOpacity>
           
          </View>
        </KeyboardAvoidingView>
      )
};
  
export default AddCategoryScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })