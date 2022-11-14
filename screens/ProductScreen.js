import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/core'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, FlatList, Image } from 'react-native'
import { auth } from '../firebase'
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import SafeAreaView from 'react-native-safe-area-view';
import { AntDesign } from '@expo/vector-icons';

const ProductScreen = ({route}) => {
    const [product, getProduct] = useState(route.params.product);
    const [qty, setQTY] = useState(1);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{width:'100%'}}>

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
    }
})