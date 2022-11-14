import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState , Component } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View , Image, Pressable, Button, LogBox} from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns'
import {getStorage, ref, uploadBytes} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import urid from 'urid';
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from 'react-native-gesture-handler';


const EditProductFinal = ({navigation, route}) => {
    const prod = route.params;

    const [Name, setName] = useState(prod.name)
    const [Price, setPrice] = useState(prod.price)
    const [Desc, setDesc] = useState(prod.description)
    const [Image, setImage] = useState(prod.url)
    const [Cat, setCat] = useState(prod.category)
    const [Qty, setQty] = useState(prod.quantity)
    const [Disc, setDisc] = useState(prod.discount)
    const [DiscStart, setDiscStart] = useState('DD-MM-YYYY')
    const [DiscEnd, setDiscEnd ] = useState('DD-MM-YYYY')
    const [discStartButton, setDiscStartButton ] = useState('Set Discount Start')
    const [discEndButton, setDiscEndButton ] = useState('Set Discount End')
    const [UpdationDate, setUpdationDate ] = useState()
    const [catData, setCatData] = useState([]);

    

    const goBack = () => {
      navigation.goBack()
    }

    const validation = () =>{
      //addToDb();

        if(Name==''){
            Alert.alert("Enter Name")
        }
        else if(Desc==''){
            Alert.alert("Enter Description")

        }
        else if(Image==''){
            Alert.alert("Choose Image")

        }
        else if(Cat==''){
            Alert.alert("Select Category")

        }
        else if(Qty==''){
            Alert.alert("Enter Qty")

        }
        else if(Disc!=''){
            if(DiscStart==''){
                Alert.alert("Select Discount Start Date")
            } else if(DiscEnd==''){
                Alert.alert("Select Discount End Date")
            }else{
              editToDb()
            }
        }
        else{
            editToDb()
        }

       
    }

    const getCategoriesFromFirebase = async () => {
        const querySnapshot = await getDocs(collection(db, "category"));
        let arr = []
        let i = 0;
        querySnapshot.forEach((doc) => {
        //   setFirebaseData((prevData) => [...prevData, doc.data()]);
        arr.push({name: doc.data().name})
        //console.log(doc.data().catName)
        });
        //setCatData(arr)
        return arr;
      };

      useEffect(() => {
        getCategoriesFromFirebase().then(userDetails => {
          console.log(userDetails);
          setCatData(userDetails)
        })
      }, []);


      async function editToDb() {
        const userLoggedInID = auth.currentUser?.uid
  
        await setDoc(doc(collection(db, "product"), prod.id), {
            name: Name,
            price: Price,
            description: Desc,
            url: prod.url,
            category: Cat,
            quantity: Qty,
            discount: Disc,
            discount_start: DiscStart,
            discount_end: DiscEnd,
            userID:userLoggedInID
        });
        Alert.alert("Product Modified Successfully")
        navigation.pop();
        navigation.pop();
        navigation.navigate("EditProduct")
      }

    const clearInputs = () => {
        setName('')
        setDesc('')
        setCat('')
        setQty('')
        setDisc('')
        setImage('')
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been pickeddd: ", date);
    let datePicked  = format(date, 'dd/MM/yyyy')
    //console.log(datePicked)
    setDiscStart(datePicked)
    setDiscStartButton(datePicked)
    hideDatePicker();
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    console.warn("A date has been picked: ", date);
    let datePicked  = format(date, 'dd/MM/yyyy')
    console.log(datePicked)
    setDiscEnd(datePicked)
    setDiscEndButton(datePicked)
    hideDatePicker2();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const storage = getStorage(); //the storage itself
      let randomIDImage = urid() + ".jpg"
      const refer = ref(storage, randomIDImage); //how the image will be addressed inside the storage
      
      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();
    
      const url = "gs://storeprojectreactnative.appspot.com/"+ randomIDImage;
      console.log(url)
      setImage(url)
      await uploadBytes(refer, bytes); //upload images
      
      
    }
  };

    
    //console.log(prod)

    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={styles.inputContainer}>

          <Pressable onPress={goBack} style={styles.backGroup}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
            <Text style={styles.backTxt}>Back</Text>
          </Pressable>

          <Text style={styles.headline}>Product:</Text>

          
          <TextInput placeholder="Name" defaultValue={Name} onChangeText={text => setName(text)} style={styles.input}/>
          <TextInput placeholder="Price" defaultValue={String(Price)} onChangeText={text => setPrice(parseInt(text))} style={styles.input}/>
          <TextInput placeholder="Description" defaultValue={Desc} onChangeText={text => setDesc(text)} style={styles.input}/>

          <SearchableDropdown
          style={styles.container}
          onTextChange={(text) => console.log(text)}
          onItemSelect={(item) => {
            console.log(item)
            setCat(item.name)
          }}
          containerStyle={{ padding: 5 }}
          
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            color: '#000000', 
            borderColor: '#bbbbbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            color: '#000',
          }}
          itemsContainerStyle={{
            
          }}
          items={catData}
          defaultValue={Cat}
          placeholder="Search for catergory.."
        />

        <TextInput placeholder="Product Quantity" defaultValue={String(Qty)} onChangeText={text => setQty(parseInt(text))} style={styles.input} />
        <TextInput placeholder="Product Discount" defaultValue={String(Disc)} onChangeText={text => setDisc(parseInt(text))} style={styles.input}/>

    
        <TouchableOpacity onPress={validation} style={styles.button}>
              <Text style={styles.buttonText}>Edit Product</Text>
        </TouchableOpacity>
           
        
          </View>
    </KeyboardAvoidingView>
  )
};
  
export default EditProductFinal;

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
    inputContainer: {
      width: '100%',
      marginBottom: 10
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
      marginBottom: 10
    },
    buttonContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
    datePickerStyle: {
        width: 200,
        marginTop: 20,
      },
  })