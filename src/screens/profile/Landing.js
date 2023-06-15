import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {BASE_URL} from '../../../config';
import {Text, Avatar, Box, HStack, Pressable, VStack} from 'native-base';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from '../../components/Spinner';
import {CustomIcon} from '../../components/CustomIcon';

const Navigation = ({onPress, icon, title}) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => {
        return (
          <HStack
            bg={isPressed ? colors.primary : colors.white}
            px={5}
            py={2}
            alignItems={'center'}
            space={5}
            borderRadius={10}>
            <CustomIcon
              name={icon}
              size={24}
              color={isPressed ? colors.white : colors.secondary}
            />
            <Text
              color={isPressed ? colors.white : colors.dark20}
              fontWeight={'semibold'}
              pb={2}
              mt={2}>
              {title}
            </Text>
            <Box position={'absolute'} right={3}>
              <Icon
                name={'chevron-right'}
                color={isPressed ? colors.white : colors.dark20}
                size={20}
              />
            </Box>
          </HStack>
        );
      }}
    </Pressable>
  );
};

export default function Landing({navigation, route}) {
  const {logout, userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState(null);

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
    if (userInfo != null) {
      getDataProfile();
    }
  }, [userInfo]);

  if (data === null) {
    return <Spinner />; // Apabila status loading true maka akan menampilkan Skeleton
  }

  return (
    <SafeAreaView style={{backgroundColor: colors.bgWhite}}>
      <Box px={5} mt={5}>
        <Box my={5}>
          <ImageBackground
            source={require('../../assets/card.webp')}
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
            icon={'profile-circle'}
            onPress={() => navigation.navigate('UserProfile', {data: data})}
          />
          <Navigation
            title={'Change Passsword'}
            icon={'key'}
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
