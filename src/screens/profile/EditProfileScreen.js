import React from 'react';
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{padding: 10, width: '100%'}}>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              {989382983982}
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NIK</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              {317112323131}
            </TextInput>
          </View>
        </View>
        <View style={styles.formContainer}>
          <Text style={{fontSize: 11}}>NPWP</Text>
          <View style={{borderBottomColor: '#BEBEBE', borderBottomWidth: 0.5}}>
            <TextInput style={{fontSize: 16, fontWeight: 'bold'}}>
              {317112323131}
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
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    flex: 1,
    padding: 20,
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
  titleText: {
    fontSize: 13,
  },
});
