import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';
  
const EditCategoryFinal = ({navigation, route}) => {
    const [CatName, setCatName] = useState('')

    const goBack = () => {
      navigation.goBack()
    }

    const validation = () =>{
        if(CatName==''){
            Alert.alert("Enter Category")
        }else{
            editCategory()
        }
    }

    async function deleteCategory() {
  
        await deleteDoc(doc(db, "category", cat.id))
        Alert.alert("Category Deleted Successfully")
        navigation.pop();
        navigation.pop();
        navigation.navigate("EditCategory")

    }

    async function editCategory() {
        //const querySnapshot = await getDocs(collection(db, "Students"));
  
        await setDoc(doc(collection(db, "category"), cat.id), {
          name:CatName
        });
        Alert.alert("Category Modified Successfully")
        navigation.pop();
        navigation.pop();
        navigation.navigate("EditCategory")
      }


    const clearInputs = () => {
        setCatName('')
        setCatDesc('')
    }

    const cat = route.params;

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

          <Text style={styles.headline}>Category:</Text>

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
              <Text style={styles.buttonText}>Edit Category</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={deleteCategory}
              style={styles.button2}
            >
              <Text style={styles.buttonText}>Delete Category</Text>
            </TouchableOpacity>
           
          </View>
        </KeyboardAvoidingView>
      )
};
  
export default EditCategoryFinal;

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
    inputContainer: {
      width: '100%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#095A47',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    button2: {
        backgroundColor: 'red',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
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