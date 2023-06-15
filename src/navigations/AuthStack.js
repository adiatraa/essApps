import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginPage from '../screens/LoginPage';
import * as PasswordReset from '../screens/password_reset';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  const page = [
    {name: 'PasswordResetSuccess', component: PasswordReset.Success},
    {name: 'Login', component: LoginPage},
    {name: 'PasswordReset', component: PasswordReset.Reset},
    {name: 'PasswordResetSendEmail', component: PasswordReset.SendEmail},
    {name: 'PasswordResetVerify', component: PasswordReset.Verify},
  ];
  return (
    <Stack.Navigator>
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
