import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-modern-datepicker';
import {Dialog} from '@rneui/themed';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import {getDate} from '../../components/Date';

// Card component
const Card = ({onPress, tanggal, jam}) => {
  return (
    <TouchableHighlight
      style={styles.card}
      onPress={onPress}
      underlayColor={colors.dark60}>
      <>
        <View style={styles.cardBody}>
          <View style={styles.date}>
            <Icon
              name="calendar-blank-outline"
              size={16}
              color={colors.dark30}
            />
            <Text style={styles.dateTitle}>{tanggal}</Text>
          </View>
          <Text style={styles.cardTitle}>Total Jam Terbuang</Text>
          <Text style={styles.cardDescription}>{jam} Jam</Text>
        </View>
        <Icon name="chevron-right" size={32} />
      </>
    </TouchableHighlight>
  );
};

const JamTerbuangScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(); // Menyimpan tanggal terpilih filter Choose Date
  const [datePickerVisible, setDatePickerVisible] = useState(false); // Status visible datepicker
  const {userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState([]);

  // Get API riwayat Jam Terbuang
  const getJamTerbuangAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/jam-terbuang/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setData(response.data.data.jam_terbuang);
        });
    } catch {}
  };

  // Get API riwayat Jam Terbuang sesuai filter tanggal
  const getOneJamTerbuangAPI = async () => {
    try {
      axios
        .post(
          BASE_URL + '/choose-jam-terbuang',
          {npp: userInfo.npp, tanggal: selectedDate},
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          setData([response.data.data.jam_terbuang]);
          setDatePickerVisible(false);
        });
    } catch {}
  };

  useEffect(() => {
    getJamTerbuangAPI();
  }, []);

  return (
    <SafeAreaView>
      <Dialog
        isVisible={datePickerVisible}
        onBackdropPress={() => setDatePickerVisible(false)}
        overlayStyle={{
          paddingHorizontal: 5,
          paddingVertical: 10,
          borderRadius: 10,
        }}>
        <DatePicker
          mode={'calendar'}
          onSelectedChange={date => setSelectedDate(date.replace(/\//g, '-'))}
          options={{mainColor: colors.primary}}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              getOneJamTerbuangAPI();
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Jam Terbuang</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <TouchableHighlight
          onPress={() => setDatePickerVisible(true)}
          underlayColor={colors.bgWhite}>
          <View style={styles.chooseDate}>
            <Icon
              name="calendar"
              size={24}
              color={colors.dark20}
              style={styles.chooseDateIcon}
            />
            <Text>Choose Date</Text>
          </View>
        </TouchableHighlight>
        {data.map((i, index) => {
          return i === null ? (
            <Text
              style={{
                width: '100%',
                textAlign: 'center',
                fontFamily: fonts.poppins,
                fontSize: 14,
                marginTop: 10,
              }}>
              Data Jam Terbuang Tidak Ditemukan
            </Text>
          ) : (
            <Card
              key={index}
              tanggal={getDate(new Date(i.tanggal))}
              jam={i.total_jam_terbuang}
              onPress={() =>
                navigation.navigate('JamTerbuangDetail', {data: i})
              }
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JamTerbuangScreen;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 18,
    display: 'flex',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  cardDescription: {
    color: colors.dark20,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
  },
  cardTitle: {
    color: colors.secondary,
    fontFamily: fonts.poppins_sb,
    fontSize: 14,
  },
  chooseDate: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chooseDateIcon: {
    marginLeft: -100,
    paddingRight: 75,
  },
  date: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  dateTitle: {
    fontFamily: fonts.poppins,
    fontSize: 12,
    marginBottom: -2,
    marginLeft: 10,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  scrollView: {
    backgroundColor: colors.bgWhite,
    height: '100%',
    width: '100%',
  },
});
