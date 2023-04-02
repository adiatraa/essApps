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

const Reset = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
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
        <ForgotPasswordProgress status={'change'} />
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
            secureTextEntry={true}
            textContentType="newPassword"
            inputContainerStyle={styles.form}
            containerStyle={{width: 300}}
            placeholder="New Password"
            placeholderTextColor="#666"
            value={password}
            leftIcon={
              <Icon
                name="lock-outline"
                size={18}
                color="#333"
                style={{marginRight: 5}}
              />
            }
            onChangeText={text => setPassword(text)}
          />
          <Input
            secureTextEntry={true}
            inputContainerStyle={styles.form}
            textContentType={'newPassword'}
            containerStyle={{width: 300}}
            placeholder="Confirm New Password"
            placeholderTextColor="#666"
            value={passwordConfirm}
            leftIcon={
              <Icon
                name="lock-outline"
                size={18}
                color="#333"
                style={{marginRight: 5}}
              />
            }
            onChangeText={text => setPasswordConfirm(text)}
          />
        </KeyboardAvoidingView>
        <Button
          title="Simpan"
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
          onPress={() => navigation.navigate('PasswordResetSuccess')}
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
  form: {
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
export default Reset;
