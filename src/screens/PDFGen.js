import React from 'react';
import {
  Text,
  TouchableHighlight,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import Pdf from 'react-native-pdf';

import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {colors} from '../components/Theme';

const PDFGen = () => {
  const source = {
    uri: 'file:///storage/emulated/0/Android/data/com.ess/files/Documents/test.pdf',
  };
  const createPDF = async () => {
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
              <td>JOHN DOE</td>
            </tr>
            <tr>
              <th>2.</th>
              <th>Unit</th>
              <td>:</td>
              <td>TEKNOLOGI INFORMASI</td>
            </tr>
            <tr>
              <th>3.</th>
              <th>Tempat/Tanggal Lahir</th>
              <td>:</td>
              <td>LONDON, 01 JANUARI 1998</td>
            </tr>
            <tr>
              <th>4.</th>
              <th>Alamat Rumah</th>
              <td>:</td>
              <td>SURAKARTA</td>
            </tr>
            <tr>
              <th>5.</th>
              <th>Alamat Kantor</th>
              <td>:</td>
              <td>JAKARTA</td>
            </tr>
            <tr>
              <th>6.</th>
              <th>Jenis Kelamin</th>
              <td>:</td>
              <td>LAKI-LAKI</td>
            </tr>
            <tr>
              <th>7.</th>
              <th>Strata</th>
              <td>:</td>
              <td>1</td>
            </tr>
            <tr>
              <th>8.</th>
              <th>Status</th>
              <td>:</td>
              <td>AKTIF</td>
            </tr>
            <tr>
              <th>9.</th>
              <th>Pendidikan</th>
              <td>:</td>
              <td>S2-MTI</td>
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
              <tr>
                <td>1</td>
                <td>S2</td>
                <td>MTI</td>
                <td>UI</td>
                <td>JAKARTA</td>
                <td>2018</td>
              </tr>
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
      fileName: 'test',
      directory: 'Documents',
      height: 842,
      width: 595,
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    alert(file.filePath);
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableHighlight onPress={createPDF} style={styles.btnCreate}>
          <Text>Create PDF</Text>
        </TouchableHighlight>
      </View>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

export default PDFGen;

const styles = StyleSheet.create({
  btnCreate: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 50,
    paddingVertical: 5,
    width: 100,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pdf: {
    height: Dimensions.get('window').height - 220,
    marginTop: 0,
    width: Dimensions.get('window').width - 20,
  },
});
