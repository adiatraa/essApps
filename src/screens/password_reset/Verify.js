import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {Input} from '@rneui/base';
import ForgotPasswordProgress from '../../components/ForgotPasswordProgress';
import {Button} from '@rneui/themed';

const Verify = ({navigation}) => {
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [placeholder1, setPlaceholder1] = useState('_');
  const [placeholder2, setPlaceholder2] = useState('_');
  const [placeholder3, setPlaceholder3] = useState('_');
  const [placeholder4, setPlaceholder4] = useState('_');
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const [fokus, setFokus] = useState('');
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
        <ForgotPasswordProgress status={'verify'} />
        <View style={styles.description}>
          <Text
            style={{
              fontFamily: fonts.poppins,
              color: colors.dark10,
              fontSize: 13,
            }}>
            Masukkan 4 digit kode yang telah dikirim ke email anda.
          </Text>
        </View>
        <KeyboardAvoidingView behavior="padding" style={{alignItems: 'center'}}>
          <View style={styles.otpBox}>
            <View>
              <Input
                ref={ref1}
                keyboardType="phone-pad"
                maxLength={1}
                inputContainerStyle={styles.otpFormContainer}
                inputStyle={[
                  styles.otpForm,
                  {
                    borderColor: fokus === 1 ? colors.primary : colors.dark40,
                  },
                ]}
                placeholder={placeholder1}
                value={otp1}
                onChangeText={text => {
                  setOtp1(text);
                  text.length === 1 ? ref2.current.focus() : '';
                }}
                onFocus={() => {
                  setPlaceholder1('');
                  setFokus(1);
                }}
              />
            </View>
            <View>
              <Input
                ref={ref2}
                keyboardType="phone-pad"
                maxLength={1}
                inputContainerStyle={styles.otpFormContainer}
                inputStyle={[
                  styles.otpForm,
                  {
                    borderColor: fokus === 2 ? colors.primary : colors.dark40,
                  },
                ]}
                placeholder={placeholder2}
                value={otp2}
                onChangeText={text => {
                  setOtp2(text);
                  text.length === 1 ? ref3.current.focus() : '';
                }}
                onFocus={() => {
                  setPlaceholder2('');
                  setFokus(2);
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && otp2.length === 0) {
                    ref1.current.focus();
                  }
                }}
              />
            </View>
            <View>
              <Input
                ref={ref3}
                keyboardType="phone-pad"
                maxLength={1}
                inputContainerStyle={styles.otpFormContainer}
                inputStyle={[
                  styles.otpForm,
                  {
                    borderColor: fokus === 3 ? colors.primary : colors.dark40,
                  },
                ]}
                placeholder={placeholder3}
                value={otp3}
                onChangeText={text => {
                  setOtp3(text);
                  text.length === 1 ? ref4.current.focus() : '';
                }}
                onFocus={() => {
                  setPlaceholder3('');
                  setFokus(3);
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && otp3.length === 0) {
                    ref2.current.focus();
                  }
                }}
              />
            </View>
            <View>
              <Input
                ref={ref4}
                keyboardType="phone-pad"
                maxLength={1}
                inputContainerStyle={styles.otpFormContainer}
                inputStyle={[
                  styles.otpForm,
                  {
                    borderColor: fokus === 4 ? colors.primary : colors.dark40,
                  },
                ]}
                placeholder={placeholder4}
                value={otp4}
                onChangeText={text => {
                  setOtp4(text);
                }}
                onFocus={() => {
                  setPlaceholder4('');
                  setFokus(4);
                }}
                onKeyPress={({nativeEvent}) => {
                  if (nativeEvent.key === 'Backspace' && otp4.length === 0) {
                    ref3.current.focus();
                  }
                }}
              />
            </View>
          </View>
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
          onPress={() => navigation.navigate('PasswordReset')}
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
  otpBox: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  otpForm: {
    backgroundColor: colors.white,
    borderColor: colors.dark40,
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  otpFormContainer: {
    borderBottomWidth: 0,
    width: 60,
  },
});

export default Verify;
