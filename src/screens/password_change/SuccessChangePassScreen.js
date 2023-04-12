import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';

export default function SuccessChangePassScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFD60A'} />
      <View style={styles.content}>
        {/* <Image source={require('../assets/forget.png')} /> */}
        <Text style={styles.contentText}>Your Password has been set up!</Text>
        <Text style={styles.subText}>
          Selamat password Anda berhasil diganti!
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.replace('UserProfile')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 200,
    width: Dimensions.get('screen').width - 70,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FFD60A',
    flex: 1,
    padding: 50,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  contentText: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subText: {
    color: '#000',
    fontSize: 20,
    marginTop: 17,
    textAlign: 'center',
  },
});
