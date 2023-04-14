import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navigator from './config/route';

export default function App() {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#f6f6f6"
        barStyle="dark-content"
      />
      <Navigator />
    </>
  );
}
