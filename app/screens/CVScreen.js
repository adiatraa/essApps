import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Center,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Pdf from 'react-native-pdf';
import datacsv from '../screens/csv.json';
import ReactNativeBlobUtil from 'react-native-blob-util';

export default function CVScreen({navigation, route}) {
  const cvbase64 = datacsv.data;
  const source = {uri: 'data:application/pdf;base64,' + cvbase64};

  const downloadFile = () => {
    let dirs = ReactNativeBlobUtil.fs.dirs;
    console.log(dirs);
    ReactNativeBlobUtil.config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      fileCache: true,
      appendExt: 'pdf',
      path: dirs.DownloadDir,
      addAndroidDownloads: {
        useDownloadManager: true,
        title: 'Download file PDF',
        description: 'Download file cv.pdf',
        mime: 'application/pdf',
        mediaScannable: true,
        notification: true,
      },
    })
      .fetch(
        'GET',
        'https://www.docdroid.net/file/download/D9TiQGo/cv-pdf.pdf',
        {
          //some headers ..
        },
      )
      .then(res => {
        // ToastAndroid.show('The file saved to ', res.path(), ToastAndroid.LONG);
        ToastAndroid.show(
          'The file saved to ' + res.path(),
          ToastAndroid.SHORT,
        );
        // console.log('The file saved to ', res.path());
      });
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFD60A'} />
      <View
        style={{
          width: '97%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            borderColor: '#000000',
            backgroundColor: '#FFF',
            borderRadius: 15,
            padding: 10,
            paddingHorizontal: 15,
            marginBottom: 20,
          }}>
          <TouchableOpacity onPress={checkPermission}>
            <View flexDirection="row">
              <Icon size={20} name="file-download-outline" color={'#FFD60A'} />
              <Text style={{marginLeft: 10, fontSize: 14}}>Download CV</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View flex={1}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          trustAllCerts={false}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pdf: {
    // marginTop: 10,

    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width - 60,
    height: Dimensions.get('window').height - 250,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFD60A',
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
    // justifyContent: 'center',
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
