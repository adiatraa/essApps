import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import HomeSkeleton from '../../components/HomeSkeleton';
import {BASE_URL} from '../../../config';
import {Text, Avatar, Box, HStack, Pressable, VStack} from 'native-base';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from '../../components/Spinner';

const Navigation = ({onPress, icon, title}) => {
  return (
    <Pressable onPress={onPress}>
      {({isHovered, isPressed}) => {
        return (
          <HStack
            bg={
              isHovered
                ? colors.bgPrimary
                : isPressed
                ? colors.bgPrimary
                : colors.white
            }
            px={4}
            py={2}
            alignItems={'center'}
            space={3}
            borderRadius={10}>
            <Icon name={icon} size={32} color={colors.secondary} />
            <Text color={colors.dark20} fontWeight={'semibold'} pb={2} mt={2}>
              {title}
            </Text>
            <Box position={'absolute'} right={3}>
              <Icon name={'chevron-right'} size={20} />
            </Box>
          </HStack>
        );
      }}
    </Pressable>
  );
};

export default function SettingProfile({navigation, route}) {
  const {logout, userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // Loading status

  const getDataProfile = async () => {
    axios
      .get(BASE_URL + '/user-profile/' + userInfo.npp, {
        headers: {'x-access-token': userToken},
      }) // Get API dengan parameter NPP dengan keamanan x-access-token token
      .then(response => {
        setData(response.data.data); // Mengisi data dengan data dari response API
      })
      .catch(e => {
        logout;
      });
  };

  useEffect(() => {
    getDataProfile();
  });

  if (data === null) {
    return <Spinner />; // Apabila status loading true maka akan menampilkan Skeleton
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.bgWhite}}>
      <Box px={5} mt={5}>
        <Box my={5}>
          <ImageBackground
            source={require('../../assets/backgroundCard.png')}
            resizeMode={'cover'}
            borderRadius={20}
            style={styles.profileCardBody}>
            <Avatar
              size={'lg'}
              bg={colors.primary}
              source={{
                uri: 'https://berita.99.co/wp-content/uploads/2022/06/foto-profil-keren.jpg',
              }}
            />
            <VStack ml={3}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                }}>
                {data.nama_lengkap}
              </Text>
              <Text style={{fontSize: 12, fontFamily: fonts.poppins}}>
                {data.npp}
              </Text>
            </VStack>
          </ImageBackground>
        </Box>
        <VStack space={5}>
          <Navigation
            title={'User Profile'}
            icon={'account-circle-outline'}
            onPress={() => navigation.navigate('UserProfile', {data: data})}
          />
          <Navigation
            title={'Change Passsword'}
            icon={'key-outline'}
            onPress={() => navigation.navigate('ChangePassScreen')}
          />
          <Navigation title={'Logout'} icon={'logout'} onPress={logout} />
        </VStack>
        <StatusBar style="auto" />
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileCardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
});
