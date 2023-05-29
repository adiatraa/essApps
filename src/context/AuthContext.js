//AuthContext.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(BASE_URL + '/login', {
        npp: username,
        password: password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo.data.user);
        setUserToken(userInfo.data.token);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data.user));
        AsyncStorage.setItem('userToken', userInfo.data.token);
      })
      .catch(error => console.log(error));
    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userToken');
    AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  const newToken = token => {
    setUserToken(token);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (e) {
      console.log('isLogged in error ${e}');
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        newToken,
        userToken,
        userInfo,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
