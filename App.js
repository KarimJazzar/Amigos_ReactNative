import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import TabNavigationScreens from './screens/TabNavigationScreens';
import RegisterScreen from './screens/RegisterScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';
import CustomerInformation from './screens/CustomerInformation';
import CustomerDetails from './screens/CustomerDetails';
import AddProductScreen from './screens/AddProductScreen';



const Stack = createNativeStackNavigator();
  
export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TabNavigation" component={TabNavigationScreens} /> 
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} /> 
<<<<<<< HEAD
        <Stack.Screen name="AddProduct" component={AddProductScreen} /> 

=======
        <Stack.Screen name="CustomerInformation" component={CustomerInformation} /> 
        <Stack.Screen name="CustomerDetails" component={CustomerDetails} /> 
        
        
>>>>>>> 4cf836d5df2453ff966fe58094f5e87f0771c1da
      </Stack.Navigator>
       
    </NavigationContainer>
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
