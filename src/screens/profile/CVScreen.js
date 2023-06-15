import React, {useContext, useEffect, useState} from 'react';
import {
  TouchableHighlight,
  Dimensions,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {colors, fonts} from '../../components/Theme';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useIsFocused} from '@react-navigation/native';
import {Box, Button, Center, Pressable, Text, useToast} from 'native-base';
import Spinner from '../../components/Spinner';

const SuccessDialog = ({path}) => {
  return (
    <Center
      bg={colors.white}
      px={10}
      py={16}
      mx={5}
      mb={5}
      borderRadius={20}
      borderColor={colors.dark30}
      borderWidth={0.5}>
      <Box
        position={'absolute'}
        top={-30}
        bg={colors.primary}
        p={5}
        borderRadius={10}
        borderColor={colors.dark30}
        borderWidth={0.5}>
        <Icon name="check" color={colors.white} size={36} />
      </Box>
      <Text fontFamily={fonts.poppins_sb} fontSize={20} textAlign={'center'}>
        Download CV Berhasil!
      </Text>
      <Text fontFamily={fonts.poppins} fontSize={12} textAlign={'center'}>
        Lokasi file : {path}.
      </Text>
    </Center>
  );
};

const ExternalCV = ({navigation}) => {
  const isFocused = useIsFocused();
  const toast = useToast();
  const [generated, setGenerated] = useState(false);
  const {userInfo, userToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [path, setPath] = useState('');
  const [source, setSource] = useState({
    uri: 'file:///storage/emulated/0/Android/data/com.ess/files/Documents/CV.pdf',
    cache: false,
  });

  const getCVData = async () => {
    axios
      .get(BASE_URL + '/cv/' + userInfo.npp, {
        headers: {'x-access-token': userToken},
      }) // Get API dengan parameter NPP dengan keamanan x-access-token token
      .then(response => {
        // console.log(response.data.data);
        createPDF(response.data.data);
        setTimeout(() => {
          setData(response.data.data);
          setSource({
            uri: 'file:///storage/emulated/0/Android/data/com.ess/files/Documents/CV.pdf',
            cache: false,
          });
          setIsLoading(false);
        }, 2000);
      })
      .catch(e => {
        // logout(); // Apabla terdapat error maka akan logout
      });
  };

  const createPDF = async data => {
    let options = {
      html: `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CV</title>
    <style type="text/css">
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      .logo {
        width: 80px;
      }
      .foto {
        width: 120px;
        height: 160px;
      }
      .title {
        text-decoration: underline;
        font-weight: bold;
      }
      .cv {
        margin-top: -100px;
        text-align: left;
      }
      .cv td {
        padding: 5px;
        font-size: 0.9em;
      }
      .pendidikan {
        border: 1px solid black;
        border-collapse: collapse;
      }
      .pendidikan th,
      .pendidikan td {
        font-size: 0.8em;
        padding: 5px 10px;
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="https://upload.wikimedia.org/wikipedia/id/6/6e/Logo_PT_Pindad_%28Persero%29.png"
          alt=""
          class="logo" />
        <h2 class="title">DAFTAR RIWAYAT HIDUP</h2>
        <img
          src="https://divedigital.id/wp-content/uploads/2022/07/10-Blank-Profile-Picture-with-Hat.jpg"
          alt=""
          class="foto" />
      </div>
      <div class="content">
        <table class="cv">
          <tbody>
            <tr>
              <th>1.</th>
              <th>Nama</th>
              <td>:</td>
              <td>${data.nama}</td>
            </tr>
            <tr>
              <th>2.</th>
              <th>Unit</th>
              <td>:</td>
              <td>${data.unit}</td>
            </tr>
            <tr>
              <th>3.</th>
              <th>Tempat/Tanggal Lahir</th>
              <td>:</td>
              <td>${data.tempat_lahir}, ${data.tanggal_lahir}</td>
            </tr>
            <tr>
              <th>4.</th>
              <th>Alamat Rumah</th>
              <td>:</td>
              <td>${data.alamat_rumah}</td>
            </tr>
            <tr>
              <th>5.</th>
              <th>Alamat Kantor</th>
              <td>:</td>
              <td>${data.alamat_kantor}</td>
            </tr>
            <tr>
              <th>6.</th>
              <th>Jenis Kelamin</th>
              <td>:</td>
              <td>${data.jenis_kelamin}</td>
            </tr>
            <tr>
              <th>7.</th>
              <th>Strata</th>
              <td>:</td>
              <td>${data.strata}</td>
            </tr>
            <tr>
              <th>8.</th>
              <th>Status</th>
              <td>:</td>
              <td>${data.status}</td>
            </tr>
            <tr>
              <th>9.</th>
              <th>Pendidikan</th>
              <td>:</td>
              <td>${data.riwayat_pendidikan[0].tingkat_pendidikan}</td>
            </tr>
          </tbody>
        </table>
        <ol type="a">
          <li style="font-weight: bold;margin-bottom:10px">Umum</li>
          <table class="pendidikan">
            <thead>
              <tr>
                <th>NO</th>
                <th>PENDIDIKAN</th>
                <th>JURUSAN</th>
                <th>NAMA SEKOLAH</th>
                <th>TEMPAT/KOTA</th>
                <th>TAHUN LULUS</th>
              </tr>
            </thead>
            <tbody>
            ${data.riwayat_pendidikan.map((pend, index) => {
              return `
              <tr>
              <td>${index + 1}</td>
              <td>${pend.tingkat_pendidikan}</td>
              <td>${pend.jurusan_pendidikan}</td>
              <td>${pend.lembaga_pendidikan}I</td>
              <td>${pend.kota_lembaga_pendidikan}</td>
              <td>${pend.tahun_lulus}</td>
            </tr>`;
            })}
              <tr>
                <td>2</td>
                <td>S1</td>
                <td>TEKNIK INFORMATIKA</td>
                <td>UI</td>
                <td>JAKARTA</td>
                <td>2014</td>
              </tr>
              <tr>
                <td>3</td>
                <td>SLTA</td>
                <td>SMA - IPA</td>
                <td>SMA 1 SURAKARTA</td>
                <td>SURAKARTA</td>
                <td>2010</td>
              </tr>
              <tr>
                <td>4</td>
                <td>SLTP</td>
                <td>UMUM</td>
                <td>SMPN 1 KRA</td>
                <td>KARANGANYAR</td>
                <td>2007</td>
              </tr>
              <tr>
                <td>5</td>
                <td>SD</td>
                <td>UMUM</td>
                <td>SDN 1 KRA</td>
                <td>KARANGANYAR</td>
                <td>2004</td>
              </tr>
            </tbody>
          </table>
        </ol>
      </div>
    </div>
  </body>
</html>

      `,
      fileName: 'CV',
      directory: 'Documents',
      height: 842,
      width: 595,
    };

    let file = await RNHTMLtoPDF.convert(options);
    setPath(file.filePath);
  };

  const downloadPDF = () => {
    createPDF(data);
    toast.show({
      render: () => {
        return <SuccessDialog path={path} />;
      },
      placement: 'bottom',
    });
  };

  useEffect(() => {
    getCVData();
  }, [isFocused, generated]);

  if (isLoading) {
    return <Spinner />; // Apabila status loading true maka akan menampilkan Skeleton
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.primary} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>CV External</Text>
      </View>
      <View style={styles.container}>
        <Pdf source={source} style={styles.pdf} />
        <View>
          <Pressable onPress={downloadPDF}>
            {({isPressed}) => {
              return (
                <Box
                  style={[
                    styles.btnCreate,
                    {
                      backgroundColor: isPressed
                        ? colors.white
                        : colors.bgWhite,
                    },
                  ]}>
                  <Text>Download PDF</Text>
                </Box>
              );
            }}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExternalCV;

const styles = StyleSheet.create({
  btnCreate: {
    borderRadius: 15,
    elevation: 5,
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 15,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: '100%',
    justifyContent: 'flex-start',
    paddingTop: 30,
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
    bottom: 0,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    left: '50%',
    marginLeft: -20,
    position: 'absolute',
    textAlign: 'center',
    width: 100,
  },
  pdf: {
    height: Dimensions.get('window').height - 220,
    marginTop: 0,
    width: Dimensions.get('window').width - 20,
  },
});
