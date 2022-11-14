import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, TextInput, Pressable, FlatList, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import SafeAreaView from 'react-native-safe-area-view';
import { db } from '../firebase'
import { collection, getDocs, where, query, startAt, limit } from "firebase/firestore/lite"; 
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

const StoreScreen = ({navigation}) => {
    const [categories, setCatgories] = useState([]);
    const [products, setProducts] = useState([]);
    const [imgageList, setImageList] = useState([]);

    const getAllCategories = async () => {
        try {
            const response = await getDocs(collection(db, "category"));
            let tempDoc = [];
      
            response.forEach((doc) => {
                tempDoc.push(doc.data());
            });
      
            setCatgories(tempDoc);
          } catch(err) { }
    }

    const getAllProducts = async () => {
        try {
            const q = query(collection(db, "product"), limit(10));

            const response = await getDocs(q);
            let tempDoc = [];

            response.forEach((doc) => {
                const data = doc.data();
        
                tempDoc.push({
                    id: doc.id,
                    img: '',
                    category: data.category,
                    description: data.description,
                    discount: data.discount,
                    discount_end: data.discount_end,
                    discount_start: data.discount_start,
                    name: data.name,
                    price: data.price,
                    quantity: data.quantity,
                    url: data.url,
                    userID: data.userID
                });
            });

            //setProducts(tempDoc);
            
            console.log('======')
            console.log(tempDoc);
            console.log('======')
            getImageFromUrl(0, tempDoc)
          } catch(err) { }
    }

    const getImageFromUrl = async (index, list) => {
        let tempIdx = index;
        let tempList = list;
        console.log('============')
        console.log('============')
        console.log('INDEX = ', index, ' URL = ', tempList[tempIdx].url)
        const storage = getStorage();
        const gsReference = ref(storage, tempList[tempIdx].url);
        await getDownloadURL(gsReference).then((url) => {
            console.log(url);
            tempList[tempIdx].img = url;
            tempIdx++;
            if(tempIdx < tempList.length) {
                //tempList.push(url);
                getImageFromUrl(tempIdx, tempList);
            } else {
                //setImageList(tempList);
                setProducts(tempList);
                console.log('=========');
                console.log(products);
            }
        })
        .catch((error) => { console.log(error) });
    }

    useEffect(() => {
        getAllCategories();
        getAllProducts();
    }, []);

    const [catN, setCatN] = useState(-1);
    const [keyWord, setKeyWord] = useState('');
    const [page, setPage] = useState(1);

    const selectCategory = (value) => {
        setCatN(value);
        // TO - DO
        // SEARCH BY CATEGORY
    }

    const searchByKeyword = () => {
        // TO - DO
        // PERFORM SEARCH BY KEYWORD
        console.log(keyWord);
    }

    const nextPage = () => {
        let tempPage = page + 1;
        tempPage = tempPage > 2 ? 2 : tempPage;
    }

    const prevPage = () => {
        let tempPage = page - 1
        tempPage = tempPage < 1 ? 1 : tempPage;
    }

    const openProduct = (index) => {
        // TO - DO
        // PUSH DETAIL PAGE ON NAVIGATION WITH PRODUCT DATA
        navigation.navigate('Product', { product: dummyDate[index] })
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput style={styles.searchInput} onSubmitEditing={searchByKeyword} onChangeText={setKeyWord} value={keyWord} placeholder='Search Items'/>
        <Ionicons style={styles.searchIcon} name="search" size={24} color="grey" />
      </View>

      <View style={styles.scrollHorizontal} showsHorizontalScrollIndicator={false} horizontal={true}>
        
        <FlatList style={{flexDirection: 'row', paddingRight: 25}} nestedScrollEnabled 
        showsHorizontalScrollIndicator={false} 
        numColumns={1} horizontal={true} 
        removeClippedSubviews={false} 
        data={categories} 
        ListHeaderComponent={
          <View style={{ flexDirection: 'row' }}>
            <Pressable onPress={() => selectCategory(-1)} style={[styles.categoryBtn, catN == -1 ? styles.catBtnOn : styles.catBtnOff]}>
              <Text style={styles.categoryTxt}>All</Text>
            </Pressable>
            <Pressable onPress={() => selectCategory(-2)} style={[styles.categoryBtn, catN == -2 ? styles.catBtnOn : styles.catBtnOff]}>
              <Text style={styles.categoryTxt}>Deals</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item, index }) => 
            <Pressable onPress={() => selectCategory(index)} style={[styles.categoryBtn, catN == index ? styles.catBtnOn : styles.catBtnOff]}>
              <Text style={styles.categoryTxt}>{item.name}</Text>
            </Pressable>
          }/>
      </View>
      
        <FlatList style={styles.scroll} nestedScrollEnabled numColumns={2} data={products} renderItem={({ item, index }) => 
          <Pressable style={[styles.card, index % 2 == 0 ? styles.colOne : styles.colTwo ]} onPress={() => openProduct(index)}>
            <View style={styles.cardBG}>
              <View style={styles.cardImgCover}>
                <Image style={styles.cardImg} source={{uri: item.img}}/>
                { item.discount > 0 ? 
                <>
                  <Text style={styles.cardDeal}>{item.discount}% off</Text>
                </>
                :
                <></>
                }
              </View>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.cardName}>{item.name}</Text>
              <View style={styles.flexRow}>
                { item.discount > 0 ? 
                  <>
                    <Text style={[styles.cardPrice, styles.cardPriceLine, {color: '#6B6B6B'}]}>${item.price}</Text>
                    <Text style={[styles.cardPrice, {color: '#6B6B6B'}]}> - </Text>
                    <Text style={styles.cardPrice}>${(item.price * ((100 - item.discount) / 100)).toFixed(2)}</Text>
                  </>
                :
                  <Text style={styles.cardPrice}>${item.price}</Text>
                }
              </View>
            </View>
          </Pressable>
        }
        ListFooterComponent={
          <View style={styles.navGroup}>
            <Pressable onPress={prevPage} style={[styles.navBtn, { opacity : page == 1 ? 0.5 : 1 } ]}>
              <MaterialIcons name="arrow-back-ios" size={24} color="#fff" />
            </Pressable>
            <Text style={styles.navPages}>{page} / {2}</Text>
            <Pressable onPress={nextPage} style={[styles.navBtn, { opacity : page == 2 ? 0.5 : 1 } ]}>
              <MaterialIcons name="arrow-forward-ios" size={24} color="#fff" />
            </Pressable>
          </View>
        }
        />
    </SafeAreaView>
  )
}

export default StoreScreen

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    //backgroundColor: '#494E44',
    backgroundColor: '#000',
    paddingTop: 35
  },
  navGroup: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  navBtn: {
    backgroundColor: '#095A47',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    justifyContent: 'center',
    elevation: 2
  },
  navPages: {
    color: '#fff',
    fontWeight: 'bold'
  },
  navTxt: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  search: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    top: 20,
    opacity: 0.5
  },
  scrollHorizontal: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 15,
    paddingVertical: 10
  },
  categoryBtn: {
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    elevation: 10
  },
  catBtnOn: {
    backgroundColor: '#84B026',
  },
  catBtnOff: {
    backgroundColor: '#095A47'
  },
  categoryTxt: {
    overflow: "visible",
    color: '#fff',
    fontSize: 16,
    height: 25,
  },
  scroll: {
    flexDirection: 'column',
    paddingLeft: 15,
    paddingRight: 15
  },
  card: {
    width: '50%',
    paddingTop: 5,
    paddingBottom: 5,
    height: 'auto'
  },
  colOne: {
    paddingRight: 10
  },
  colTwo: {
    paddingLeft: 10
  },
  cardBG: {
    flex: 1,
    //backgroundColor: '#252728',
    borderRadius: 8,
    //elevation: 2,
    overflow: 'hidden',
  },
  cardImgCover: {
    width: '100%',
    height: (width - 30) * 0.45,
    borderBottomColor: '#fff',
  },
  cardImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 10
  },
  cardDeal: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: 'bold',
    color: '#fff',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  cardPriceLine: {
    textDecorationLine: 'line-through'
  },
  cardName: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%'
  },
  cardPrice: {
    fontSize: 16,
    color: '#84B026'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})