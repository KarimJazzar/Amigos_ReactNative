import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/core'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, FlatList, Image } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import SafeAreaView from 'react-native-safe-area-view';
import { AntDesign } from '@expo/vector-icons';

const ProductScreen = ({navigation, route}) => {
    const [product, getProduct] = useState(route.params.product);
    const [qty, setQTY] = useState(1);

    const goBack = () => {
        navigation.goBack()
    }

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
              <Text style={[styles.txt, styles.name]}>{product.name}</Text>
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
                      <Pressable style={[styles.controlBtn, {opacity: qty == 1 ? 0.5 : 1}]}>
                        <AntDesign name="minus" size={20} color="#fff" />
                      </Pressable>

                      <Text style={styles.controlTxt}>{qty}</Text>

                      <Pressable style={[styles.controlBtn, {opacity: qty == product.qty ? 0.5 : 1}]}>
                        <AntDesign name="plus" size={20} color="#fff" />
                      </Pressable>
                    </View>
                    
                    <Pressable style={styles.controlCart}>
                      <Text style={[styles.txt, {fontWeight: 'bold', paddingLeft: 0, paddingRight: 2}]}>Add to Cart</Text>
                      <Ionicons name='md-cart' size={24} color='#fff'/>
                    </Pressable>
                  </View>
                </>
              :
               <Text style={styles.noAvailable}>Product no longer available.</Text>
              }

              { product.quantity <= 5 ?
                <Text style={styles.productLeft}>{product.qty} Product Left</Text>
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