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

export default function ConfirmChangePassScreen({navigation, route}) {
  const handleFinish = () => {
    navigation.replace('SuccessChangePassScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Masukkan password baru yang mau Anda gantikan
      </Text>
      <View style={styles.menuContainer}>
        <View style={styles.menuIcon}>
          <Icon name="lock-outline" size={26} color="#373737" />
        </View>
        <View style={styles.menuBar}>
          <TextInput placeholder="New Password" style={{height: 50}} />
        </View>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuIcon}>
          <Icon name="lock-outline" size={26} color="#373737" />
        </View>
        <View style={styles.menuBar}>
          <TextInput placeholder="Confirm New Password" style={{height: 50}} />
        </View>
      </View>
      <TouchableOpacity onPress={handleFinish}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },

  button: {
    width: Dimensions.get('screen').width - 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFD60A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },

  text: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
    lineHeight: 20,
    marginBottom: 20,
  },

  menuIcon: {
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  menuContainer: {
    borderColor: '#373737',
    borderWidth: 1,
    backgroundColor: 'blue',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    paddingHorizontal: 15,
    margin: 10,
    height: 50,
    // justifyContent: 'center',
  },

  menuBar: {
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
    height: 30,
  },

  menuText: {
    color: '#B6B6B6',
    fontWeight: 'bold',
  },
});
