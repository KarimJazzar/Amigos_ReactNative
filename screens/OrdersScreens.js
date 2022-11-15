import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { db, auth } from '../firebase'
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

  const Item = ({ title, getCusDetails, order }) => (
    <TouchableOpacity onPress = {() => getCusDetails(order)}>
    <View style={styles.item}>

      <Text style={styles.title}>{title}</Text>
    </View>

    </TouchableOpacity>
  );

const OrdersScreen = ({navigation}) => {
    const userLoggedInID = auth.currentUser?.uid
    const goBack = () => {
      navigation.goBack()
    }

    const pressDetails = (order) => {
        navigation.navigate('OrdersScreenFinal',order);
      }

    const [orders,setOrders] = useState([]);

    const renderItem = ({ item }) => (
        <Item title={item.name} getCusDetails={pressDetails} order={item}/>
      ); 

    useEffect(() => {
      getOrdersFromFirebase().then(userDetails => {
        //console.log(userDetails);
        //setOrders(userDetails)
        const filteredOrders = userDetails.filter(x => x.userID == userLoggedInID);
        console.log(filteredOrders);
        setOrders(filteredOrders)
      })
    }, []);

    return (
        <View style={styles.container}>
          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Orders:</Text>
          
          <FlatList style={styles.list} data={orders}
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

export default OrdersScreen

  