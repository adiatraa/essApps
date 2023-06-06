import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigations/AppNav';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </NativeBaseProvider>
  );
};

export default App;
