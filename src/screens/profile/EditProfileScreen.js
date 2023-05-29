import React, {useState} from 'react';
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
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {getAge, getDateWDay} from '../../components/Date';

export default function EditProfileScreen({navigation, route}) {
  const {data} = route.params;

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <View style={{width: '50%'}}>
            <ImageBackground
              style={styles.leftContainer}
              resizeMode="contain"
              imageStyle={{
                alignSelf: 'flex-end',
                marginLeft: -60,
                marginTop: 70,
              }}
              source={require('../../assets/ellipse.png')}
            />
          </View>
          <View style={{width: '50%'}}>
            <ImageBackground
              style={styles.righttContainer}
              resizeMode="contain"
              imageStyle={{
                alignSelf: 'flex-end',
                marginLeft: 40,
              }}
              source={require('../../assets/group.png')}
            />
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={require('../../assets/avatar.png')}
              fadeDuration={0}
              style={styles.avatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.nameText}>Leslie Alexander</Text>
              <Text style={styles.titleText}>Back End Developer</Text>
            </View>
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
        <KeyboardAvoidingView behavior="height">
          <View style={styles.formContainer}>
            <Text style={{fontSize: 11}}>Nama Lengkap</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput
                editable={true}
                style={styles.textInput}
                value={data.nama_lengkap}
              />
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Panggilan</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.nama_panggilan}
            />
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Email</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput
              editable={false}
              style={styles.textInput}
              value={data.email}
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
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Simpan</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 100}} />
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 71,
    top: 5,
    width: 66,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FFD60A',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
    width: Dimensions.get('screen').width - 70,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: colors.bgWhite,
    paddingHorizontal: 30,
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
    backgroundColor: '#F5F7FB',
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
  leftContainer: {
    backgroundColor: '#FFD60A',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    height: 120,
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 30,
    position: 'absolute',
    top: 40,
  },
  profileText: {
    height: 90,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },
  righttContainer: {
    backgroundColor: '#FFD60A',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    height: 120,
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
  },
  textInput: {color: '#000000', fontSize: 16, fontWeight: 'bold'},
  titleText: {
    fontSize: 13,
  },
});
