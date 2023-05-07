import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Spinner from '../components/Spinner';
import LoginPage from '../screens/LoginPage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../components/Theme';
import AbsensiScreen from '../screens/absensi/AbsensiScreen';
import HomeScreen from '../screens/home/HomeScreen';
import AbsensiDetailScreen from '../screens/absensi/AbsensiDetailScreen';
import JamTerbuangScreen from '../screens/jamterbuang/JamTerbuangScreen';
import DetailScreen from '../screens/jamterbuang/DetailScreen';
import UserProfileScreen from '../screens/profile/DetailProfileScreen';
import SettingProfile from '../screens/profile/SettingProfile';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ChangePassScreen from '../screens/password_change/ChangePassScreen';
import ConfirmChangePassScreen from '../screens/password_change/ConfirmChangePassScreen';
import SuccessChangePassScreen from '../screens/password_change/SuccessChangePassScreen';
import * as PasswordReset from '../screens/password_reset';

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
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
          route.name === 'HomeStack' || route.name === 'ProfileStack'
            ? {
                borderWidth: 2,
                borderColor: '#CCCCCC',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: 80,
                paddingHorizontal: 30,
                marginHorizontal: -5,
              }
            : {display: 'none'},
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Tab.Screen name="HomeStack" component={HomeScreen} />
      <Tab.Screen name="AbsensiStack" component={AbsensiScreen} />
      <Tab.Screen name="ProfileStack" component={SettingProfile} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const page = [
    // {name: 'ProfileSetting', component: SettingProfile},
    // {name: 'UserProfile', component: UserProfileScreen},
    // {name: 'EditProfile', component: EditProfileScreen},
    // {name: 'Absensi', component: AbsensiScreen},
    // {name: 'AbsensiDetail', component: AbsensiDetailScreen},
    // {name: 'JamTerbuang', component: JamTerbuangScreen},
    // {name: 'JamTerbuangDetail', component: DetailScreen},
    // {name: 'ChangePassScreen', component: ChangePassScreen},
    // {name: 'ConfirmChangePassScreen', component: ConfirmChangePassScreen},
    // {name: 'SuccessChangePassScreen', component: SuccessChangePassScreen},
    {name: 'Login', component: LoginPage},
    {name: 'PasswordReset', component: PasswordReset.Reset},
    {name: 'PasswordResetSendEmail', component: PasswordReset.SendEmail},
    {name: 'PasswordResetVerify', component: PasswordReset.Verify},
    {name: 'PasswordResetSuccess', component: PasswordReset.Success},
  ];
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      /> */}
      {page.map((page, index) => (
        <Stack.Screen
          key={index}
          name={page.name}
          component={page.component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthStack;
