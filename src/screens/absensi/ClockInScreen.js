import {StyleSheet, View, ScrollView, PermissionsAndroid} from 'react-native';
import React, {useState, useContext} from 'react';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Dialog, Text} from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {BASE_URL} from '../../../config';
import Alert from '../../components/Alert';
import {getDate, getTime} from '../../components/Date';

const ClockInScreen = ({status, handleSend}) => {
  const {userToken, userInfo} = useContext(AuthContext);
  const [location, setLocation] = useState('');
  const [danger, setDanger] = useState(false);
  const [success, setSucccess] = useState(false);
  const [height, setHeight] = useState(350);
  const [radius, setRadius] = useState('');
  const [submitVisible, setSubmitVisible] = useState(false);

  // Cek radius user
  const arePointsNear = (checkPoint, centerPoint, km) => {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    let radius = Math.sqrt(dx * dx + dy * dy) / 10000;
    setRadius(radius.toFixed(2)); // Set radius dengan format KM
    return Math.sqrt(dx * dx + dy * dy) / 10000 <= km; // Return true jika radius tidak lebih dari KM yang ditentukan
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
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
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
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            let centerPoint = {
              lat: -7.559030526213746,
              lng: 110.85834367179535,
            };
            let location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            arePointsNear(location, centerPoint, 2) == false
              ? setSubmitVisible(true)
              : setSubmitVisible(false);
            setLocation(location);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  return (
    <Animatable.View style={{height: height}} transition={'height'}>
      <Alert.Danger visible={false} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.sectionContent}>
          <View style={styles.content}>
            <Text style={styles.subTitle}>Tanggal</Text>
            <Text style={styles.text}>{getDate(new Date())}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.subTitle}>Waktu</Text>
            <Text style={styles.textSuccess}>{getTime(new Date())} WIB</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.subTitle}>Lokasi</Text>
            {location === '' ? (
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
                  setHeight(600);
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
    </Animatable.View>
  );
};

export default ClockInScreen;

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
  textSuccess: {
    color: colors.success,
    fontFamily: fonts.poppins,
    fontSize: 16,
  },
});
