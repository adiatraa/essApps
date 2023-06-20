import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import * as Progress from 'react-native-progress';
import {colors, fonts} from '../../components/Theme';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {BASE_URL} from '../../../config';
import {
  Avatar,
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from 'native-base';
import Toast from '../../components/Toast';
import {CustomIcon} from '../../components/CustomIcon';

const Feature = ({icon, title, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      {({isPressed}) => {
        return (
          <HStack
            alignItems={'center'}
            justifyContent={'center'}
            w={160}
            py={3}
            borderRadius={10}
            my={2}
            bg={isPressed ? colors.primary : colors.white}>
            <CustomIcon
              name={icon}
              size={20}
              color={isPressed ? colors.white : colors.secondary}
              style={styles.featureIcon}
            />
            <Text
              style={[
                styles.featureTitle,
                {
                  color: isPressed ? colors.white : colors.dark,
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
  const [data, setData] = useState(null);

  const showToast = () => {
    toast.show({
      render: () => {
        return (
          <Toast
            message={'Fitur masih dalam proses pengembangan!'}
            bgColor={colors.bgPrimary}
            color={colors.white}
          />
        );
      },
      placement: 'top',
    });
  };

  const getDataProfile = async () => {
    try {
      axios
        .get(BASE_URL + '/user-profile?npp=' + userInfo?.npp, {
          headers: {'x-access-token': userToken},
        }) // Get API dengan parameter NPP dengan keamanan x-access-token token
        .then(response => {
          setData(response.data.data); // Mengisi data dengan data dari response API
        })
        .catch(e => {
          logout();
        });
    } catch (error) {}
  };

  useEffect(() => {
    if (userInfo != null) {
      getDataProfile();
    }
  }, [userInfo]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
      <HStack
        p={5}
        bg={colors.bgWhite}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Image
          source={require('../../assets/logo-pindad.webp')}
          alt="logo-pindad"
          w={53}
          h={53}
        />
        <HStack space={2}>
          <VStack justifyContent={'center'} alignItems={'flex-end'}>
            <Text fontFamily={fonts.poppins_b} fontWeight={'bold'} fontSize={8}>
              EMPLOYEE SELF SERVICE
            </Text>
            <Text
              fontFamily={fonts.poppins_b}
              fontWeight={'bold'}
              fontSize={8}
              mt={-1}>
              PT PINDAD
            </Text>
          </VStack>
          <Image
            source={require('../../assets/ess-logo-circle.webp')}
            alt="icon-app"
            h={27}
            w={27}
          />
        </HStack>
      </HStack>
      <ScrollView bg={colors.bgWhite} px={5}>
        {data === null ? (
          <Skeleton w="100%" h="130" rounded={'2xl'} />
        ) : (
          <Pressable
            onPress={() => navigation.navigate('DetailProfile', {data: data})}>
            {({isPressed}) => {
              return (
                <ImageBackground
                  source={require('../../assets/card.webp')}
                  resizeMode={'cover'}
                  borderRadius={20}
                  style={styles.profileCardBody}
                  imageStyle={{opacity: isPressed ? 0.8 : 1}}>
                  <Avatar
                    size={'lg'}
                    bg={colors.primary}
                    source={{
                      uri: data.foto,
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
              );
            }}
          </Pressable>
        )}
        <Box mb={100} mt={3} px={2}>
          <Box>
            {data === null ? (
              <Skeleton w={120} h={8} my={5} rounded={'sm'} />
            ) : (
              <Text style={styles.subTitle}>Data Karyawan</Text>
            )}
            {data === null ? (
              <HStack my={5} justifyContent={'space-between'}>
                <Skeleton size={'24'} rounded={'full'} />
                <Skeleton size={'24'} rounded={'full'} />
                <Skeleton size={'24'} rounded={'full'} />
              </HStack>
            ) : (
              <HStack my={5} justifyContent={'space-between'}>
                <VStack
                  alignItems={'center'}
                  bg={colors.white}
                  w={105}
                  py={5}
                  borderRadius={15}>
                  <Progress.Circle
                    strokeCap="round"
                    animated={false}
                    size={50}
                    borderWidth={0}
                    color={colors.danger}
                    unfilledColor="rgba(200, 200, 200, 0.2)"
                    thickness={4}
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
                <VStack
                  alignItems={'center'}
                  bg={colors.white}
                  w={105}
                  py={5}
                  borderRadius={15}>
                  <Progress.Circle
                    strokeCap="round"
                    animated={false}
                    size={50}
                    borderWidth={0}
                    color={colors.success}
                    unfilledColor="rgba(200, 200, 200, 0.2)"
                    thickness={4}
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
                <VStack
                  alignItems={'center'}
                  bg={colors.white}
                  w={105}
                  py={5}
                  borderRadius={15}>
                  <Progress.Circle
                    strokeCap="round"
                    animated={false}
                    size={50}
                    borderWidth={0}
                    color={colors.blue}
                    unfilledColor="rgba(200, 200, 200, 0.2)"
                    thickness={4}
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
              {data === null ? (
                <Skeleton w={120} h={8} my={5} rounded={'sm'} />
              ) : (
                <>
                  <Text style={styles.subTitle}>Monitoring</Text>
                  <Box style={styles.divider} />
                </>
              )}
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
                    icon={'calendar'}
                    onPress={() => navigation.navigate('AbsensiStack')}
                  />
                  <Feature
                    title={'Jam Terbuang'}
                    icon={'outlline-timelapse'}
                    onPress={() => navigation.navigate('JamTerbuang')}
                  />
                  <Feature
                    title={'Kesehatan'}
                    icon={'heart-plus'}
                    onPress={showToast}
                  />
                </HStack>
              )}
            </Box>
            <Box>
              {data === null ? (
                <Skeleton w={120} h={8} my={5} rounded={'sm'} />
              ) : (
                <>
                  <Text style={styles.subTitle}>Benefit</Text>
                  <Box style={styles.divider} />
                </>
              )}
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
                  <Feature onPress={showToast} title={'Gaji'} icon={'paid'} />
                  <Feature
                    onPress={showToast}
                    title={'Penghasilan Lain'}
                    icon={'toll'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Saldo Depan'}
                    icon={'content_paste'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Saldo SWK'}
                    icon={'inbox'}
                  />
                  <Feature
                    onPress={showToast}
                    title={'Bukti Potong 1721'}
                    icon={'credit_card'}
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
  dataKaryawanTitle: {
    fontFamily: fonts.poppins_m,
    fontSize: 11,
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
    fontSize: 11,
    fontWeight: 'bold',
  },
  profileCardBody: {
    alignItems: 'center',
    backgroundColor: colors.dark,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  progressText: {fontSize: 10, fontWeight: 'bold'},
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 5,
  },
});
