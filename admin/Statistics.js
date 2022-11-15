import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db } from '../firebase'
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { Ionicons } from '@expo/vector-icons';

async function getOrdersFromFirebase() {
    let orders = []
    const querySnapshot = await getDocs(collection(db, "orders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      orders.push({
        id: doc.id,
        name: doc.data().name,
        amount: doc.data().amount,
        category: doc.data().category,
        price: doc.data().price,
        productID: doc.data().productID,
        total: doc.data().total,
        userID: doc.data().userID,
        discount: doc.data().discount,
        status: doc.data().status,
      });
    });
    //console.log(students)
    return orders;
  }

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

  const Item = ({ title, getCusDetails, customer }) => (
    <TouchableOpacity onPress = {() => getCusDetails(customer)}>
    <View style={styles.item}>

      <Text style={styles.title}>{title}</Text>
    </View>

    </TouchableOpacity>
  );

const Statistics = ({navigation}) => {
    const goBack = () => {
      navigation.goBack()
    }

    const pressDetails = (customer) => {
        navigation.navigate('CustomerDetail',customer);
      }

    const [orders,setOrders] = useState([]);
    const [total,setTotal] = useState([]);
    const [totalCat,setTotalCat] = useState("");
    const [temp,setTemp] = useState([]);

    const renderItem = ({ item }) => (
        <Item title={item.firstName + " " + item.lastName} getCusDetails={pressDetails} customer={item}/>
      ); 

    useEffect(() => {
      getOrdersFromFirebase().then(userDetails => {
        //console.log(userDetails);
        setOrders(userDetails)
        let tot = 0;
        for(let i=0;i<userDetails.length;i++){
            tot = tot + userDetails[i].total
        }
        setTotal(parseInt(tot))
      })
    }, []);

    useEffect(() => {
        getCategoriesFromFirebase().then(userDetails => {
          //console.log(userDetails);
          let allCats = "Total For ";
          let tempAll = orders
          for(let i=0;i<userDetails.length;i++){
            let totalTemp = 0;
            let currentCat = userDetails[i].name;
            for(let j=0;j<tempAll.length;j++){
                console.log(tempAll[j].name)
                if(currentCat == tempAll[j].name){
                    totalTemp = totalTemp + tempAll[j].price
                }
            }
            allCats = allCats + currentCat + ": " + totalTemp + " Total For "
          }
          setTotalCat(allCats)
        })
      }, []);

    return (
        <View style={styles.container}>
            <Pressable onPress={goBack} style={styles.backGroup}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
              <Text style={styles.backTxt}>Back</Text>
            </Pressable>

            <Text style={styles.headline}>Number of orders done: {orders.length}</Text>
            <Text style={styles.customerTxt}>Total Money Spent on Orders: {total}</Text>
            
            
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

export default Statistics

  