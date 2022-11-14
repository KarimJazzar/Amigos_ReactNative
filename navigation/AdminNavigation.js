import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHomeScreen from '../admin/AdminHomeScreen';
import AddCategoryScreen from '../admin/AddCategoryScreen';
import CustomerInformation from '../admin/CustomerInformation'
import CustomerDetails from "../admin/CustomerDetails";
const Stack = createNativeStackNavigator();

const AdminScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen}/>
      <Stack.Screen name="AddCategory" component={AddCategoryScreen}/>
      <Stack.Screen name="CustomerInfo" component={CustomerInformation}/>
      <Stack.Screen name="CustomerDetail" component={CustomerDetails}/>
    </Stack.Navigator>
  )
}

export default AdminScreen