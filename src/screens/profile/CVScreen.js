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
import datacsv from './csv.json';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {colors, fonts} from '../../components/Theme';

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
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={'#FFD60A'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>CV Eksternal</Text>
      </View>
      <View style={styles.container}>
        <View>
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
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={checkPermission}>
          <View flexDirection="row">
            <Icon size={20} name="file-download-outline" color={'#FFD60A'} />
            <Text style={{marginLeft: 10, fontSize: 14}}>Download CV</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FFD60A',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 200,
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  downloadButton: {
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 5,
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  headerTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    textAlign: 'center',
    width: 100,
  },
  pdf: {
    backgroundColor: '#FFFFFF',
    elevation: 10,
    height: Dimensions.get('window').height - 250,
    width: Dimensions.get('window').width - 60,
  },
});
