import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  Button,
  Dimensions,
  SafeAreaView,
} from 'react-native';

export default function SuccessChangePassScreen({navigation}) {
  const handleGetStarted = () => {
    navigation.replace('ProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFD60A'} />
      <View style={styles.content}>
        <Image source={require('../assets/forget.png')} />
        <Text style={styles.contentText}>Your Password has been set up!</Text>
        <Text style={styles.subText}>
          Selamat password Anda berhasil diganti!
        </Text>
      </View>
      <TouchableOpacity onPress={handleGetStarted}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD60A',
    alignItems: 'center',
    padding: 50,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    color: '#000',
  },
  button: {
    marginTop: 200,
    marginLeft: 10,
    marginRight: 10,
    width: Dimensions.get('screen').width - 70,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  subText: {
    marginTop: 17,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
});
