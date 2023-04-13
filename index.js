<<<<<<< HEAD
//index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/context/AuthContext';
import React from 'react';

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
AppRegistry.registerComponent(appName, () => Root);
=======
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
>>>>>>> 9b0901983b4f82c1ab5248d7601e3e093aeac0e9
