import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ChangePassScreen({navigation, route}) {
  const handleSend = () => {
    navigation.replace('ConfirmChangePassScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Masukkan password lama Anda untuk memverifikasi sebelum Anda merubah
        password baru
      </Text>
      <View style={styles.menuContainer}>
        <View style={styles.menuIcon}>
          <Icon name="lock-outline" size={26} color="#373737" />
        </View>
        <View style={styles.menuBar}>
          <TextInput placeholder="Old Password" style={{height: 50}} />
        </View>
      </View>
      <TouchableOpacity onPress={handleSend}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFD60A',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
    width: Dimensions.get('screen').width - 100,
  },

  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 20,
  },

  menuBar: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },

  menuContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'blue',
    backgroundColor: '#FFF',
    borderColor: '#373737',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
    width: '100%',
    // justifyContent: 'center',
  },
  menuIcon: {
    height: 30,
    justifyContent: 'center',
    width: 30,
  },

  menuText: {
    color: '#B6B6B6',
    fontWeight: 'bold',
  },

  text: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 20,
  },
});
