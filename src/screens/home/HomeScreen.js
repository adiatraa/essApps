import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import * as Progress from 'react-native-progress';
import {SafeAreaView} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import Logo from '../../assets/logo_2.svg';
import {ImageBackground} from 'react-native';
import {Image, Text} from '@rneui/base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {BASE_URL} from '../../../config';
import HomeSkeleton from '../../components/HomeSkeleton';
import {useToast} from 'native-base';
import Toast from '../../components/Toast';

const Feature = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.feature} onPress={onPress}>
      <Icon
        name={icon}
        size={20}
        color={colors.primary}
        style={styles.featureIcon}
      />
      {/* <AddressCard /> */}
      <Text style={styles.featureTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({navigation}) => {
  const toast = useToast();
  const {userToken, userInfo} = useContext(AuthContext); // Memanggil user info dan user token dari context
  const [status, setStatus] = useState('loading'); // Loading status
  // const [data, setData] = useState({
  //   agama: '1',
  //   created_date: '2023-03-15T21:00:07.652Z',
  //   email_lain: 'arif@gmail.com',
  //   golongan_darah: 'O',
  //   jenis_kelamin: 'L',
  //   kode_eselon: '1',
  //   kode_jabatan: 6744,
  //   kode_jenis_jabatan: 'S',
  //   kode_lokasi_tugas: 'B',
  //   kode_pendidikan: 9,
  //   kode_status_aktif: 1,
  //   kode_status_pegawai: 1,
  //   kode_status_pernikahan: 'TK0',
  //   kode_unit: 823,
  //   nama_lengkap: 'ARIF,DR.,IR.',
  //   nama_panggil: 'ARIF',
  //   no_hp: '08111111111',
  //   no_ktp: '3,13101E+15',
  //   no_npwp: '123.456.789.123',
  //   npp: '801236',
  //   tanggal_lahir: '1996-02-15T00:00:00.000Z',
  //   tempat_lahir: 'JAKARTA',
  //   updated_by: 'ADMIN',
  // });
  const [data, setData] = useState({});
  const fetchMyAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/user-profile/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        }) // Get API dengan parameter NPP dengan keamanan x-access-token token
        .then(response => {
          setData(response.data.data.personil); // Mengisi data dengan data dari response API
        })
        .catch(e => {
          // logout(); // Apabla terdapat error maka akan logout
        });
    } catch {}
  };

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

  useEffect(() => {
    setStatus('loading'); // Status loading true
    fetchMyAPI(); // Get data dari APi
    setStatus('success'); // Status loading false

    // const intervalId = setInterval(() => {
    //   fetchMyAPI;
    // }, 1000 * 5); // in milliseconds
    // return () => clearInterval(intervalId);
  }, [toast]);

  if (status === 'loading') {
    return <HomeSkeleton />; // Apabila status loading true maka akan menampilkan Skeleton
  }

  return (
    <SafeAreaView>
      {/* Styling Status Bar */}
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
      {/* Header */}
      <View style={styles.header}>
        <Logo width={60} height={40} />
        <TouchableHighlight
          underlayColor={colors.white}
          onPress={() => navigation.navigate('Notification')}>
          <View style={styles.notification}>
            <View style={styles.notificationDot} />
            <Icon
              name="bell-outline"
              size={22}
              color={colors.white}
              style={styles.notificationIcon}
            />
          </View>
        </TouchableHighlight>
      </View>
      {/* Scrollview Content */}
      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <ImageBackground
            source={require('../../assets/backgroundCard.png')}
            resizeMode={'cover'}
            borderRadius={20}
            style={styles.profileCardBody}>
            <Image
              source={{
                uri: 'https://berita.99.co/wp-content/uploads/2022/06/foto-profil-keren.jpg',
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 35,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
            <View>
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
            </View>
          </ImageBackground>
        </View>
        <View style={{marginBottom: 100}}>
          <Text style={styles.subTitle}>Data Karyawan</Text>
          <View style={styles.dataKaryawan}>
            <View style={styles.dataKaryawanProgress}>
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
            </View>
            <View style={styles.dataKaryawanProgress}>
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
            </View>
            <View style={styles.dataKaryawanProgress}>
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
            </View>
          </View>
          <Text style={styles.subTitle}>Monitoring</Text>
          <View style={styles.divider} />
          <View style={styles.featureWrapper}>
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
          </View>
          <Text style={styles.subTitle}>Benefit</Text>
          <View style={styles.divider} />
          <View style={styles.featureWrapper}>
            <Feature onPress={showToast} title={'Gaji'} icon={'hand-coin'} />
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
            <Feature onPress={showToast} title={'Saldo SWK'} icon={'inbox'} />
            <Feature
              onPress={showToast}
              title={'Bukti Potong 1721'}
              icon={'credit-card-outline'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  dataKaryawan: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
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
    left: 30,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    width: 70,
  },
  feature: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.dark60,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.dark,
    display: 'flex',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    shadowColor: '#333',
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
    width: 150,
  },
  featureIcon: {marginLeft: -10, paddingRight: 10},
  featureTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 12,
    fontWeight: 'bold',
  },
  featureWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 20,
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
  profileCard: {
    height: 'auto',
    marginTop: 10,
    paddingHorizontal: 30,
    position: 'relative',
    width: '100%',
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
  scrollView: {
    backgroundColor: colors.bgWhite,
    height: '100%',
    width: '100%',
  },
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  toast: {
    backgroundColor: colors.bgPrimary,
  },
});