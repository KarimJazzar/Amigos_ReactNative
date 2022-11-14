import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHomeScreen from '../admin/AdminHomeScreen';
import AddCategoryScreen from '../admin/AddCategoryScreen';
import CustomerInformation from '../admin/CustomerInformation'
import CustomerDetails from "../admin/CustomerDetails";
import AddProductScreen from "../admin/AddProductScreen";
import EditProduct from "../admin/EditProduct";

const Stack = createNativeStackNavigator();

const AdminScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen}/>
      <Stack.Screen name="AddCategory" component={AddCategoryScreen}/>
      <Stack.Screen name="CustomerInfo" component={CustomerInformation}/>
      <Stack.Screen name="CustomerDetail" component={CustomerDetails}/>
      <Stack.Screen name="AddProduct" component={AddProductScreen}/>
      <Stack.Screen name="EditProduct" component={EditProduct}/>
    </Stack.Navigator>
  )
}

export default AdminScreen