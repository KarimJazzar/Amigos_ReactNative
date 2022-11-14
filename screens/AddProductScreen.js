import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState , Component } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View , Image, Button} from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import SearchableDropdown from 'react-native-searchable-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns'
import {getStorage, ref, uploadBytes} from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import urid from 'urid';

const AddProductScreen = () => {

    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)

    const [Desc, setDesc] = useState('')
    const [Image, setImage] = useState('')

    const [Cat, setCat] = useState('')
    const [Qty, setQty] = useState('')

    const [Disc, setDisc] = useState('')

    const [DiscStart, setDiscStart] = useState('DD-MM-YYYY')

    const [DiscEnd, setDiscEnd ] = useState('DD-MM-YYYY')

    const [discStartButton, setDiscStartButton ] = useState('Set Discount Start')

    const [discEndButton, setDiscEndButton ] = useState('Set Discount End')


    const [UpdationDate, setUpdationDate ] = useState()

    const [catData, setCatData] = useState([]);


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
              addToDb()
            }
        }
        else{
            addToDb()
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


    const addToDb = () => {
      console.log("dio")
        try {
          const docRef = addDoc(collection(db, "product"), {
            name: Name,
            price: Price,
            description: Desc,
            url: Image,
            category: Cat,
            quantity: Qty,
            discount: Disc,
            discount_start: DiscStart,
            discount_end: DiscEnd,
            //creation_date: new Date(),
            //updated_date: new Date(),
          });
   
          Alert.alert("Added Successfully")
        //   clearInputs()
          
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

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

    return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          <View style={styles.inputContainer}>
    
          <TextInput
              placeholder="Name"
              value={Name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />

        <TextInput
              placeholder="Price"
              value={Price}
              onChangeText={text => setPrice(parseInt(text))}
              style={styles.input}
            />
    
            <TextInput
              placeholder="Description"
              value={Desc}
              onChangeText={text => setDesc(text)}
              style={styles.input}
            />

              <TouchableOpacity
              onPress={pickImage}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Select Product Image</Text>
            </TouchableOpacity> 
      
          </View>
          <View style={styles.inputContainer}>

          <SearchableDropdown

          style={styles.container}
        //   onTextChange={(text) => console.log(text)}
          onItemSelect={(item) => {
            console.log(item)
            setCat(item.name)
            //console.log(Cat)
          }}
          containerStyle={{ padding: 5 }}
          value={Cat}
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            color: '#000000', 
            borderColor: '#bbbbbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#000',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={catData}
          //mapping of item array
          //multi={true}
          
          defaultIndex={2}
          placeholder="Search for catergory.."
          // Place holder for the search input
          // Reset textInput Value with true and false state
          // To remove the underline from the android input
        />

<View style={styles.inputContainer}>
    
    <TextInput
        placeholder="Product Quantity"
        value={Qty}
        onChangeText={text => setQty(parseInt(text))}
        style={styles.input}
      />

<TextInput
        placeholder="Product Discount"
        value={Disc}
        onChangeText={text => setDisc(parseInt(text))}
        style={styles.input}
      />



<Button title={discStartButton} onPress={showDatePicker} />
<DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        
      />

<Button title={discEndButton} onPress={showDatePicker2} />
<DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
      />


    </View>

        </View>
    
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={validation}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add Product</Text>
            </TouchableOpacity>
           
          </View>
        </KeyboardAvoidingView>
      )
};
  
export default AddProductScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
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