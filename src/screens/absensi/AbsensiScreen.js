import {
  PermissionsAndroid,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import {ImageBackground} from 'react-native';
import {Button, Image, Text} from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dialog} from '@rneui/themed';
import Geolocation from 'react-native-geolocation-service';

const AbsensiScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(false);

  const arePointsNear = (checkPoint, centerPoint, km) => {
    var ky = 40000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) / 10000 <= km;
  };

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

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            let checkPoint = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            let centerPoint = {
              lat: -7.559030526213746,
              lng: 110.85834367179535,
            };
            console.log(
              'In Radius : ' + arePointsNear(checkPoint, centerPoint, 2),
            );
            setLocation(position);
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
    console.log(location.latitude);
  };

  return (
    <SafeAreaView>
      <Dialog
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
        }}>
        <Dialog.Loading />
      </Dialog>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.navigate('HomeStack')}
        />
        <Text style={styles.headerTitle}>Absensi</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainCard}>
          <ImageBackground
            source={require('../../assets/backgroundCard.png')}
            resizeMode={'stretch'}
            borderRadius={30}
            style={styles.mainCardBackground}>
            <View style={styles.mainCardBody}>
              <Text style={styles.mainCardTime}>08.43</Text>
              <Text style={styles.mainCardDate}>Kamis, 24 Mei 2023</Text>
              <View style={styles.mainCardFeature}>
                <Button
                  title={'Clock In'}
                  titleStyle={styles.mainCardButtonTitle}
                  containerStyle={styles.mainCardButtonContainer}
                  buttonStyle={styles.mainCardButton}
                  icon={
                    <Icon
                      name="calendar-start"
                      size={16}
                      color={colors.dark}
                      style={styles.mainCardButtonIcon}
                    />
                  }
                  onPress={getLocation}
                />
                <Button
                  title={'Clock Out'}
                  titleStyle={styles.mainCardButtonTitle}
                  containerStyle={styles.mainCardButtonContainer}
                  buttonStyle={styles.mainCardButton}
                  icon={
                    <Icon
                      name="calendar-end"
                      size={16}
                      color={colors.dark}
                      style={styles.mainCardButtonIcon}
                    />
                  }
                />
              </View>
              {/* <Text style={styles.mainCardDescription}>Tidak ada presensi</Text> */}
            </View>
          </ImageBackground>
        </View>
        <View>
          <View style={styles.sectionHeader}>
            <Text style={styles.subTitle}>Riwayat</Text>
          </View>
          <View style={styles.sectionContent}>
            <TouchableHighlight
              style={styles.card}
              onPress={() => {
                navigation.navigate('AbsensiDetail');
              }}
              underlayColor={colors.white}>
              <ImageBackground
                source={require('../../assets/backgroundCard2.png')}
                resizeMode={'stretch'}
                borderRadius={30}
                style={styles.cardBackground}>
                <Text style={styles.cardTitle}>Senin, 27 April 2023</Text>
                <View style={styles.cardBody}>
                  <View>
                    <Text style={styles.cardBodyClockTitle}>Clock In</Text>
                    <Text style={styles.cardBodyClockTime}>08.45</Text>
                  </View>
                  <View style={styles.dividerVertical} />
                  <View style={styles.cardBodyClockStatus}>
                    <Text style={styles.cardBodyClockTitle}>Clock Out</Text>
                    <Text style={styles.cardBodyClockTime}>17.45</Text>
                  </View>
                </View>
                <Text style={styles.cardStatusPresensiSuccess}>HADIR</Text>
              </ImageBackground>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.card}
              onPress={() => {
                navigation.navigate('AbsensiDetail');
              }}
              underlayColor={colors.white}>
              <ImageBackground
                source={require('../../assets/backgroundCard2.png')}
                resizeMode={'stretch'}
                borderRadius={30}
                style={styles.cardBackground}>
                <Text style={styles.cardTitle}>Senin, 27 April 2023</Text>
                <View style={styles.cardBody}>
                  <View>
                    <Text style={styles.cardBodyClockTitle}>Clock In</Text>
                    <Text style={styles.cardBodyClockTime}>-</Text>
                  </View>
                  <View style={styles.dividerVertical} />
                  <View style={styles.cardBodyClockStatus}>
                    <Text style={styles.cardBodyClockTitle}>Clock Out</Text>
                    <Text style={styles.cardBodyClockTime}>-</Text>
                  </View>
                </View>
                <Text style={styles.cardStatusPresensiDanger}>TIDAK HADIR</Text>
              </ImageBackground>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.card}
              onPress={() => {
                navigation.navigate('AbsensiDetail');
              }}
              underlayColor={colors.white}>
              <ImageBackground
                source={require('../../assets/backgroundCard2.png')}
                resizeMode={'stretch'}
                borderRadius={30}
                style={styles.cardBackground}>
                <Text style={styles.cardTitle}>Senin, 27 April 2023</Text>
                <View style={styles.cardBody}>
                  <View>
                    <Text style={styles.cardBodyClockTitle}>Clock In</Text>
                    <Text style={styles.cardBodyClockTime}>08.45</Text>
                  </View>
                  <View style={styles.dividerVertical} />
                  <View style={styles.cardBodyClockStatus}>
                    <Text style={styles.cardBodyClockTitle}>Clock Out</Text>
                    <Text style={styles.cardBodyClockTime}>17.45</Text>
                  </View>
                </View>
                <Text style={styles.cardStatusPresensiSuccess}>HADIR</Text>
              </ImageBackground>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.card}
              onPress={() => {
                navigation.navigate('AbsensiDetail');
              }}
              underlayColor={colors.white}>
              <ImageBackground
                source={require('../../assets/backgroundCard2.png')}
                resizeMode={'stretch'}
                borderRadius={30}
                style={styles.cardBackground}>
                <Text style={styles.cardTitle}>Senin, 27 April 2023</Text>
                <View style={styles.cardBody}>
                  <View>
                    <Text style={styles.cardBodyClockTitle}>Clock In</Text>
                    <Text style={styles.cardBodyClockTime}>08.45</Text>
                  </View>
                  <View style={styles.dividerVertical} />
                  <View style={styles.cardBodyClockStatus}>
                    <Text style={styles.cardBodyClockTitle}>Clock Out</Text>
                    <Text style={styles.cardBodyClockTime}>17.45</Text>
                  </View>
                </View>
                <Text style={styles.cardStatusPresensiSuccess}>HADIR</Text>
              </ImageBackground>
            </TouchableHighlight>
          </View>
        </View>
        <View />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AbsensiScreen;

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    marginVertical: -10,
    position: 'relative',
    width: '100%',
  },
  cardBackground: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 15,
    paddingHorizontal: 70,
    paddingVertical: 40,
  },
  cardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  cardBodyClockTime: {
    fontFamily: fonts.poppins,
    fontSize: 10,
  },
  cardBodyClockTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 10,
  },
  cardStatusPresensiDanger: {
    backgroundColor: colors.bgDanger,
    borderRadius: 5,
    color: colors.danger,
    fontFamily: fonts.poppins_sb,
    fontSize: 10,
    paddingBottom: 3,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  cardStatusPresensiSuccess: {
    backgroundColor: colors.bgSuccess,
    borderRadius: 5,
    color: colors.success,
    fontFamily: fonts.poppins_sb,
    fontSize: 10,
    paddingBottom: 3,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  cardTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 14,
    marginBottom: -5,
  },
  dividerVertical: {
    borderRightColor: colors.dark10,
    borderRightWidth: 1,
    height: 40,
    marginHorizontal: 5,
    width: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  mainCard: {
    height: 'auto',
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 30,
    position: 'relative',
    width: '100%',
  },
  mainCardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  mainCardButton: {
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  mainCardButtonContainer: {
    borderRadius: 5,
    elevation: 10,
    marginHorizontal: 5,
    shadowColor: '#333',
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
    width: 100,
  },
  mainCardButtonIcon: {paddingRight: 5},
  mainCardButtonTitle: {
    color: colors.dark10,
    fontFamily: fonts.poppins,
    fontSize: 10,
    marginBottom: -3,
  },
  mainCardDate: {
    fontFamily: fonts.poppins,
    fontSize: 14,
  },
  mainCardDescription: {
    backgroundColor: colors.white,
    borderRadius: 5,
    elevation: 10,
    fontFamily: fonts.poppins_m,
    fontSize: 10,
    marginTop: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    shadowColor: '#333',
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
  },
  mainCardFeature: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  mainCardTime: {
    fontFamily: fonts.poppins_b,
    fontSize: 40,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%',
  },
  sectionContent: {marginBottom: 100},
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 30,
  },
});
