import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

  async function getCustomersFromFirebase() {
    let students = []
    
    const q = query(collection(db, "orders"), where("status", "==", "ongoing"));

     const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  students.push({
    id: doc.id,
    name: doc.data().name,
    total: doc.data().total
  });
});

   
    return students;
  }

  const Item = ({ title, getCusDetails, customer }) => (
    <TouchableOpacity onPress = {() => getCusDetails(customer)}>
    <View style={styles.item}>

      <Text style={styles.title}>{title}</Text>
    </View>

    </TouchableOpacity>
  );

const OrderInfo = ({navigation}) => {
    const goBack = () => {
      navigation.goBack()
    }

    const pressDetails = (customer) => {
        navigation.navigate('Ongoing Orders',customer);
      }

    const [customers,setCustomers] = useState([]);

    const renderItem = ({ item }) => (
        
        <Item title={item.name + "    Order Total: " + item.total} getCusDetails={pressDetails} customer={item}/>
      ); 

    useEffect(() => {
      getCustomersFromFirebase().then(userDetails => {
        //console.log(userDetails);
        setCustomers(userDetails)
      })
    }, []);

    return (
        <View style={styles.container}>
          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Orders:</Text>
          
          <FlatList style={styles.list} data={customers}
            renderItem = {renderItem}
            />


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
});

export default OrderInfo

  