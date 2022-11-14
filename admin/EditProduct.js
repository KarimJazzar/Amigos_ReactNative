import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

const getProductsFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, "product"));
  let arr = []
  let i = 0;
  querySnapshot.forEach((doc) => {
  //   setFirebaseData((prevData) => [...prevData, doc.data()]);
  arr.push({id: doc.id, 
    name: doc.data().name,
    price: doc.data().price,
    description: doc.data().description,
    url: doc.data().url,
    category: doc.data().category,
    quantity: doc.data().quantity,
    discount: doc.data().discount,
    userID:doc.data().userID
  })
  //console.log(doc.data().catName)
  });
  //setCatData(arr)
  return arr;
};
  
const EditProduct = ({navigation}) => {
  const userLoggedInID = auth.currentUser?.uid
    const goBack = () => {
      navigation.goBack()
    }

    const [products,setProducts] = useState([]);

    useEffect(() => {
      getProductsFromFirebase().then(userDetails => {
        //console.log(userDetails);
        const filteredProducts = userDetails.filter(x => x.userID == userLoggedInID);
        console.log(filteredProducts);
        setProducts(filteredProducts)
      })
    }, []);

    const Item = ({ title, getCusDetails, product}) => (
      <TouchableOpacity onPress = {() => getCusDetails(product)}>
      <View style={styles.item}>
  
        <Text style={styles.title}>{title}</Text>
      </View>
  
      </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
      <Item title={item.name} getCusDetails={pressDetails} product={item}/>
    ); 

    const pressDetails = (product) => {
      navigation.navigate('EditProductFinal',product);
    }

    return (
        
          <View style={styles.container}>

          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Edit Product:</Text>

          <FlatList style={styles.list} data={products}
            renderItem = {renderItem}
            />

          </View>
        
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