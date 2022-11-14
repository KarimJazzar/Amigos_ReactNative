import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, FlatList, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import SafeAreaView from 'react-native-safe-area-view';
import { AntDesign } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import { async } from "@firebase/util";

const ProductScreen = ({navigation, route}) => {
    const userLoggedInID = auth.currentUser?.uid
    const [product, getProduct] = useState(route.params.product);
    const [qty, setQTY] = useState(1);
    const [canAdd, setCanAdd] = useState(true);
    const [inCart, setInCart] = useState(false);
    const [cartID, setCartID] = useState('');

    const goBack = () => {
        navigation.goBack()
    }

    const addItem = () => {
        let newQty = qty + 1;
        newQty = newQty > product.quantity ? product.quantity : newQty;
        setQTY(newQty);
    }

    const removeItem = () => {
        let newQty = qty - 1;
        newQty = newQty < 1 ? 1 : newQty;
        setQTY(newQty);
    }

    const addToCart = async () => {
        if(canAdd) {
            setCanAdd(false);
          
            try {
                let tempObj = {
                    userID: userLoggedInID, 
                    amount: qty,
                    productID: product.id,
                    name: product.name,
                    prince: product.price,
                    discount: product.discount,
                    quantity: product.quantity
                }
    
                await addDoc(collection(db, "cart"), tempObj).then(() => { 
                    console.log('data submitted');
                    checkInCart();
                }).catch((error) => {
                    console.log(error);
                });
            } catch(err) { }

            setCanAdd(true);
        }
    }

    const updateCart = async () => {
        await setDoc(doc(collection(db, "cart"), cartID), {
            userID: userLoggedInID, 
            amount: qty,
            productID: product.id,
            name: product.name,
            prince: product.price,
            discount: product.discount,
            quantity: product.quantity
        });
    }

    const checkInCart = async () => {
        console.log(userLoggedInID, product.id)

        try {
            const q = query(collection(db, "cart"),  where("userID", "==", userLoggedInID), where("productID", "==", product.id));
            const response = await getDocs(q);
            
            response.forEach((doc) => {
                setCartID(doc.id);
                setInCart(true);
            })
        } catch(err) { }
    }

    useEffect(() => {
        checkInCart();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{width:'100%'}}>
              <View style={styles.media}>
                <Image style={styles.image} source={{ uri: product.img }}/>

                <Pressable onPress={goBack} style={styles.backGroup}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.backTxt}>Back</Text>
                </Pressable>

                { product.discount > 0 ? <>
                  <Text style={styles.cardDeal}>{product.discount}% off</Text>
                </> : <></>
                }
              </View>
              <Text style={[styles.txt, styles.name]}>{product.name} {cartID}</Text>
              <View style={styles.priceGroup}>
                {product.discount > 0 ?
                <>
                    <Text style={[styles.txt, styles.priceLabel]}>Price: </Text>
                    <Text style={[styles.txt, styles.priceLabel, {paddingRight: 0, textDecorationLine: 'line-through'}]}>${product.price}</Text>
                    <Text style={[styles.txt, styles.priceLabel, {paddingHorizontal: 5 }]}> - </Text>
                    <Text style={[styles.txt, styles.price]}>${(product.price * ((100 - product.discount) / 100)).toFixed(2)}</Text>
                </>
                :
                <>
                    <Text style={[styles.txt, styles.priceLabel]}>Price: </Text>
                    <Text style={[styles.txt, styles.price]}>${product.price}</Text>
                </>
                }
              </View>

              {product.quantity > 0 ? 
                <>
                  <View style={styles.controlGroup}>
                    <View style={styles.controlRow}>
                      <Pressable onPress={removeItem} style={[styles.controlBtn, {opacity: qty == 1 ? 0.5 : 1}]}>
                        <AntDesign name="minus" size={20} color="#fff" />
                      </Pressable>

                      <Text style={styles.controlTxt}>{qty}</Text>

                      <Pressable onPress={addItem} style={[styles.controlBtn, {opacity: qty == product.quantity ? 0.5 : 1}]}>
                        <AntDesign name="plus" size={20} color="#fff" />
                      </Pressable>
                    </View>
                    { inCart ? 
                        <Pressable onPress={updateCart} style={styles.controlCart}>
                            <Text style={[styles.txt, {fontWeight: 'bold', paddingLeft: 0, paddingRight: 2}]}>Update to Cart</Text>
                            <Ionicons name='md-cart' size={24} color='#fff'/>
                        </Pressable>
                    :
                        <Pressable onPress={addToCart} style={styles.controlCart}>
                            <Text style={[styles.txt, {fontWeight: 'bold', paddingLeft: 0, paddingRight: 2}]}>Add to Cart</Text>
                            <Ionicons name='md-cart' size={24} color='#fff'/>
                        </Pressable>
                    }

                  </View>
                </>
              :
               <Text style={styles.noAvailable}>Product no longer available.</Text>
              }

              { product.quantity <= 5 ?
                <Text style={styles.productLeft}>{product.quantity} Product Left</Text>
                : <></>
              }


              <Text style={[styles.txt, styles.desc]}>
                {product.desc} 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductScreen

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#000',
    paddingTop: 35
  },
  backGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 0,
    backgroundColor: '#000',
    paddingVertical: 10,
    borderBottomRightRadius: 8,
    width: 100
  },
  backTxt: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 5
  },
  closeProduct: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5
  },
  media: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#fff'
  },
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardDeal: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    fontSize: 20,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
    color: '#fff',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  productLeft: {
    color: '#84B026',
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 10
  },
  noAvailable: {
    color: 'red',
    fontWeight: 'bold',
    paddingHorizontal: 15,
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 10
  },
  txt: {
    color: '#fff',
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 10
  },
  priceGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  price: {
    fontSize: 20,
    color: '#84B026',
    fontWeight: 'bold',
    paddingLeft: 0
  },
  priceLabel: {
    fontSize: 20,
    paddingRight: 0
  },
  controlGroup: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  controlBtn: {
    backgroundColor: '#095A47',
    padding: 5,
    borderRadius: 5
  },
  controlTxt: {
    color: '#fff',
    paddingHorizontal: 10
  },
  desc: {
    fontSize: 14,
    lineHeight: 20
  },
  controlCart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#84B026',
    padding: 10,
    borderRadius: 5
  }
})