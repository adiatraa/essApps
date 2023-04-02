import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts} from './Theme';

const HistoryCard = ({onPress, clockIn, clockOut, date, status, active}) => {
  const converDate = date => {
    var date = new Date(date);
    var tahun = date.getFullYear();
    var bulan = date.getMonth();
    var tanggal = date.getDate();
    var hari = date.getDay();
    switch (hari) {
      case 0:
        hari = 'Minggu';
        break;
      case 1:
        hari = 'Senin';
        break;
      case 2:
        hari = 'Selasa';
        break;
      case 3:
        hari = 'Rabu';
        break;
      case 4:
        hari = 'Kamis';
        break;
      case 5:
        hari = "Jum'at";
        break;
      case 6:
        hari = 'Sabtu';
        break;
    }
    switch (bulan) {
      case 0:
        bulan = 'Januari';
        break;
      case 1:
        bulan = 'Februari';
        break;
      case 2:
        bulan = 'Maret';
        break;
      case 3:
        bulan = 'April';
        break;
      case 4:
        bulan = 'Mei';
        break;
      case 5:
        bulan = 'Juni';
        break;
      case 6:
        bulan = 'Juli';
        break;
      case 7:
        bulan = 'Agustus';
        break;
      case 8:
        bulan = 'September';
        break;
      case 9:
        bulan = 'Oktober';
        break;
      case 10:
        bulan = 'November';
        break;
      case 11:
        bulan = 'Desember';
        break;
    }
    return hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun;
  };

  return (
    <TouchableHighlight
      style={styles.card}
      onPress={onPress}
      underlayColor={colors.white}>
      <ImageBackground
        source={require('../assets/backgroundCard2.png')}
        resizeMode={'stretch'}
        style={[
          styles.cardBackground,
          active === true
            ? {borderColor: colors.primary}
            : {borderColor: colors.dark40},
        ]}>
        <Text style={styles.cardTitle}>{converDate(date)}</Text>
        <View style={styles.cardBody}>
          <View>
            <Text style={styles.cardBodyClockTitle}>Clock In</Text>
            <Text style={styles.cardBodyClockTime}>
              {clockIn === null ? '-' : clockIn}
            </Text>
          </View>
          <View style={styles.dividerVertical} />
          <View style={styles.cardBodyClockStatus}>
            <Text style={styles.cardBodyClockTitle}>Clock Out</Text>
            <Text style={styles.cardBodyClockTime}>
              {clockOut === null ? '-' : clockOut}
            </Text>
          </View>
        </View>
        {status === true ? (
          <Text style={styles.cardStatusPresensiSuccess}>HADIR</Text>
        ) : (
          <Text style={styles.cardStatusPresensiDanger}>TIDAK HADIR</Text>
        )}
      </ImageBackground>
    </TouchableHighlight>
  );
};

HistoryCard.defaultProps = {
  onPress: () => {},
  date: 'Senin, 01 Mei 2023',
  clockIn: null,
  clockOut: null,
  status: false,
  active: false,
};

export default HistoryCard;

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    marginVertical: -10,
    position: 'relative',
    width: '100%',
  },
  cardBackground: {
    alignItems: 'flex-start',
    borderColor: colors.dark40,
    borderRadius: 20,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 15,
    paddingHorizontal: 70,
    paddingVertical: 20,
  },
  cardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  cardBodyClockTime: {
    color: colors.dark10,
    fontFamily: fonts.poppins,
    fontSize: 10,
  },
  cardBodyClockTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 10,
  },
  cardStatusPresensiDanger: {
    backgroundColor: colors.bgDanger,
    borderRadius: 5,
    color: colors.danger,
    fontFamily: fonts.poppins_sb,
    fontSize: 10,
    paddingBottom: 3,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  cardStatusPresensiSuccess: {
    backgroundColor: colors.bgSuccess,
    borderRadius: 5,
    color: colors.success,
    fontFamily: fonts.poppins_sb,
    fontSize: 10,
    paddingBottom: 3,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  cardTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 14,
    marginBottom: -5,
  },
  dividerVertical: {
    borderRightColor: colors.dark10,
    borderRightWidth: 1,
    height: 40,
    marginHorizontal: 5,
    width: 1,
  },
});
