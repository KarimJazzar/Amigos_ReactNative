import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from '../firebase';
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { FirebaseError } from 'firebase/app';
  
const UpdateScreen = ({route, navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fName, setFirstName] = useState('')
  const [lName, setLastName] = useState('')
  const [userAdress, setAddress] = useState('')

  const { usID } = route.params;


  //const navigation = useNavigation()

  const userLoggedInID = auth.currentUser?.uid

  const getUserDetails = async (id) => {
    const userSnapshot = await getDoc(doc(db, 'users', id));
    if (userSnapshot.exists()) {
        return userSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
  };

  const handleHome = () => {
    navigation.replace("TabNavigation")
  }

  console.log(usID);
  function updateFirebaseData(){
    const docRef = doc(db,"users", userID);
    const userData = {
        address: userAdress,
        email: email,
        firstName: fName,
        lastName: lName,
        password: password
    }
    console.log(userData);
    setDoc(docRef,userData);
  }

  const handleUpdatedData = () => {
    // UPDATION CODE HERE
    const docRef = doc(db,"users", usID);
    const userData = {
        email: email,
        firstName: fName,
        lastName: lName,
        address: userAdress,
        isAdmin: false
    }
    setDoc(docRef,userData);
  }

  const [userLogged,setUserLogged] = useState({});


  useEffect(() => {
    getUserDetails(userLoggedInID).then(userDetails => {
      setUserLogged(userDetails)
    })
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>

      <TextInput
          placeholder="First Name"
          value={fName}
          onChangeText={text => setFirstName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Last Name"
          value={lName}
          onChangeText={text => setLastName(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Address"
          value={userAdress}
          onChangeText={text => setAddress(text)}
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleUpdatedData}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleHome}
        style={styles.button}
      >
      <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
  
export default UpdateScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
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
    backgroundColor: '#095A47',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#000',
    marginTop: 5,
    borderColor: '#84B026',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#84B026',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center'
  },
})