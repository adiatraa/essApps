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
import {CustomIcon} from '../components/CustomIcon';

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconActive;

          if (route.name === 'HomeStack') {
            iconName = 'home';
            iconActive = 'home-fill';
          } else if (route.name === 'AbsensiStack') {
            iconName = 'clock-in';
            iconActive = 'clock';
          } else if (route.name === 'ProfileStack') {
            iconName = 'user';
            iconActive = 'user-fill';
          }

          // You can return any component that you like here!
          return (
            <CustomIcon
              name={color == colors.primary ? iconActive : iconName}
              size={24}
              color={color}
              style={{
                borderBottomColor: colors.secondary,
                paddingBottom: 5,
                marginBottom: -3,
                paddingHorizontal: 3,
                borderBottomWidth: color == colors.primary ? 2 : 0,
              }}
            />
          );
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
