import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminHomeScreen from '../admin/AdminHomeScreen';
import AddCategoryScreen from "../admin/AddCategoryScreen";

const Stack = createNativeStackNavigator();

const AdminScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdminHome" component={AdminHomeScreen}/>
      <Stack.Screen name="AddCategory" component={AddCategoryScreen}/>
    </Stack.Navigator>
  )
}

export default AdminScreen