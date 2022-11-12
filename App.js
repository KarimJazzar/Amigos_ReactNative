import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import TabNavigationScreens from './screens/TabNavigationScreens';
import RegisterScreen from './screens/RegisterScreen';
import AddCategoryScreen from './screens/AddCategoryScreen';


const Stack = createNativeStackNavigator();
  
export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TabNavigation" component={TabNavigationScreens} /> 
        <Stack.Screen name="AddCategory" component={AddCategoryScreen} /> 

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
