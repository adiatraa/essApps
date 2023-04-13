import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomePage from '../scenes/HomePage';
import ProfilePage from '../scenes/ProfilePage';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  );
};

export default AppStack;
