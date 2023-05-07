import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Text, BottomSheet} from '@rneui/themed';
import ClockInScreen from './ClockInScreen';
import ClockOutScreen from './ClockOutScreen';
import {getDate, getTime} from '../../components/Date';
import HistoryCard from '../../components/HistoryCard';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/AuthContext';
import Toast from '../../components/Toast';
import {useToast} from 'native-base';

const AbsensiScreen = ({navigation}) => {
  const toast = useToast();
  const {userToken, userInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [outVisible, setOutVisible] = useState(false);
  const [height, setHeight] = useState('none');
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);
  // const [data, setData] = useState([
  //   {
  //     tanggal_hadir: '2023-03-04',
  //     npp: '801236',
  //     nama_hari: 'Kamis',
  //     status_hari_kerja: null,
  //     status_shift: null,
  //     t01: '07:23:00',
  //     t02: '16:44:00',
  //     t03: null,
  //     t04: null,
  //     t05: null,
  //     t06: null,
  //     t07: null,
  //     t08: null,
  //     t09: null,
  //     t10: null,
  //     status_absen: null,
  //     status_cuti: null,
  //     status_keluar_komp: null,
  //     status_lembur: null,
  //     kode_unit: 823,
  //     status_absen_khusus: null,
  //   },
  //   {
  //     tanggal_hadir: '2023-03-03',
  //     npp: '801236',
  //     nama_hari: 'Rabu',
  //     status_hari_kerja: null,
  //     status_shift: null,
  //     t01: '07:23:00',
  //     t02: '16:44:00',
  //     t03: null,
  //     t04: null,
  //     t05: null,
  //     t06: null,
  //     t07: null,
  //     t08: null,
  //     t09: null,
  //     t10: null,
  //     status_absen: null,
  //     status_cuti: null,
  //     status_keluar_komp: null,
  //     status_lembur: null,
  //     kode_unit: 823,
  //     status_absen_khusus: null,
  //   },
  //   {
  //     tanggal_hadir: '2023-03-02',
  //     npp: '801236',
  //     nama_hari: 'Selasa',
  //     status_hari_kerja: null,
  //     status_shift: null,
  //     t01: '07:23:00',
  //     t02: '16:44:00',
  //     t03: null,
  //     t04: null,
  //     t05: null,
  //     t06: null,
  //     t07: null,
  //     t08: null,
  //     t09: null,
  //     t10: null,
  //     status_absen: null,
  //     status_cuti: null,
  //     status_keluar_komp: null,
  //     status_lembur: null,
  //     kode_unit: 823,
  //     status_absen_khusus: null,
  //   },
  //   {
  //     tanggal_hadir: '2023-03-01',
  //     npp: '801236',
  //     nama_hari: 'Senin',
  //     status_hari_kerja: null,
  //     status_shift: null,
  //     t01: '07:23:00',
  //     t02: '16:44:00',
  //     t03: null,
  //     t04: null,
  //     t05: null,
  //     t06: null,
  //     t07: null,
  //     t08: null,
  //     t09: null,
  //     t10: null,
  //     status_absen: null,
  //     status_cuti: null,
  //     status_keluar_komp: null,
  //     status_lembur: null,
  //     kode_unit: 823,
  //     status_absen_khusus: null,
  //   },
  // ]);
  const refreshClock = () => {
    setDate(new Date());
  };

  // Get API riwayat absensi
  const getHistoryAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/history-attendance/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setData(response.data.data.history_attendance);
        });
    } catch {}
  };

  // Menangani tombol Clock In
  const handleClockIn = async () => {
    try {
      axios
        .post(
          BASE_URL + '/getAttendance',
          {
            npp: userInfo.npp,
          },
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          if (response.data.message === 'User have not attendance') {
            setVisible(true);
            setStatus('Kosong');
          } else if (response.data.message === 'User already clocked out') {
            setVisible(true);
            setStatus('Isi');
          } else {
            setVisible(false);
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Anda sudah Clock In !'}
                    bgColor={colors.bgDanger}
                    icon={'alert-outline'}
                  />
                );
              },
              placement: 'top',
            });
          }
        });
    } catch (error) {}
  };

  // Menangani tombol Clock Out
  const handleClockOut = async () => {
    try {
      axios
        .post(
          BASE_URL + '/getAttendance',
          {
            npp: userInfo.npp,
          },
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          if (response.data.message === 'User already clocked in') {
            setOutVisible(true);
          } else {
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Anda sudah Clock Out !'}
                    bgColor={colors.bgDanger}
                    icon={'alert-outline'}
                  />
                );
              },
              placement: 'top',
            });
            setOutVisible(false);
          }
        });
    } catch (error) {}
  };

  const afterClockIn = async () => {
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
                return (
                  <Toast
                    message={'Anda berhasil Clock In !'}
                    bgColor={colors.bgSuccess}
                    icon={'check-all'}
                  />
                );
              },
              placement: 'top',
            });
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
                return (
                  <Toast
                    message={'Anda berhasil Clock In !'}
                    bgColor={colors.bgSuccess}
                    icon={'check-all'}
                  />
                );
              },
              placement: 'top',
            });
          });
      } catch {}
    }
    setVisible(false);
  };

  const afterClockOut = async () => {
    try {
      axios
        .put(
          BASE_URL + '/clock-out',
          {npp: userInfo.npp, kode_unit: userInfo.kode_unit},
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          toast.show({
            render: () => {
              return (
                <Toast
                  message={'Anda berhasil Clock Out !'}
                  bgColor={colors.bgSuccess}
                  icon={'check-all'}
                />
              );
            },
            placement: 'top',
          });
        });
    } catch {}
    setOutVisible(false);
  };

  useEffect(() => {
    getHistoryAPI(); // Menjalankan function ketika terdapat perubahan halaman
  }, [visible, outVisible]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
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
              <Text style={styles.mainCardTime}>{getTime(date)}</Text>
              <Text style={styles.mainCardDate}>{getDate(date)}</Text>
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
                  onPress={handleClockIn}
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
                  onPress={handleClockOut}
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
            {data?.map((e, index) => {
              return (
                <HistoryCard
                  key={index}
                  date={e.tanggal_hadir}
                  active={false}
                  clockIn={e.t01}
                  clockOut={e.t02}
                  status={true}
                  onPress={() =>
                    navigation.navigate('AbsensiDetail', {
                      date: e.tanggal_hadir,
                      npp: e.npp,
                      t: [
                        e.t01,
                        e.t02,
                        e.t03,
                        e.t04,
                        e.t05,
                        e.t06,
                        e.t07,
                        e.t08,
                        e.t09,
                        e.t10,
                      ],
                    })
                  }
                />
              );
            })}
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
        <ClockInScreen status={status} handleSend={afterClockIn} />
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
        <ClockOutScreen status={status} handleSend={afterClockOut} />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default AbsensiScreen;

const styles = StyleSheet.create({
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
    backgroundColor: colors.bgWhite,
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
