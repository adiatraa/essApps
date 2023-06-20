import React, {useState, useContext, useRef} from 'react';
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
import {AuthContext} from '../../context/AuthContext';
import {Text, useToast} from 'native-base';
import Toast from '../../components/Toast';
import {colors, fonts} from '../../components/Theme';
import {CustomIcon} from '../../components/CustomIcon';

export default function Update({navigation}) {
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const {userToken, userInfo} = useContext(AuthContext);
  const confirmRef = useRef();
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
          .post(
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
        <Text fontFamily={fonts.poppins} fontSize={14} my={7}>
          Buat password baru, kemudian konfirmasi password yang telah anda buat
        </Text>
        <View style={styles.menuContainer}>
          <View style={styles.menuIcon}>
            <CustomIcon name="lock" size={20} color="#373737" />
          </View>
          <View style={styles.menuBar}>
            <TextInput
              secureTextEntry={true}
              value={newPassword}
              placeholder="New Password"
              style={{height: 50}}
              onChangeText={text => setNewPassword(text)}
              onSubmitEditing={() => confirmRef.current.focus()}
            />
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuIcon}>
            <CustomIcon name="lock" size={20} color="#373737" />
          </View>
          <View style={styles.menuBar}>
            <TextInput
              ref={confirmRef}
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
            <Text style={styles.buttonText}>Simpan</Text>
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
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 50,
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
