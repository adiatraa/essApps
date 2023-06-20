//index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';

const Root = () => {
  return <App />;
};
AppRegistry.registerComponent(appName, () => Root);
