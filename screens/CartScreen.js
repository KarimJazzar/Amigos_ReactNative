import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from '../firebase';
import { collection, getDocs, where, orderBy, query, startAfter, limit, startAt } from "firebase/firestore/lite"; 

const CartScreen = () => {
  const userLoggedInID = auth.currentUser?.uid
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  
  const getCart = async () => {
    try {
      const q = query(collection(db, "cart"),  where("userID", "==", userLoggedInID));
      const response = await getDocs(q);
      let tempList = [];
      let tempTotal = 0;

      response.forEach((doc) => {
        const tempObj = doc.data();
        if(tempObj.discount > 0) {
          tempTotal += (tempObj.amount * (tempObj.price * ((100 - tempObj.discount) / 100)));
        } else {
          tempTotal += (tempObj.price * tempObj.amount)
        }

        tempList.push({
          id: doc.id,
          userID: tempObj.userID, 
          amount: tempObj.amount,
          productID: tempObj.productID,
          name: tempObj.name,
          price: tempObj.price,
          discount: tempObj.discount,
          quantity: tempObj.quantity
        });
      })
      console.log(tempList)
      setCart(tempList);
      setTotal(tempTotal);
  } catch(err) { console.log(err); }
  }

  useEffect(() => {
    getCart();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Cart:</Text>

      <FlatList style={styles.scroll} data={cart} 
       renderItem={({ item, index }) => 
        <View style={styles.card}>
          <Text style={styles.nameTxt}>{item.name}</Text>
          {item.discount > 0 ?
            <Text style={styles.priceTxt}>${(item.price * ((100 - item.discount) / 100)).toFixed(2)} x {item.amount} = ${(item.amount * (item.price * ((100 - item.discount) / 100))).toFixed(2)}</Text>
          :
            <Text style={styles.priceTxt}>${item.price} x {item.amount} = ${item.amount * item.price}</Text>
          }
        </View>
      }
      ListFooterComponent={
        <View style={styles.result}>
          <Text style={styles.nameTxt}>Total: ${total.toFixed(2)}</Text>
          <Pressable style={styles.placeBtn}>
            <Text style={styles.placeTxt}>Place Order</Text>
          </Pressable>
        </View>
        }/>
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#000',
    paddingTop: 35,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 15
  },
  scroll: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 15
  },
  card: {
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10
  },
  nameTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  priceTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  placeBtn: {
    width: '100%',
    backgroundColor: '#84B026',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20
  },
  placeTxt: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  }
});

export default CartScreen;