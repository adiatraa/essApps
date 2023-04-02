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

export default function UserProfileScreen({navigation, route}) {
  useEffect(() => {
    console.log(route);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{flexDirection: 'row', marginTop: 0}}>
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

      <TouchableOpacity
        style={[styles.menuContainer, styles.shadowProp]}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{padding: 10, width: '100%'}}>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              989382983982
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NIK</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              317112323131
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPWP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              317112323131
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Lengkap</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              Leslie Alexander
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nama Panggilan</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              Leslie
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Email</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              lesliealexander@gmail.com
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>Nomor HP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput editable={false} style={styles.textInput}>
              081223344556
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainerHorizontal}>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Tempat Lahir</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput editable={false} style={styles.textInput}>
                Surakarta
              </TextInput>
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Tanggal Lahir</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput editable={false} style={styles.textInput}>
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
              <TextInput editable={false} style={styles.textInput}>
                24 Tahun
              </TextInput>
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Agama</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput editable={false} style={styles.textInput}>
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
              <TextInput editable={false} style={styles.textInput}>
                O
              </TextInput>
            </View>
          </View>
          <View style={styles.formSidebySideContainer}>
            <Text style={{fontSize: 11}}>Jenis Kelamin</Text>
            <View
              style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
              <TextInput editable={false} style={styles.textInput}>
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
              <TextInput editable={false} style={styles.textInput}>
                Belum Menikah
              </TextInput>
            </View>
          </View>
        </View>
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
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    // margin: 10,
    padding: 20,
  },
  formContainer: {
    width: '100%',
    // marginTop: 20,
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

  imgBackground: {
    resizeMode: 'contain',
  },
  leftContainer: {
    backgroundColor: '#FFD60A',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    height: 120,
    marginBottom: 5,
    marginTop: 20,
    width: '100%',
  },

  menuBar: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },
  menuContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'blue',
    backgroundColor: '#FFF',
    borderRadius: 19,
    flexDirection: 'row',
    height: 50,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
    width: '100%',
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
  profileIcon: {
    height: 100,
    justifyContent: 'center',
    width: 90,
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
    marginBottom: 5,
    marginTop: 20,
    width: '100%',
  },

  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  textInput: {color: '#000000', fontSize: 16, fontWeight: 'bold'},

  titleText: {
    fontSize: 13,
  },
});
