import {StatusBar, StyleSheet, TouchableHighlight} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import Logo from '../../assets/logo_2.svg';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {BASE_URL} from '../../../config';
import HomeSkeleton from '../../components/HomeSkeleton';
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import Toast from '../../components/Toast';
import {useIsFocused} from '@react-navigation/native';

const Feature = ({icon, title, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      {({isHovered, isPressed}) => {
        return (
          <HStack
            alignItems={'center'}
            justifyContent={'center'}
            w={150}
            py={3}
            borderRadius={10}
            my={2}
            bg={
              isPressed
                ? colors.primary
                : isHovered
                ? colors.primary
                : colors.white
            }>
            <Icon
              name={icon}
              size={20}
              color={
                isPressed
                  ? colors.white
                  : isHovered
                  ? colors.white
                  : colors.primary
              }
              style={styles.featureIcon}
            />
            <Text
              style={[
                styles.featureTitle,
                {
                  color: isPressed
                    ? colors.white
                    : isHovered
                    ? colors.white
                    : colors.dark,
                },
              ]}>
              {title}
            </Text>
          </HStack>
        );
      }}
    </Pressable>
  );
};

const HomeScreen = ({navigation}) => {
  const {userInfo, userToken, logout} = useContext(AuthContext); // Memanggil user info dan user token dari context
  const toast = useToast();
  // const data = userProfile;
  const [data, setData] = useState(null);
  const isFocused = useIsFocused();

  const showToast = () => {
    toast.show({
      render: () => {
        return (
          <Toast
            message={'Fitur masih dalam proses pengembangan!'}
            bgColor={colors.bgPrimary}
          />
        );
      },
      placement: 'top',
    });
  };

  const getDataProfile = async () => {
    axios
      .get(BASE_URL + '/user-profile/' + userInfo.npp, {
        headers: {'x-access-token': userToken},
      }) // Get API dengan parameter NPP dengan keamanan x-access-token token
      .then(response => {
        setData(response.data.data); // Mengisi data dengan data dari response API
      })
      .catch(e => {
        logout();
      });
  };

  useEffect(() => {
    getDataProfile();
  });

  // if (data === null) {
  //   return <HomeSkeleton />; // Apabila status loading true maka akan menampilkan Skeleton
  // }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
      <HStack p={5} bg={colors.bgWhite}>
        <Logo width={60} height={40} />
      </HStack>
      <ScrollView bg={colors.bgWhite} px={5}>
        {data === null ? (
          <Skeleton w="100%" h="130" rounded={'2xl'} />
        ) : (
          <Box>
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
                  {data === null ? '' : data.npp}
                </Text>
              </VStack>
            </ImageBackground>
          </Box>
        )}
        <Box mb={100} px={2}>
          <Box>
            <Text style={styles.subTitle}>Data Karyawan</Text>
            {data === null ? (
              <HStack my={5} justifyContent={'space-between'}>
                <Skeleton size={'24'} rounded={'full'} />
                <Skeleton size={'24'} rounded={'full'} />
                <Skeleton size={'24'} rounded={'full'} />
              </HStack>
            ) : (
              <HStack my={5} justifyContent={'space-between'}>
                <VStack style={styles.dataKaryawanProgress}>
                  <Progress.Circle
                    strokeCap="round"
                    animated={false}
                    size={80}
                    borderWidth={0}
                    color={colors.danger}
                    unfilledColor="rgba(200, 200, 200, 0.2)"
                    thickness={6}
                    progress={3 / 10}
                    fill={'transparent'}
                    showsText={true}
                    formatText={progress => {
                      return progress * 10 + ' Hari';
                    }}
                    textStyle={styles.progressText}
                  />
                  <Text style={styles.dataKaryawanTitle}>Sisa Cuti</Text>
                </VStack>
                <VStack style={styles.dataKaryawanProgress}>
                  <Progress.Circle
                    strokeCap="round"
                    animated={false}
                    size={80}
                    borderWidth={0}
                    color={colors.success}
                    unfilledColor="rgba(200, 200, 200, 0.2)"
                    thickness={6}
                    progress={8 / 10}
                    fill={'transparent'}
                    showsText={true}
                    formatText={progress => {
                      return progress * 10 + ' Jam';
                    }}
                    textStyle={styles.progressText}
                  />
                  <Text style={styles.dataKaryawanTitle}>Jam Lembur</Text>
                </VStack>
                <VStack style={styles.dataKaryawanProgress}>
                  <Progress.Circle
                    strokeCap="round"
                    animated={false}
                    size={80}
                    borderWidth={0}
                    color={colors.blue}
                    unfilledColor="rgba(200, 200, 200, 0.2)"
                    thickness={6}
                    progress={5 / 10}
                    fill={'transparent'}
                    showsText={true}
                    formatText={progress => {
                      return progress * 10 + ' Hari';
                    }}
                    textStyle={styles.progressText}
                  />
                  <Text style={styles.dataKaryawanTitle}>Dinas</Text>
                </VStack>
              </HStack>
            )}
          </Box>
          <VStack>
            <Box>
              <Text style={styles.subTitle}>Monitoring</Text>
              <Box style={styles.divider} />
              {data === null ? (
                <VStack my={3} space={3}>
                  <Skeleton w={'100%'} h={50} rounded={'lg'} />
                  <Skeleton w={'100%'} h={50} rounded={'lg'} />
                  <Skeleton w={'100%'} h={50} rounded={'lg'} />
                </VStack>
              ) : (
                <HStack
                  my={3}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexWrap={'wrap'}>
                  <Feature
                    title={'Absensi'}
                    icon={'calendar-month'}
                    onPress={() => navigation.navigate('AbsensiStack')}
                  />
                  <Feature
                    title={'Jam Terbuang'}
                    icon={'timelapse'}
                    onPress={() => navigation.navigate('JamTerbuang')}
                  />
                  <Feature
                    title={'Kesehatan'}
                    icon={'heart-plus-outline'}
                    onPress={showToast}
                  />
                </HStack>
              )}
            </Box>
            <Box>
              <Text style={styles.subTitle}>Benefit</Text>
              <Box style={styles.divider} />
              {data === null ? (
                <VStack my={3} space={3}>
                  <Skeleton w={'100%'} h={50} rounded={'lg'} />
                  <Skeleton w={'100%'} h={50} rounded={'lg'} />
                  <Skeleton w={'100%'} h={50} rounded={'lg'} />
                </VStack>
              ) : (
                <HStack
                  my={3}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexWrap={'wrap'}>
                  <Feature
                    onPress={showToast}
                    title={'Gaji'}
                    icon={'hand-coin'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Penghasilan Lain'}
                    icon={'hand-coin-outline'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Saldo Depan'}
                    icon={'content-paste'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Saldo SWK'}
                    icon={'inbox'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Bukti Potong 1721'}
                    icon={'credit-card-outline'}
                  />
                </HStack>
              )}
            </Box>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  dataKaryawanProgress: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dataKaryawanTitle: {
    fontFamily: fonts.poppins_m,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  divider: {
    backgroundColor: '#fff',
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    elevation: 5,
    left: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    width: 70,
  },
  featureIcon: {marginLeft: -10, paddingRight: 10},
  featureTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 12,
    fontWeight: 'bold',
  },
  notification: {
    backgroundColor: colors.dark,
    borderRadius: 20,
    padding: 8,
    position: 'relative',
  },
  notificationDot: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 8,
    position: 'absolute',
    right: 10,
    top: 10,
    width: 8,
    zIndex: 10,
  },
  profileCardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  progressText: {fontSize: 12, fontWeight: 'bold'},
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 5,
  },
});
