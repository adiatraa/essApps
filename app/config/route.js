import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import SuccessChangePassScreen from '../screens/SuccessChangePassScreen';
import ChangePassScreen from '../screens/ChangePassScreen';
import ConfirmChangePassScreen from '../screens/ConfirmChangePassScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native';

const Stack = createStackNavigator();

function MainStackNavigator({navigation, route}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={({route}) => ({
            title: 'Setting Profile',
            headerShown: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#f6f6f6',
            },
          })}
        />
        <Stack.Screen
          name="ChangePassScreen"
          component={ChangePassScreen}
          options={({route}) => ({
            title: 'Change Password',
            headerShown: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#f6f6f6',
            },
            headerRight: () => (
              <Ionicons
                name="information-circle-outline"
                size={30}
                color="#373737"
                style={{marginRight: 10}}
              />
            ),
          })}
        />
        <Stack.Screen
          name="ConfirmChangePassScreen"
          component={ConfirmChangePassScreen}
          options={({route}) => ({
            title: 'Confirm Change Password',
            headerShown: true,
            headerTintColor: '#000',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#f6f6f6',
            },
            headerRight: () => (
              <Ionicons
                name="information-circle-outline"
                size={30}
                color="#373737"
                style={{marginRight: 10}}
              />
            ),
          })}
        />
        <Stack.Screen
          name="SuccessChangePassScreen"
          component={SuccessChangePassScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
