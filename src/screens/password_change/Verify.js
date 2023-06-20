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
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {colors, fonts} from '../../components/Theme';
import {AuthContext} from '../../context/AuthContext';
import {Text, useToast} from 'native-base';
import Toast from '../../components/Toast';
import {CustomIcon} from '../../components/CustomIcon';

export default function Verify({navigation}) {
  const {userToken, userInfo} = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState('');
  const toast = useToast();

  const handleSend = async () => {
    if (oldPassword.length < 8) {
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
    } else {
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
            navigation.replace('ConfirmChangePassScreen');
          })
          .catch(err => {
            if (err.response.data.message === 'invalid password') {
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
              toast.show({
                render: () => {
                  return (
                    <Toast
                      message={'Terjadi kesalahan, coba beberapa saat lagi !'}
                      bgColor={colors.danger}
                      color={colors.white}
                      icon={'alert-outline'}
                    />
                  );
                },
                placement: 'top',
              });
            }
          });
      } catch {}
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
      <View style={styles.header}>
        <CustomIcon
          name="left-small"
          size={16}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Change Password</Text>
      </View>
      <View style={styles.container}>
        <Text fontFamily={fonts.poppins} fontSize={14} mt={3} mb={7}>
          Masukkan password lama anda untuk memverifikasi sebelum anda merubah
          password baru
        </Text>
        <View style={styles.menuContainer}>
          <View style={styles.menuIcon}>
            <CustomIcon name="lock" size={20} color="#373737" />
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
        <TouchableOpacity
          disabled={oldPassword.length < 1 ? true : false}
          onPress={handleSend}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Lanjutkan</Text>
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
    paddingTop: 30,
  },
  headerTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    paddingBottom: 1,
  },
  menuBar: {
    height: 30,
    justifyContent: 'center',
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
});
