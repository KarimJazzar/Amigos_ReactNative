import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

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
    const goBack = () => {
      navigation.goBack()
    }

    const pressDetails = (customer) => {
        navigation.navigate('CustomerDetail',customer);
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
        <View style={styles.container}>
          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Customers:</Text>
          
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

export default CustomerInformation

  