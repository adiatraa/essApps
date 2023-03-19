import {
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dialog, Button, Text, BottomSheet} from '@rneui/themed';
import ClockInScreen from './ClockInScreen';
import ClockOutScreen from './ClockOutScreen';

const AbsensiScreen = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [outVisible, setOutVisible] = useState(false);
  const [height, setHeight] = useState('none');

  return (
    <SafeAreaView>
      {/* <Dialog
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
        }}>
        <View style={styles.alertRadius}>
          <Icon name="alert-circle-outline" color={colors.danger} size={48} />
          <Text>Anda berada di luar jangkauan!</Text>
        </View>
      </Dialog> */}
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
                  onPress={() => {
                    setVisible(true);
                  }}
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
                  onPress={() => {
                    setOutVisible(true);
                  }}
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
      <BottomSheet
        isVisible={visible}
        modalProps={{
          animationType: 'slide',
          presentationStyle: 'overFullScreen',
        }}
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.sheetHeader}>
          <Icon
            name="chevron-left"
            size={32}
            color={colors.black}
            onPress={() => setVisible(false)}
          />
          <Text style={styles.sheetHeaderTitle}>Clock In</Text>
        </View>
        <ClockInScreen />
      </BottomSheet>
      <BottomSheet
        isVisible={outVisible}
        modalProps={{
          animationType: 'slide',
          presentationStyle: 'overFullScreen',
        }}
        onBackdropPress={() => setOutVisible(false)}>
        <View style={styles.sheetHeader}>
          <Icon
            name="chevron-left"
            size={32}
            color={colors.black}
            onPress={() => setOutVisible(false)}
          />
          <Text style={styles.sheetHeaderTitle}>Clock Out</Text>
        </View>
        <ClockOutScreen />
      </BottomSheet>
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
  sheetHeader: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 30,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  sheetHeaderTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 24,
    marginBottom: -5,
    marginLeft: 10,
  },
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 30,
  },
});
