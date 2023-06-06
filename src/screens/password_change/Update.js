import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import {Text, useToast} from 'native-base';
import Toast from '../../components/Toast';
import {colors} from '../../components/Theme';

export default function Update({navigation}) {
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const {userToken, userInfo} = useContext(AuthContext);
  const toast = useToast();

  const handleSend = async () => {
    if (newPassword.length < 8) {
      toast.show({
        render: () => {
          return (
            <Toast
              message={'Password minimal 8 karakter !'}
              bgColor={colors.danger}
              color={colors.white}
              icon={'alert-outline'}
            />
          );
        },
        placement: 'top',
      });
    } else if (newPassword !== newConfirmPassword) {
      toast.show({
        render: () => {
          return (
            <Toast
              message={'Confirm password tidak sama !'}
              bgColor={colors.danger}
              color={colors.white}
              icon={'alert-outline'}
            />
          );
        },
        placement: 'top',
      });
    } else {
      try {
        axios
          .put(
            BASE_URL + '/update-password',
            {npp: userInfo.npp, new_password: newPassword},
            {
              headers: {'x-access-token': userToken},
            },
          )
          .then(response => {
            navigation.replace('SuccessChangePassScreen');
          });
      } catch {}
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Masukkan password baru yang ingin Anda ganti
      </Text>
      <View style={styles.menuContainer}>
        <View style={styles.menuIcon}>
          <Icon name="lock-outline" size={26} color="#373737" />
        </View>
        <View style={styles.menuBar}>
          <TextInput
            secureTextEntry={true}
            value={newPassword}
            placeholder="New Password"
            style={{height: 50}}
            onChangeText={text => setNewPassword(text)}
          />
        </View>
      </View>
      <View style={styles.menuContainer}>
        <View style={styles.menuIcon}>
          <Icon name="lock-outline" size={26} color="#373737" />
        </View>
        <View style={styles.menuBar}>
          <TextInput
            secureTextEntry={true}
            value={newConfirmPassword}
            placeholder="Confirm New Password"
            style={{height: 50}}
            onChangeText={text => setNewConfirmPassword(text)}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleSend}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
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
    paddingTop: 40,
  },
  menuBar: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },
  menuContainer: {
    alignItems: 'flex-start',
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
  },
  menuIcon: {
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  text: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 20,
  },
});
