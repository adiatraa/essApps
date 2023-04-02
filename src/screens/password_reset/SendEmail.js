import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {Input} from '@rneui/base';
import ForgotPasswordProgress from '../../components/ForgotPasswordProgress';
import {Button} from '@rneui/themed';

const SendEmail = ({navigation}) => {
  const [NPP, setNPP] = useState('');
  const [KTP, setKTP] = useState('');
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.white} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Absensi</Text>
      </View>
      <ScrollView style={styles.container}>
        <ForgotPasswordProgress status={'send'} />
        <View style={styles.description}>
          <Text
            style={{
              fontFamily: fonts.poppins,
              color: colors.dark10,
              fontSize: 13,
            }}>
            Kami akan kirim 4 digit kode ke email anda. Masukkan email anda
            untuk proses verivikasi.
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
              <Icon
                name="card-account-details-outline"
                size={18}
                color="#333"
                style={{marginRight: 5}}
              />
            }
            onChangeText={text => setNPP(text)}
          />
          <Input
            inputContainerStyle={styles.emailForm}
            keyboardType={'phone-pad'}
            containerStyle={{width: 300}}
            placeholder="No KTP"
            placeholderTextColor="#666"
            value={KTP}
            leftIcon={
              <Icon
                name="card-account-details-outline"
                size={18}
                color="#333"
                style={{marginRight: 5}}
              />
            }
            onChangeText={text => setKTP(text)}
          />
        </KeyboardAvoidingView>
        <Button
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
          onPress={() => navigation.navigate('PasswordResetVerify')}
        />
      </ScrollView>
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
