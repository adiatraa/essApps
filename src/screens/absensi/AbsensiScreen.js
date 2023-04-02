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

const AbsensiScreen = ({navigation}) => {
  const {logout, userToken, userInfo, newToken} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [outVisible, setOutVisible] = useState(false);
  const [height, setHeight] = useState('none');
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState();

  const refreshClock = () => {
    setDate(new Date());
  };

  const getHistoryAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/users/api/history-attendance/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setData(response.data);
        });
    } catch {}
  };

  const ok = {
    agama: '1',
    created_date: '2023-03-21T03:45:29.608Z',
    email_lain: 'arif@gmail.com',
    golongan_darah: 'O',
    jenis_kelamin: 'L',
    kode_eselon: '1',
    kode_jabatan: 6744,
    kode_jenis_jabatan: 'S',
    kode_lokasi_tugas: 'B',
    kode_pendidikan: 9,
    kode_status_aktif: 1,
    kode_status_pegawai: 1,
    kode_status_pernikahan: 'TK0',
    kode_unit: 823,
    nama_lengkap: 'ARIF,DR.,IR.',
    nama_panggil: 'ARIF',
    no_hp: '08111111111',
    no_ktp: '3,13101E+15',
    no_npwp: '123.456.789.123',
    npp: '801236',
    tanggal_lahir: '1996-02-15T00:00:00.000Z',
    tempat_lahir: 'JAKARTA',
    transaksi_kehadiran: [
      {
        kode_unit: 823,
        nama_hari: 'Rabu',
        npp: '801236',
        status_absen: null,
        status_absen_khusus: null,
        status_cuti: null,
        status_hari_kerja: null,
        status_keluar_komp: null,
        status_lembur: null,
        status_shift: null,
        t01: '07:23:00',
        t02: '16:44:00',
        t03: null,
        t04: null,
        t05: null,
        t06: null,
        t07: null,
        t08: null,
        t09: null,
        t10: null,
        tanggal_hadir: '2023-03-01',
      },
      {
        kode_unit: 823,
        nama_hari: 'Selasa',
        npp: '801236',
        status_absen: null,
        status_absen_khusus: null,
        status_cuti: null,
        status_hari_kerja: null,
        status_keluar_komp: null,
        status_lembur: null,
        status_shift: null,
        t01: '10:59:43',
        t02: null,
        t03: null,
        t04: null,
        t05: null,
        t06: null,
        t07: null,
        t08: null,
        t09: null,
        t10: null,
        tanggal_hadir: '2023-03-21',
      },
    ],
    updated_by: 'ADMIN',
  };

  useEffect(() => {
    getHistoryAPI();
    // console.log(data);
  }, []);

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
            {data?.transaksi_kehadiran
              .slice(0)
              .reverse()
              .map(e => {
                return (
                  <HistoryCard
                    key={e.tanggal_hadir}
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
