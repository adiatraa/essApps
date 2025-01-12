import {
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {Box, Pressable, VStack, Text, useToast} from 'native-base';
import {Input, Button} from '@rneui/themed';
import {colors, fonts} from '../../components/Theme';
import ForgotPasswordProgress from '../../components/ForgotPasswordProgress';
import {BASE_URL} from '../../../config';
import Toast from '../../components/Toast';
import {CustomIcon} from '../../components/CustomIcon';

const SendEmail = ({navigation}) => {
  const [NPP, setNPP] = useState('');
  const [KTP, setKTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const refKTP = useRef();

  const handleSend = async () => {
    setIsLoading(true);
    if (NPP === '' || KTP === '') {
      toast.show({
        render: () => {
          return (
            <Toast
              message={'Mohon lengkapi NPP dan No. KTP!'}
              bgColor={colors.success}
              color={colors.white}
            />
          );
        },
        placement: 'top',
      });
    } else {
      try {
        axios
          .post(BASE_URL + '/forget-password', {npp: NPP, no_ktp: KTP})
          .then(response => {
            if (response.data.success === true) {
              toast.show({
                render: () => {
                  return (
                    <Toast
                      message={'OTP telah dikirimkan ke email anda!'}
                      bgColor={colors.success}
                      color={colors.white}
                    />
                  );
                },
                placement: 'top',
              });
              const delay = setTimeout(() => {
                navigation.replace('PasswordResetVerify', {
                  npp: NPP,
                  no_ktp: KTP,
                });
              }, 1000);
            } else {
              toast.show({
                render: () => {
                  return (
                    <Toast
                      message={'OTP gagal dikirim, coba lagi!'}
                      bgColor={colors.danger}
                      color={colors.white}
                    />
                  );
                },
                placement: 'top',
              });
              setIsLoading(false);
            }
          })
          .catch(err => {
            if (err.response.data.message === 'npp or no.ktp not found') {
              toast.show({
                render: () => {
                  return (
                    <Toast
                      message={'User tidak ditemukan!'}
                      bgColor={colors.danger}
                      color={colors.white}
                    />
                  );
                },
                placement: 'top',
              });
              setIsLoading(false);
            }
          });
      } catch {}
    }
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Reset Password</Text>
      </View>
      <Box style={styles.container}>
        <ForgotPasswordProgress status={'send'} />
        <View style={styles.description}>
          <Text
            style={{
              fontFamily: fonts.poppins,
              color: colors.dark10,
              fontSize: 13,
            }}>
            Kami akan kirim 4 digit kode ke email anda. Masukkan NPP dan No. KTP
            anda untuk proses verivikasi.
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={{alignItems: 'center'}}>
          <Input
            inputContainerStyle={styles.emailForm}
            keyboardType={'phone-pad'}
            containerStyle={{width: 300}}
            placeholder="NPP"
            placeholderTextColor="#666"
            value={NPP}
            leftIcon={
              <CustomIcon
                name="id-card-clip"
                size={18}
                color="#333"
                style={{marginRight: 5}}
              />
            }
            onChangeText={text => setNPP(text)}
            onSubmitEditing={() => refKTP.current.focus()}
          />
          <Input
            ref={refKTP}
            inputContainerStyle={styles.emailForm}
            keyboardType={'phone-pad'}
            containerStyle={{width: 300}}
            placeholder="No KTP"
            placeholderTextColor="#666"
            value={KTP}
            leftIcon={
              <CustomIcon
                name="address-card"
                size={18}
                color="#333"
                style={{marginRight: 5}}
              />
            }
            onChangeText={text => setKTP(text)}
            onSubmitEditing={handleSend}
          />
        </KeyboardAvoidingView>
        <Button
          loading={isLoading}
          title="Kirim Kode"
          titleStyle={{
            fontFamily: fonts.poppins_b,
            fontSize: 18,
            marginBottom: -5,
            color: '#333',
          }}
          loadingStyle={{marginHorizontal: 15}}
          buttonStyle={{
            paddingVertical: 10,
            backgroundColor: '#FFD60A',
            borderRadius: 10,
          }}
          containerStyle={{width: 280, left: '50%', marginLeft: -140}}
          onPress={handleSend}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    paddingHorizontal: 10,
    width: '100%',
  },
  description: {
    marginBottom: 30,
    paddingHorizontal: 48,
  },
  emailForm: {
    borderColor: '#666',
    borderRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  headerTitle: {
    color: colors.dark10,
    fontFamily: fonts.poppins_b,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default SendEmail;
