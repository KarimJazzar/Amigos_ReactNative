import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

const getCategoriesFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, "category"));
  let arr = []
  let i = 0;
  querySnapshot.forEach((doc) => {
  //   setFirebaseData((prevData) => [...prevData, doc.data()]);
  arr.push({id: doc.id, name: doc.data().name})
  //console.log(doc.data().catName)
  });
  //setCatData(arr)
  return arr;
};
  
const EditCategory = ({navigation}) => {
    const goBack = () => {
      navigation.goBack()
    }

    const [categories,setCategories] = useState([]);

    useEffect(() => {
      getCategoriesFromFirebase().then(userDetails => {
        console.log(userDetails);
        setCategories(userDetails)
      })
    }, []);

    const Item = ({ title, getCusDetails, category}) => (
      <TouchableOpacity onPress = {() => getCusDetails(category)}>
      <View style={styles.item}>
  
        <Text style={styles.title}>{title}</Text>
      </View>
  
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item title={item.name} getCusDetails={pressDetails} category={item}/>
    ); 

    const pressDetails = (category) => {
      navigation.navigate('EditCategoryFinal',category);
    }

    return (
        
          <View style={styles.container}>

          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Edit Category:</Text>

          <FlatList style={styles.list} data={categories}
            renderItem = {renderItem}
            />

          </View>
        
      )
};
  
export default EditCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#000',
    paddingTop: 35,
    paddingHorizontal: 15
  },
  list: {
    flex: 1,
    height: '100%',
    width: '100%'
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
  item: {
      backgroundColor: '#095A47',
      padding: 20,
      marginVertical: 8,
      borderRadius: 5
    },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  })