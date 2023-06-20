import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {Image, Text} from 'native-base';
import {fonts} from '../../components/Theme';

export default function Success({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFD60A'} />
      <View style={styles.content}>
        <Image
          source={require('../../assets/successful.webp')}
          alt="success"
          w={40}
          h={40}
        />
        <Text
          fontFamily={fonts.poppins_sb}
          fontWeight={'semibold'}
          fontSize={30}
          textAlign={'center'}
          mt={7}>
          Password Anda Berhasil Diubah!
        </Text>
      </View>
      <TouchableOpacity onPress={() => navigation.replace('ProfileSetting')}>
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
});
