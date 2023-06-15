import {SafeAreaView, StyleSheet, View, PermissionsAndroid} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
import {BASE_URL} from '../../../config';
import {getDate, getTime} from '../../components/Date';
import {
  Box,
  Center,
  useToast,
  Text,
  StatusBar,
  VStack,
  HStack,
  Button,
  Spinner,
} from 'native-base';
import {AuthContext} from '../../context/AuthContext';
import Toast from '../../components/Toast';
import {CustomIcon} from '../../components/CustomIcon';

const SuccessDialog = () => {
  return (
    <Center
      bg={colors.white}
      px={10}
      py={16}
      mx={5}
      mb={5}
      borderRadius={20}
      borderColor={colors.dark30}
      borderWidth={0.5}>
      <Box
        position={'absolute'}
        top={-30}
        bg={colors.primary}
        p={5}
        borderRadius={10}
        borderColor={colors.dark30}
        borderWidth={0.5}>
        <Icon name="check" color={colors.white} size={36} />
      </Box>
      <Text fontFamily={fonts.poppins_sb} fontSize={20} textAlign={'center'}>
        Clock In Berhasil!
      </Text>
      <Text fontFamily={fonts.poppins} fontSize={12} textAlign={'center'}>
        Semangat & selalu berikan pelayanan terbaik untuk kita semua.
      </Text>
    </Center>
  );
};

const DangerDialog = () => {
  return (
    <Center
      bg={colors.white}
      mx={5}
      px={10}
      py={16}
      borderRadius={20}
      borderColor={colors.dark30}
      borderWidth={0.5}>
      <Box
        position={'absolute'}
        top={-30}
        bg={colors.danger}
        p={5}
        borderRadius={10}
        borderColor={colors.dark30}
        borderWidth={0.5}>
        <Icon name="close" color={colors.white} size={36} />
      </Box>
      <Text fontFamily={fonts.poppins_sb} fontSize={20} textAlign={'center'}>
        Anda Di Luar Jangkauan!
      </Text>
      <Text fontFamily={fonts.poppins_m} fontSize={10} textAlign={'center'}>
        Mohon Maaf Anda Berada Di Luar Jangkauan Wilayah PT. PINDAD, Silahkan
        Memasuki Wilayah yang Telah Ditentukan!
      </Text>
    </Center>
  );
};

const ClockIn = ({navigation, route}) => {
  const toast = useToast();
  const {status} = route.params;
  const {userInfo, userToken} = useContext(AuthContext);
  const [radius, setRadius] = useState('');
  const [submitVisible, setSubmitVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const getDistanceBetweenTwoPoints = (cord1, cord2, unit) => {
    const lat1 = cord1.lat;
    const lon1 = cord1.lng;
    const lat2 = cord2.latitude;
    const lon2 = cord2.longitude;

    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === 'K') {
        dist = dist * 1.609344;
      }
      if (unit === 'N') {
        dist = dist * 0.8684;
      }
      return dist;
    }
  };

  // Meminta perijinan lokasi
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // Mendapatkan lokasi user
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            let location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            axios
              .get(BASE_URL + '/center-location/M', {
                headers: {'x-access-token': userToken},
              })
              .then(response => {
                if (
                  getDistanceBetweenTwoPoints(
                    location,
                    response.data.data.location,
                    'K',
                  ) <= 3
                ) {
                  setRadius(
                    getDistanceBetweenTwoPoints(
                      location,
                      response.data.data.location,
                      'K',
                    ).toFixed(2),
                  );
                  setSubmitVisible(true);
                } else {
                  setSubmitVisible(false);
                  setIsLoading(false);
                  toast.show({
                    render: () => {
                      return <DangerDialog />;
                    },
                    placement: 'bottom',
                  });
                }
              });
          },
          error => {
            // See error code charts below.
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Lokasi gagal didapatkan!'}
                    bgColor={colors.bgPrimary}
                    icon={'map-marker-outline'}
                  />
                );
              },
              placement: 'top',
            });
            setIsLoading(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const handleSend = async () => {
    if (status === 'Kosong') {
      try {
        axios
          .post(
            BASE_URL + '/clock-in',
            {npp: userInfo.npp, kode_unit: userInfo.kode_unit},
            {
              headers: {'x-access-token': userToken},
            },
          )
          .then(response => {
            toast.show({
              render: () => {
                return <SuccessDialog />;
              },
              placement: 'bottom',
            });
            navigation.goBack();
          });
      } catch {}
    } else if (status === 'Isi') {
      try {
        axios
          .put(
            BASE_URL + '/clock-in',
            {npp: userInfo.npp, kode_unit: userInfo.kode_unit},
            {
              headers: {'x-access-token': userToken},
            },
          )
          .then(response => {
            toast.show({
              render: () => {
                return <SuccessDialog />;
              },
              placement: 'bottom',
            });
            navigation.goBack();
          });
      } catch {}
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'auto'} />
      <HStack alignItems={'center'} p={5} bg={colors.bgWhite}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Clock In</Text>
      </HStack>
      <VStack
        w={'100%'}
        h={'100%'}
        px={5}
        pt={3}
        justifyContent={'space-between'}
        bg={colors.bgWhite}>
        <VStack space={5} px={10}>
          <HStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            space={2}>
            <CustomIcon name="calendar1" size={18} color={colors.dark10} />
            <VStack pt={0.5} space={1}>
              <Text style={styles.subTitle}>Tanggal</Text>
              <Text style={styles.text}>{getDate(new Date())}</Text>
            </VStack>
          </HStack>
          <HStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            space={2}>
            <CustomIcon name="clock-nine" size={18} color={colors.dark10} />
            <VStack pt={0.5} space={1}>
              <Text style={styles.subTitle}>Waktu</Text>
              <Text style={styles.textSuccess}>{getTime(new Date())} WIB</Text>
            </VStack>
          </HStack>
          <HStack
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            space={2}
            w={'100%'}>
            <CustomIcon name="location" size={18} color={colors.dark10} />
            <VStack pt={0.5} space={1} w={'100%'}>
              <Text style={styles.subTitle}>Lokasi</Text>
              {radius === '' ? (
                <Button
                  size={'sm'}
                  colorScheme={'white'}
                  isLoading={isLoading}
                  spinner={<Spinner color={colors.secondary} />}
                  leftIcon={
                    <CustomIcon
                      name={'location'}
                      size={20}
                      color={colors.primary}
                    />
                  }
                  bg={colors.white}
                  borderColor={colors.dark30}
                  borderWidth={1}
                  borderRadius={10}
                  onPress={() => {
                    setIsLoading(true);
                    getLocation();
                  }}>
                  <Text fontWeight={'bold'} color={colors.dark20}>
                    Get Location
                  </Text>
                </Button>
              ) : (
                <HStack
                  bg={colors.white}
                  py={5}
                  px={'1/5'}
                  borderWidth={0.5}
                  borderColor={colors.secondary}
                  borderRadius={10}
                  justifyContent={'center'}
                  alignItems={'center'}
                  w={'100%'}>
                  <CustomIcon
                    name="location"
                    color={colors.white}
                    size={20}
                    style={styles.locationIcon}
                  />
                  <View>
                    <Text style={styles.locationDetail}>
                      Anda berada dalam radius {radius} dari CenterPoint.
                    </Text>
                  </View>
                </HStack>
              )}
            </VStack>
          </HStack>
        </VStack>
        <Button
          display={submitVisible === true ? 'flex' : 'none'}
          colorScheme={'dark'}
          mb={'48'}
          mx={3}
          bg={colors.primary}
          borderColor={colors.primary}
          borderWidth={1}
          borderRadius={10}
          isLoading={submitLoading}
          spinner={<Spinner color={colors.dark10} />}
          onPress={() => {
            setSubmitLoading(true);
            handleSend();
          }}>
          <Text fontWeight={'bold'} fontSize={18}>
            Kirim
          </Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default ClockIn;

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    paddingTop: 6,
  },
  locationDetail: {
    flexWrap: 'wrap',
    fontFamily: fonts.poppins,
    fontSize: 12,
  },
  locationIcon: {
    backgroundColor: colors.secondary,
    borderRadius: 30,
    marginLeft: -10,
    marginRight: 10,
    padding: 10,
  },
  subTitle: {color: colors.dark10, fontFamily: fonts.poppins_m, fontSize: 18},
  text: {
    fontFamily: fonts.poppins,
    fontSize: 16,
  },
  textSuccess: {
    color: colors.success,
    fontFamily: fonts.poppins,
    fontSize: 16,
  },
});
