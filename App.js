import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import TabNavigationScreens from './navigation/TabNavigationScreens';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();
  
export default function App() {

  return (
    <>
      <NavigationContainer>

        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#494E44' }} }>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigationScreens} /> 
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
