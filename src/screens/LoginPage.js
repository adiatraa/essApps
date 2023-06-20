import {StyleSheet, StatusBar, Keyboard} from 'react-native';
import React, {useState, useContext, useRef} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../context/AuthContext';
import {colors, fonts} from '../components/Theme';
import {
  VStack,
  KeyboardAvoidingView,
  useToast,
  Text,
  Image,
  Button,
  Input,
  FormControl,
  Pressable,
  Spinner,
  HStack,
} from 'native-base';
import Toast from '../components/Toast';
import {Platform} from 'react-native';
import {CustomIcon} from '../components/CustomIcon';

export default function LoginPage({navigation}) {
  const {login, isLoading} = useContext(AuthContext);
  const refPassword = useRef();
  const toast = useToast();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [NPP, setNPP] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [eyeStatus, setEyeStatus] = useState('eye-closed');
  const [heightForm, setHeightForm] = useState('4/6');
  const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    setHeightForm('4/5');
  });
  const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setHeightForm('4/6');
  });

  //Set password visible or invisible
  const eyeStatusHandler = () => {
    secureText === true ? setEyeStatus('eye') : setEyeStatus('eye-closed');
    setSecureText(!secureText);
  };

  const handleLogin = () => {
    setIsButtonLoading(true);
    if (NPP === '' || password === '') {
      toast.show({
        render: () => {
          return (
            <Toast
              message={'Mohon lengapi data NPP dan password!'}
              bgColor={colors.danger}
              icon={'alert-outline'}
              color={colors.white}
            />
          );
        },
        placement: 'top',
      });
      setIsButtonLoading(false);
    } else {
      login(NPP, password);
      setIsButtonLoading(isLoading);
    }
  };

  //Login animation
  const circleA = {
    0: {
      marginTop: -25,
      marginLeft: -25,
      opacity: 1,
    },
    0.5: {
      marginTop: -25,
      marginLeft: -50,
      opacity: 1,
    },
    0.75: {
      marginTop: -50,
      marginLeft: -25,
      opacity: 1,
    },
    1: {
      marginTop: -50,
      marginLeft: -25,
      opacity: 0,
    },
  };
  const circleB = {
    0: {
      marginTop: -25,
      marginLeft: -25,
      opacity: 1,
    },
    0.5: {
      marginTop: -25,
      marginLeft: 0,
      opacity: 1,
    },
    0.75: {
      marginTop: 0,
      marginLeft: -25,
      opacity: 1,
    },
    1: {
      marginTop: 0,
      marginLeft: -25,
      opacity: 0,
    },
  };
  const logoFadeIn = {
    0: {
      opacity: 0,
    },
    0.5: {
      opacity: 1,
    },
    1: {
      opacity: 1,
    },
  };
  const slideUP = {
    0: {
      bottom: '0%',
    },
    1: {
      bottom: '100%',
    },
  };

  return (
    <VStack
      w={'100%'}
      h={'100%'}
      bg={colors.secondary}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Animatable.View
        animation={slideUP}
        delay={4500}
        duration={2000}
        easing="ease-in-out"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1000,
        }}>
        <VStack w={'100%'} bg={colors.secondary} h={'100%'}>
          <Animatable.View
            style={styles.circleA}
            animation={circleA}
            easing="ease-out"
            duration={3000}
          />
          <Animatable.View
            style={styles.circleB}
            easing="ease-out"
            animation={circleB}
            duration={3000}
          />
          <Animatable.Image
            animation={logoFadeIn}
            delay={1500}
            duration={2000}
            easing="ease-in-out"
            source={require('../assets/ess-logo.webp')}
            alt="logo"
            style={{
              tintColor: colors.dark10,
              width: 68,
              height: 100,
              position: 'absolute',
              left: '50%',
              marginLeft: -33,
              top: '50%',
              marginTop: -50,
            }}
          />
          <Animatable.Text
            animation="fadeIn"
            delay={3500}
            duration={1000}
            easing="ease-in-out"
            style={{
              fontSize: 18,
              color: colors.dark10,
              marginBottom: 60,
              top: '50%',
              marginTop: 60,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            EMPLOYEE SELF SERVICE {'\n'}PT. PINDAD
          </Animatable.Text>
        </VStack>
      </Animatable.View>
      <StatusBar backgroundColor={colors.secondary} />
      <VStack alignItems={'center'}>
        <Image
          source={require('../assets/ess-logo.webp')}
          alt="logo"
          tintColor={colors.dark}
          w={51}
          h={75}
          mb={5}
        />
        <Text
          fontFamily={fonts.poppins_b}
          fontSize={16}
          textAlign={'center'}
          fontWeight={'bold'}>
          EMPLOYEE SELF SERVICE {'\n'}PT. PINDAD
        </Text>
      </VStack>
      <VStack
        alignItems={'center'}
        w={'100%'}
        h={heightForm}
        bg={colors.white}
        py={10}
        px={12}
        borderTopLeftRadius={50}
        borderTopRightRadius={50}>
        <Text fontFamily={fonts.poppins_b} fontSize={40} fontWeight={'bold'}>
          LOGIN
        </Text>
        <Text
          fontFamily={fonts.poppins}
          textAlign={'center'}
          fontSize={11}
          mb={10}>
          Selamat datang di Employe Self Service{'\n'}PT. PINDAD
        </Text>
        <KeyboardAvoidingView
          w={'100%'}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <FormControl style={styles.userForm}>
            <Input
              size={'lg'}
              placeholder="NPP"
              placeholderTextColor="#666"
              value={NPP}
              InputLeftElement={
                <CustomIcon
                  name="id-card-clip"
                  size={18}
                  color="#333"
                  style={{marginRight: 5}}
                />
              }
              borderWidth={0}
              _focus={{backgroundColor: colors.white, borderWidth: 0}}
              onChangeText={text => setNPP(text)}
              onSubmitEditing={() => {
                refPassword.current.focus();
              }}
            />
          </FormControl>
          <FormControl style={styles.passwordForm}>
            <Input
              ref={refPassword}
              size={'lg'}
              secureTextEntry={secureText}
              textContentType="password"
              placeholder="Password"
              placeholderTextColor="#666"
              value={password}
              InputRightElement={
                <Icon
                  name={eyeStatus}
                  size={18}
                  color="#333"
                  style={{marginLeft: 5}}
                  onPress={eyeStatusHandler}
                />
              }
              InputLeftElement={
                <CustomIcon
                  name="lock"
                  size={18}
                  color="#333"
                  style={{marginRight: 5}}
                />
              }
              borderWidth={0}
              _focus={{backgroundColor: colors.white, borderWidth: 0}}
              onChangeText={text => setPassword(text)}
              onSubmitEditing={() => {
                handleLogin();
              }}
            />
          </FormControl>
        </KeyboardAvoidingView>
        <HStack w={'100%'} justifyContent={'flex-end'}>
          <Pressable
            onPress={() => navigation.navigate('PasswordResetSendEmail')}>
            <Text
              fontFamily={fonts.poppins}
              fontSize={14}
              textAlign={'right'}
              my={5}>
              Forgot Password?
            </Text>
          </Pressable>
        </HStack>
        <Button
          disabled={isButtonLoading}
          _pressed={{bg: colors.primary}}
          size={'sm'}
          w={'100%'}
          bg={colors.secondary}
          borderRadius={10}
          onPress={handleLogin}>
          {isButtonLoading ? (
            <Spinner py={1} color={colors.white} />
          ) : (
            <Text
              fontFamily={fonts.poppins_sb}
              fontSize={20}
              fontWeight={'semibold'}>
              Log In
            </Text>
          )}
        </Button>
        <HStack alignItems={'center'} mt={16} space={3}>
          <Text fontFamily={fonts.poppins} fontSize={10} mb={-1}>
            Collaboration with
          </Text>
          <Image
            source={require('../assets/logo-uns.webp')}
            alt="logo-uns"
            w={6}
            h={6}
          />
          <Image
            source={require('../assets/logo-sv-dark.webp')}
            alt="logo-uns"
            w={6}
            h={6}
          />
          <Image
            source={require('../assets/logo-ti.webp')}
            alt="logo-uns"
            w={6}
            h={6}
          />
          <Image
            source={require('../assets/logo-pindad.webp')}
            alt="logo-uns"
            w={6}
            h={6}
          />
        </HStack>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  circleA: {
    backgroundColor: colors.dark10,
    borderRadius: 25,
    height: 50,
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    position: 'absolute',
    top: '50%',
    width: 50,
  },
  circleB: {
    backgroundColor: colors.dark10,
    borderRadius: 25,
    height: 50,
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    position: 'absolute',
    top: '50%',
    width: 50,
  },
  passwordForm: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#666',
    borderWidth: 2,
    marginTop: -2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
  },
  userForm: {
    borderColor: '#666',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
  },
});
