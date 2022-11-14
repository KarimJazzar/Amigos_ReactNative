import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const HomeScreen = () => {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const goToSearchCustomers = () => {
    navigation.navigate("CustomerInfo")
  }

  //the way to get image url from firebase product url (in order to render in Image component)
  const [im,setIm] = useState("")
  async function getImageURL(imgURL){
  const storage = getStorage();
  const gsReference = ref(storage, imgURL);
  getDownloadURL(gsReference)
  .then((url) => {
    setIm(url)
    return url
  })
  .catch((error) => {
    // Handle any errors
  });
}
  useEffect(() => {
  getImageURL("gs://storeprojectreactnative.appspot.com/6tFsyz8NoD1uzbhp.jpg")
  }, []);
  console.log(im)

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToSearchCustomers}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Search Customers</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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