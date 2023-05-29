import {StyleSheet, SafeAreaView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {Dialog} from '@rneui/themed';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import {convertMonth, getDate} from '../../components/Date';
import {
  Box,
  HStack,
  Pressable,
  Progress,
  ScrollView,
  VStack,
  Text,
} from 'native-base';
import Spinner from '../../components/Spinner';

// Card component
const Card = ({onPress, tanggal, jam}) => {
  return (
    <Pressable onPress={onPress}>
      {({isHovered, isPressed}) => {
        return (
          <HStack
            alignItems={'center'}
            justifyContent={'space-between'}
            px={3}
            py={4}
            bg={
              isHovered
                ? colors.bgPrimary
                : isPressed
                ? colors.bgPrimary
                : colors.white
            }
            borderRadius={15}>
            <VStack pl={4}>
              <HStack my={1}>
                <Icon
                  name="calendar-blank-outline"
                  size={16}
                  color={colors.dark30}
                />
                <Text style={styles.dateTitle}>{tanggal}</Text>
              </HStack>
              <Text style={styles.cardTitle}>Total Jam Terbuang</Text>
              <Text style={styles.cardDescription}>{jam} Jam</Text>
            </VStack>
            <Icon name="chevron-right" size={32} />
          </HStack>
        );
      }}
    </Pressable>
  );
};

const JamTerbuangScreen = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(); // Menyimpan tanggal terpilih filter Choose Date
  const [datePickerVisible, setDatePickerVisible] = useState(false); // Status visible datepicker
  const {userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [recap, setRecap] = useState(null);

  // Get API riwayat Jam Terbuang
  const getJamTerbuangAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/jam-terbuang/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setData(response.data.data.Jam_terbuang);
          setRecap(response.data.data.numbers_of_Jam_terbuang);
        });
    } catch {}
  };

  // Get API riwayat Jam Terbuang sesuai filter tanggal
  const getOneJamTerbuangAPI = async () => {
    try {
      axios
        .post(
          BASE_URL + '/choose-date-jam-terbuang',
          {npp: userInfo.npp, tanggal: selectedDate},
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          setData(response.data.data.Jam_terbuang);
          setRecap(response.data.data.numbers_of_Jam_terbuang);
          setDatePickerVisible(false);
        });
    } catch {}
  };

  useEffect(() => {
    getJamTerbuangAPI();
  }, []);

  if (data.length < 1) {
    return <Spinner />; // Apabila status loading true maka akan menampilkan Skeleton
  }

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
          selected={getFormatedDate(new Date(), 'YYYY/MM/DD')}
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
      <HStack alignItems={'center'} p={5} bg={colors.bgWhite}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Jam Terbuang</Text>
      </HStack>
      <ScrollView px={5} bg={colors.bgWhite} minH={'100%'}>
        <Box bg={colors.white} mx={1} px={5} pb={6} borderRadius={10}>
          <VStack mt={7} px={2} space={3}>
            <Text fontWeight={'bold'}>
              {'Total jam terbuang bulan ' +
                (data.length === 1
                  ? convertMonth(new Date(data[0].tanggal).getMonth())
                  : convertMonth(new Date().getMonth())) +
                ' : ' +
                (recap != null ? recap : '0') +
                ' Jam'}
            </Text>
            <Progress
              size={'md'}
              value={(100 / 50) * parseInt(recap)}
              _filledTrack={{
                bg: colors.danger,
              }}
            />
          </VStack>
        </Box>
        <Pressable onPress={() => setDatePickerVisible(true)}>
          {({isHovered, isPressed}) => {
            return (
              <HStack
                bg={
                  isHovered
                    ? colors.bgWhite
                    : isPressed
                    ? colors.bgWhite
                    : colors.white
                }
                justifyContent={'center'}
                alignItems={'center'}
                my={5}
                px={5}
                py={3}
                borderRadius={10}
                borderWidth={1}
                borderColor={colors.bgPrimary}>
                <Icon
                  name="calendar"
                  size={24}
                  color={colors.dark20}
                  style={styles.chooseDateIcon}
                />
                <Text>Choose Date</Text>
              </HStack>
            );
          }}
        </Pressable>
        <VStack space={5} mx={1} mb={200}>
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
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JamTerbuangScreen;

const styles = StyleSheet.create({
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
  chooseDateIcon: {
    marginLeft: -100,
    paddingRight: 75,
  },
  dateTitle: {
    fontFamily: fonts.poppins,
    fontSize: 12,
    marginBottom: -2,
    marginLeft: 10,
  },
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
