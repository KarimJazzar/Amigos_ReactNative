import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState , Component } from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View , Image} from 'react-native'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { set, collection, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore/lite"; 
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as ImagePicker from "react-native-image-picker"
import DatePicker from 'react-native-datepicker';






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

    const [CreationDate, setCreationDate ] = useState()

    const [UpdationDate, setUpdationDate ] = useState()

    const [catData, setCatData] = useState([]);

    
    chooseImage = () => {
        let options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
    
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            // alert(JSON.stringify(response));s
            console.log('response', JSON.stringify(response));
            // this.setState({
            //   filePath: response,
            //   fileData: response.data,
            //   fileUri: response.uri
            // });
          }
        });
      }


    const validation = () =>{

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

            } else if(DiscEnd!=''){
                Alert.alert("Select Discount End Date")


            }

        }
        else{
            addToDb()
           

        }

       
    }



    const getDataFromFirebase = async () => {
        const querySnapshot = await getDocs(collection(db, "category"));
        let arr = []
        let i = 0;
        querySnapshot.forEach((doc) => {
        //   setFirebaseData((prevData) => [...prevData, doc.data()]);
        arr.push(doc.data().catName)
        console.log(doc.data().catName)
        
          
        });
        setCatData(arr)
        
      };

    useEffect(()=> {
        getDataFromFirebase();

    },[])


    const addToDb = () => {
        try {
          const docRef = addDoc(collection(db, "product"), {
            name: Name,
            price: Price,
            description: Desc,
            Image: Image,
            category: Cat,
            quantity: Qty,
            discount: Disc,
            discount_start: DiscStart,
            discount_end: DiscEnd,
            creation_date: new Date(),
            updated_date: new Date(),
           

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

              <TouchableOpacity onPress={() =>
            ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,
              },
              (response) => {
                console.log(response);
                // this.setState({resourcePath: response});
              },
            )
          }  style={styles.btnSection}  >
                <Text style={styles.input}>Choose File</Text>
              </TouchableOpacity>
      
          </View>
          <View style={styles.inputContainer}>

          <SearchableDropdown

          style={styles.container}
        //   onTextChange={(text) => console.log(text)}
          onItemSelect={(item) => setCat(item)}
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

<DatePicker
          style={styles.datePickerStyle}
          date={DiscStart} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="Discount Start Date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2024"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDiscStart(date);
          }}
        />


<DatePicker
          style={styles.datePickerStyle}
          date={DiscEnd} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="Discount end Date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2024"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDiscEnd(date);
          }}
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