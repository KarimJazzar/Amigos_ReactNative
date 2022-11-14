import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import TabNavigationScreens from './navigation/TabNavigationScreens';
import RegisterScreen from './screens/RegisterScreen';
import AddCategoryScreen from './admin/AddCategoryScreen';
import CustomerInformation from './screens/CustomerInformation';
import CustomerDetails from './screens/CustomerDetails';
import AddProductScreen from './screens/AddProductScreen';



const Stack = createNativeStackNavigator();
  
export default function App() {

  return (
    <>
      <NavigationContainer>

        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#494E44' }} }>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigationScreens} /> 
          <Stack.Screen name="AddCategory" component={AddCategoryScreen} /> 
          <Stack.Screen name="AddProduct" component={AddProductScreen} /> 

          <Stack.Screen name="CustomerInformation" component={CustomerInformation} /> 
          <Stack.Screen name="CustomerDetails" component={CustomerDetails} /> 
          
          
        </Stack.Navigator>
        
      </NavigationContainer>
      
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
