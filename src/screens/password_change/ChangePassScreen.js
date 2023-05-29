import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {AuthContext} from '../../context/AuthContext';
import {useToast} from 'native-base';
import Toast from '../../components/Toast';

export default function ChangePassScreen({navigation}) {
  const {userToken, userInfo} = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const toast = useToast();

  const handleSend = async () => {
    try {
      axios
        .post(
          BASE_URL + '/change-password',
          {npp: userInfo.npp, password: oldPassword},
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          let isValid =
            response.data.message === 'Password is valid' ? true : false;
          if (!isValid) {
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Password salah !'}
                    bgColor={colors.danger}
                    color={colors.white}
                    icon={'alert-outline'}
                  />
                );
              },
              placement: 'top',
            });
          } else {
            navigation.replace('ConfirmChangePassScreen');
          }
        });
    } catch {}
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>
          Masukkan password lama Anda untuk memverifikasi sebelum Anda merubah
          password baru
        </Text>
        <View style={styles.menuContainer}>
          <View style={styles.menuIcon}>
            <Icon name="lock-outline" size={26} color="#373737" />
          </View>
          <View style={styles.menuBar}>
            <TextInput
              secureTextEntry={true}
              placeholder="Old Password"
              value={oldPassword}
              style={{height: 50}}
              onChangeText={text => setOldPassword(text)}
            />
          </View>
        </View>
        <TouchableOpacity onPress={handleSend}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: colors.bgWhite,
    height: '100%',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  headerTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
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
