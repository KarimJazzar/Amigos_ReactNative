import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const AdminHomeScreen = ({navigation}) => {
    const goToPage = (name) => {
        navigation.navigate(name)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text style={styles.headline}>Admin Panel:</Text>
                
                 
                

                <Pressable onPress={() => goToPage('AddCategory')} style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Create Categories</Text>
                </Pressable>

                <Pressable onPress={() => goToPage('EditCategory')} style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Edit Categories</Text>
                </Pressable>

                <Pressable onPress={() => goToPage('AddProduct')} style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Create Product</Text>
                </Pressable>

                <Pressable onPress={() => goToPage('EditProduct')} style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Edit Product</Text>
                </Pressable>

                <Pressable onPress={() => goToPage('OrderInfo')} style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Ongoing Orders</Text>
                </Pressable>

                <Pressable onPress={() => goToPage('CustomerInfo')} style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Customers</Text>
                </Pressable>

                <Pressable style={styles.adminBtn}>
                    <Text style={styles.adminTxt}>Purchase Statistics</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: '#000',
      paddingTop: 35
    },
    scroll: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 15,
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fff',
        marginBottom: 15
    },
    adminBtn: {
        width: '100%',
        backgroundColor: '#095A47',
        borderRadius: 5,
        marginBottom: 15,
    },
    adminTxt: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 15
    }
  });
  

export default AdminHomeScreen;
