import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/core'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, FlatList, Image } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import SafeAreaView from 'react-native-safe-area-view';

const StoreScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
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
    }
})