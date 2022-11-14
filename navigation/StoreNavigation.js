import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

const AdminScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="StoreScreen" component={StoreScreen}/>
      <Stack.Screen name="ProductScreen" component={ProductScreen}/>
    </Stack.Navigator>
  )
}

export default AdminScreen