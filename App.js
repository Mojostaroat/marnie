import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import LoginApp from './screens/LoginApp';
import SignUpApp from './screens/SignUpApp';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="LoginApp" 
          component={LoginApp} 
          options={{ 
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
        <Stack.Screen 
          name="SignUpApp"  
          component={SignUpApp}  
          options={{ 
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
