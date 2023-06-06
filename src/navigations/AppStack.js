import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../components/Theme';
import HomeScreen from '../screens/home/HomeScreen';
import * as Absensi from '../screens/absensi';
import * as JamTerbuang from '../screens/jamterbuang';
import * as Profile from '../screens/profile';
import * as ChangePassword from '../screens/password_change';

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
          route.name === 'HomeStack' ||
          route.name === 'ProfileStack' ||
          route.name === 'AbsensiStack'
            ? {
                borderWidth: 2,
                borderColor: '#CCCCCC',
                height: 70,
                paddingHorizontal: 10,
                marginHorizontal: -5,
              }
            : {display: 'none'},
        tabBarShowLabel: false,
        headerShown: false,
        unmountOnBlur: true,
      })}>
      <Tab.Screen name="HomeStack" component={HomeScreen} />
      <Tab.Screen name="AbsensiStack" component={Absensi.Landing} />
      <Tab.Screen name="ProfileStack" component={Profile.Landing} />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const AppStack = () => {
  const page = [
    {name: 'ProfileSetting', component: Profile.Landing},
    {name: 'UserProfile', component: Profile.Menu},
    {name: 'DetailProfile', component: Profile.DetailProfile},
    {name: 'CVScreen', component: Profile.ExternalCV},
    {name: 'Absensi', component: Absensi.Landing},
    {name: 'AbsensiDetail', component: Absensi.Detail},
    {name: 'ClockIn', component: Absensi.ClockIn},
    {name: 'ClockOut', component: Absensi.ClockOut},
    {name: 'JamTerbuang', component: JamTerbuang.Landing},
    {name: 'JamTerbuangDetail', component: JamTerbuang.Detail},
    {name: 'ChangePassScreen', component: ChangePassword.Verify},
    {name: 'ConfirmChangePassScreen', component: ChangePassword.Update},
    {name: 'SuccessChangePassScreen', component: ChangePassword.Success},
  ];
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      />
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
export default AppStack;
