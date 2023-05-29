import {StyleSheet, View, ScrollView, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Dialog} from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import Geolocation from 'react-native-geolocation-service';
import {centerPoint} from '../../../config';
import {getDate, getTime} from '../../components/Date';
import {Box, Center, Text, useToast} from 'native-base';

const DangerDialog = () => {
  return (
    <Center
      bg={colors.white}
      mx={1}
      px={10}
      py={16}
      mb={10}
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
        Peringatan!
      </Text>
      <Text fontFamily={fonts.poppins} fontSize={12} textAlign={'center'}>
        Mohon untuk berada dalam radius 1 km PT PINDAD .
      </Text>
    </Center>
  );
};

const ClockOutScreen = ({handleSend, hideSheet}) => {
  const toast = useToast();
  const [radius, setRadius] = useState('');
  const [location, setLocation] = useState('');
  const [danger, setDanger] = useState(false);
  const [height, setHeight] = useState(350);
  const [submitVisible, setSubmitVisible] = useState(false);

  // Cek radius user
  function getDistanceBetweenTwoPoints(cord1, cord2, unit) {
    const lat1 = cord1.lat;
    const lon1 = cord1.lng;
    const lat2 = cord2.lat;
    const lon2 = cord2.lng;

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
  }

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
            if (getDistanceBetweenTwoPoints(location, centerPoint, 'K') <= 3) {
              setHeight(400);
              setRadius(
                getDistanceBetweenTwoPoints(location, centerPoint, 'K').toFixed(
                  2,
                ),
              );
              setSubmitVisible(true);
            } else {
              hideSheet();
              setSubmitVisible(false);
              toast.show({
                render: () => {
                  return <DangerDialog />;
                },
                placement: 'bottom',
              });
            }
          },
          error => {
            // See error code charts below.
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  return (
    <Animatable.View style={{height: height}}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContent}>
          <View style={styles.content}>
            <Text style={styles.subTitle}>Tanggal</Text>
            <Text style={styles.text}>{getDate(new Date())}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.subTitle}>Waktu</Text>
            <Text style={styles.textDanger}>{getTime(new Date())} WIB</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.subTitle}>Lokasi</Text>
            {radius === '' ? (
              <Button
                title={'Get Location'}
                icon={
                  <Icon
                    name="map-marker-outline"
                    size={24}
                    color={colors.primary}
                    style={styles.getLocationButtonIcon}
                  />
                }
                titleStyle={styles.getLocationButtonTitle}
                containerStyle={styles.getLocationButtonContainer}
                buttonStyle={styles.getLocationButton}
                onPress={() => {
                  getLocation();
                }}
              />
            ) : (
              <View style={styles.location}>
                <Icon
                  name="map-marker-outline"
                  color={colors.white}
                  size={32}
                  style={styles.locationIcon}
                />
                <View>
                  <Text style={styles.locationDetail}>
                    {' '}
                    Anda berada dalam radius {radius} dari CenterPoint.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <Button
        title={'Kirim'}
        titleStyle={styles.sendButtonTitle}
        containerStyle={[
          styles.sendButtonContainer,
          {display: submitVisible == false ? 'none' : 'flex'},
        ]}
        buttonStyle={styles.sendButton}
        onPress={handleSend}
      />
      <Dialog isVisible={danger} onBackdropPress={() => setDanger(false)}>
        <View style={styles.alertRadius}>
          <Icon name="alert-circle-outline" color={colors.danger} size={48} />
          <Text>Anda berada di luar jangkauan!</Text>
        </View>
      </Dialog>
    </Animatable.View>
  );
};

export default ClockOutScreen;

const styles = StyleSheet.create({
  content: {marginBottom: 20, paddingHorizontal: 75},
  getLocationButton: {
    backgroundColor: colors.white,
    paddingVertical: 5,
  },
  getLocationButtonContainer: {
    borderRadius: 10,
    elevation: 10,
    shadowColor: colors.dark,
    shadowOffset: {width: 5, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    width: 130,
  },
  getLocationButtonIcon: {
    marginLeft: -5,
    paddingRight: 5,
  },
  getLocationButtonTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 11,
    marginBottom: -5,
  },
  location: {
    alignItems: 'center',
    backgroundColor: colors.dark60,
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  locationDetail: {
    fontFamily: fonts.poppins,
    fontSize: 12,
    marginBottom: -5,
    maxWidth: 150,
  },
  locationIcon: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    marginLeft: -10,
    marginRight: 10,
    padding: 5,
  },
  scrollView: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
  },
  sectionContent: {marginBottom: 100},
  sendButton: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
  },
  sendButtonContainer: {
    borderRadius: 10,
    bottom: 30,
    left: '50%',
    marginLeft: -140,
    position: 'absolute',
    width: 280,
  },
  sendButtonTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 20,
    marginBottom: -5,
  },
  subTitle: {fontFamily: fonts.poppins_m, fontSize: 20},
  text: {
    fontFamily: fonts.poppins,
    fontSize: 16,
  },
  textDanger: {
    color: colors.danger,
    fontFamily: fonts.poppins,
    fontSize: 16,
  },
});
