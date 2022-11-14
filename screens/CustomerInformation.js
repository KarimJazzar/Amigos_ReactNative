import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 

  async function getCustomersFromFirebase() {
    let students = []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      students.push({
        id: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        address: doc.data().address,
        email: doc.data().email,
        isAdmin: doc.data().isAdmin
      });
    });
    //console.log(students)
    return students;
  }

  const Item = ({ title, getCusDetails, customer }) => (
    <TouchableOpacity onPress = {() => getCusDetails(customer)}>
    <View style={styles.item}>

      <Text style={styles.title}>{title}</Text>
    </View>

    </TouchableOpacity>
  );

const CustomerInformation = ({navigation}) => {

    const pressDetails = (customer) => {
        navigation.navigate('CustomerDetails',customer);
      }

    const [customers,setCustomers] = useState([]);

    const renderItem = ({ item }) => (
        <Item title={item.firstName + " " + item.lastName} getCusDetails={pressDetails} customer={item}/>
      ); 

    useEffect(() => {
      getCustomersFromFirebase().then(userDetails => {
        //console.log(userDetails);
        setCustomers(userDetails)
      })
    }, []);

    return (
        <View styles={styles.container}>
        <FlatList data={customers}
          renderItem = {renderItem}
          />
        </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 60,
    },
    item: {
        backgroundColor: 'cyan',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 12,
      },
  });

  export default CustomerInformation

  