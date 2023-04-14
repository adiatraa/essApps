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
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditProfileScreen({navigation, route}) {
  return (
    <SafeAreaView style={styles.container}>
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
            source={require('../assets/ellipse.png')}
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
            source={require('../assets/group.png')}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/avatar.png')}
            fadeDuration={0}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.nameText}>Leslie Alexander</Text>
            <Text style={styles.titleText}>Back End Developer</Text>
          </View>
        </View>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{padding: 10, width: '100%'}}>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              989382983982
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NIK</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              317112323131
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPWP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              317112323131
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Lengkap</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              Leslie Alexander
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Panggilan</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              Leslie
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Email</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              lesliealexander@gmail.com
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nomor HP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              081223344556
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Tempat Lahir</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                Surakarta
              </TextInput>
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Tanggal Lahir</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                20 Oktober 1998
              </TextInput>
            </View>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Umur</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                24 Tahun
              </TextInput>
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Agama</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                Islam
              </TextInput>
            </View>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Golongan Darah</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                O
              </TextInput>
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Jenis Kelamin</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                Perempuan
              </TextInput>
            </View>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Status Pernikahan</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
                Belum Menikah
              </TextInput>
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
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',

    marginBottom: 20,
  },
  formContainerHorizontal: {
    width: '100%',
    // marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formSidebySideContainer: {
    width: '47%',
    // marginTop: 20,
  },
  button: {
    width: Dimensions.get('screen').width - 70,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#FFD60A',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    // margin: 10,
    padding: 20,
  },

  avatar: {
    height: 71,
    width: 66,
    top: 5,
  },
  profileContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    left: 30,
    top: 40,
    flexDirection: 'row',
  },

  leftContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFD60A',
    height: 120,
    width: '100%',
    marginBottom: 30,
  },
  righttContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFD60A',
    height: 120,
    width: '100%',
    marginBottom: 30,
  },

  profileIcon: {
    justifyContent: 'center',
    height: 100,
    width: 90,
  },

  imgBackground: {
    resizeMode: 'contain',
  },

  profileText: {
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
    height: 90,
  },

  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 13,
  },

  menuIcon: {
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  menuContainer: {
    backgroundColor: 'blue',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    paddingHorizontal: 15,
    margin: 10,
    height: 50,
    elevation: 15,
    marginTop: 0,
  },

  menuBar: {
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
    height: 30,
  },

  menuText: {
    color: '#B6B6B6',
    fontWeight: 'bold',
  },
});
