import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {getAge, getDateWDay} from '../../components/Date';

export default function UserProfileScreen({navigation, route}) {
  const [data, setData] = useState({
    npp: '801236',
    nama_lengkap: 'ARIF,DR.,IR.',
    nama_panggil: 'ARIF',
    tempat_lahir: 'JAKARTA',
    tanggal_lahir: '1996-02-15',
    kode_unit: 823,
    kode_jabatan: 6744,
    kode_eselon: '1',
    kode_jenis_jabatan: 'S',
    kode_status_pegawai: 1,
    kode_status_aktif: 1,
    kode_lokasi_tugas: 'B',
    jenis_kelamin: 'L',
    golongan_darah: 'O',
    agama: '1',
    kode_status_pernikahan: 'TK0',
    kode_pendidikan: 9,
    no_hp: '08111111111',
    no_npwp: '123.456.789.123',
    no_ktp: '3312013425330002',
    email_lain: 'arif@gmail.com',
    mulai_pegawai_tetap: '2015-01-01',
    mulai_masuk_kerja: '2015-02-02',
    poin: 100,
    created_date: '2023-05-01T14:14:19.860Z',
    updated_by: 'ADMIN',
  });

  const convertAgama = kodeAgama => {
    let agama;
    switch (kodeAgama) {
      case '1':
        agama = 'Islam';
        break;
      case '2':
        agama = 'Kristen Protestan';
        break;
      case '3':
        agama = 'Katolik';
        break;
      case '4':
        agama = 'Hindu';
        break;
      case '5':
        agama = 'Buddha';
        break;
      case '6':
        agama = 'Konghucu';
        break;
    }
    return agama;
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
                {data?.nama_lengkap}
              </Text>
              <Text style={{fontSize: 12, fontFamily: fonts.poppins}}>
                {data.npp}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <TouchableOpacity
          style={[styles.editButton, styles.shadowProp]}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}>
          <View style={styles.menuIcon}>
            <Icon name="pencil" size={25} color="#FFD60A" />
          </View>
          <View style={styles.menuBar}>
            <Text style={styles.menuText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.npp}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NIK</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.no_ktp}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPWP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.no_npwp}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Lengkap</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.nama_lengkap}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Panggilan</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.nama_panggil}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Email</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.email_lain}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nomor HP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.no_hp}
            />
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Tempat Lahir</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={data.tempat_lahir}
              />
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Tanggal Lahir</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={getDateWDay(new Date(data.tanggal_lahir))}
              />
            </View>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Umur</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={getAge(data.tanggal_lahir) + ' Tahun'}
              />
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Agama</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={data.agama}
              />
            </View>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Golongan Darah</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={data.golongan_darah}
              />
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Jenis Kelamin</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={data.jenis_kelamin == 'L' ? 'Laki-laki' : 'Perempuan'}
              />
            </View>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Status Pernikahan</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={false}
                style={styles.textInput}
                value={
                  data.kode_status_pernikahan == 'TK0'
                    ? 'Belum Menikah'
                    : 'Sudah Menikah'
                }
              />
            </View>
          </View>
        </View>
        <View style={{marginBottom: 100}} />
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgWhite,
    paddingHorizontal: 30,
  },
  editButton: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 20,
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  formContainer: {
    marginBottom: 20,
    width: '100%',
  },
  formContainerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  formSidebySideContainer: {
    width: '47%',
  },

  header: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  menuBar: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },

  menuIcon: {
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  menuText: {
    color: '#B6B6B6',
    fontWeight: 'bold',
  },
  profileCard: {
    height: 'auto',
    marginTop: 10,
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

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  textInput: {color: '#000000', fontSize: 16, fontWeight: 'bold'},
});
