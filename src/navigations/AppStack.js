import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Spinner from '../components/Spinner';
import LoginPage from '../scenes/LoginPage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Reset from '../scenes/password_reset/Reset';
import SendEmail from '../scenes/password_reset/SendEmail';
import Success from '../scenes/password_reset/Success';
import Verify from '../scenes/password_reset/Verify';
import Test from '../scenes/Test';
import {colors} from '../components/Theme';
import AbsensiScreen from '../screens/absensi/AbsensiScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AbsensiDetailScreen from '../screens/absensi/AbsensiDetailScreen';
import UserProfile from '../screens/profile/UserProfile';
import ClockInScreen from '../screens/absensi/ClockInScreen';

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};

const AbsensiStack = createNativeStackNavigator();
const AbsensiStackScreen = () => {
  return (
    <AbsensiStack.Navigator>
      <AbsensiStack.Screen
        name="Absensi"
        component={AbsensiScreen}
        options={{headerShown: false}}
      />
      <AbsensiStack.Screen
        name="AbsensiDetail"
        component={AbsensiDetailScreen}
        options={{headerShown: false}}
      />
      <AbsensiStack.Screen
        name="ClockIn"
        component={ClockInScreen}
        options={{headerShown: false}}
      />
    </AbsensiStack.Navigator>
  );
};

const ProfileStack = createNativeStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={UserProfile}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home-variant';
          } else if (route.name === 'AbsensiStack') {
            iconName = 'clock-outline';
          } else if (route.name === 'Login') {
            iconName = 'login';
          } else if (route.name === 'ProfileStack') {
            iconName = 'account';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={32} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.dark20,
        tabBarStyle:
          route.name === 'AbsensiStack'
            ? {display: 'none'}
            : {
                borderWidth: 2,
                borderColor: '#CCCCCC',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: 80,
                paddingHorizontal: 30,
                marginHorizontal: -5,
              },
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="AbsensiStack" component={AbsensiStackScreen} />
      <Tab.Screen name="ProfileStack" component={ProfileStackScreen} />
      {/* <Tab.Screen name="Login" component={LoginPage} /> */}
    </Tab.Navigator>
  );
};

export default AppStack;
