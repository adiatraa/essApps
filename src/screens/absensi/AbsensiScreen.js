import {StatusBar, StyleSheet, TouchableHighlight, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, BottomSheet, Dialog} from '@rneui/themed';
import ClockInScreen from './ClockInScreen';
import ClockOutScreen from './ClockOutScreen';
import {
  getDate,
  getTime,
  converDate,
  convertMonth,
} from '../../components/Date';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import DatePicker from 'react-native-modern-datepicker';
import Toast from '../../components/Toast';
import {
  Box,
  Text,
  HStack,
  Pressable,
  VStack,
  useToast,
  ScrollView,
  Center,
  Progress,
} from 'native-base';
import Spinner from '../../components/Spinner';

// History Card component
const HistoryCard = ({onPress, clockIn, clockOut, date, status, active}) => {
  return (
    <Pressable onPress={onPress}>
      {({isHovered, isPressed}) => {
        return (
          <Box bg={colors.white} px={8} py={7} borderRadius={10}>
            <VStack>
              <Text
                style={{
                  fontFamily: fonts.poppins_m,
                  fontSize: 14,
                  color: colors.dark,
                }}>
                {converDate(date)}
              </Text>
              <HStack
                alignItems={'center'}
                justifyContent={'space-between'}
                flexWrap={'wrap'}
                w={'80%'}>
                <HStack alignItems={'center'}>
                  <Icon name="calendar-start" color={colors.dark} />
                  <Text
                    style={{
                      fontFamily: fonts.poppins,
                      fontSize: 8,
                      color: colors.dark,
                      marginBottom: -1,
                      marginLeft: 2,
                    }}>
                    Clock In {'  '} {clockIn === null ? '-' : clockIn}
                  </Text>
                </HStack>
                <Icon name={'circle-small'} color={colors.black} />
                <HStack alignItems={'center'}>
                  <Icon name="calendar-end" color={colors.dark} />
                  <Text
                    style={{
                      fontFamily: fonts.poppins,
                      fontSize: 8,
                      color: colors.dark,
                      marginBottom: -1,
                      marginLeft: 2,
                    }}>
                    Clock Out {'  '} {clockOut === null ? '-' : clockOut}
                  </Text>
                </HStack>
                <HStack alignItems={'center'}>
                  <Icon name="calendar-refresh" color={colors.dark} />
                  <Text
                    style={{
                      fontFamily: fonts.poppins,
                      fontSize: 8,
                      color: colors.dark,
                      marginBottom: -1,
                      marginLeft: 2,
                    }}>
                    Terlambat {'  '} -
                  </Text>
                </HStack>
              </HStack>
            </VStack>
            <Box
              position={'absolute'}
              bottom={0}
              right={0}
              px={7}
              py={1}
              bg={
                status === 'hadir'
                  ? colors.success
                  : status === 'terlambat'
                  ? colors.secondary
                  : colors.danger
              }
              borderBottomRightRadius={10}
              borderTopLeftRadius={10}>
              <HStack justifyContent={'center'} alignItems={'center'}>
                <Icon name={'check-all'} color={colors.white} size={12} />
                <Text
                  color={colors.white}
                  ml={1}
                  pr={1}
                  mb={-0.5}
                  style={{fontFamily: fonts.poppins_sb, fontSize: 10}}>
                  HADIR
                </Text>
              </HStack>
            </Box>
          </Box>
        );
      }}
    </Pressable>
  );
};

// Default props History Card
HistoryCard.defaultProps = {
  onPress: () => {},
  date: 'Senin, 01 Mei 2023',
  clockIn: null,
  clockOut: null,
  status: 'hadir',
  active: false,
};

const SuccessDialog = () => {
  return (
    <Center
      bg={colors.white}
      px={10}
      py={16}
      mx={3}
      mb={5}
      borderRadius={20}
      borderColor={colors.dark30}
      borderWidth={0.5}>
      <Box
        position={'absolute'}
        top={-30}
        bg={colors.navy}
        p={5}
        borderRadius={10}
        borderColor={colors.dark30}
        borderWidth={0.5}>
        <Icon name="check" color={colors.white} size={36} />
      </Box>
      <Text fontFamily={fonts.poppins_sb} fontSize={20} textAlign={'center'}>
        Absensi Berhasil!
      </Text>
      <Text fontFamily={fonts.poppins} fontSize={12} textAlign={'center'}>
        Semangat & selalu berikan pelayanan terbaik untuk kita semua.
      </Text>
    </Center>
  );
};

const AbsensiScreen = ({navigation}) => {
  const toast = useToast();
  const {userToken, userInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [outVisible, setOutVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(); // Menyimpan tanggal terpilih filter Choose Date
  const [datePickerVisible, setDatePickerVisible] = useState(false); // Status visible datepicker
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [data, setData] = useState([]);
  const [recap, setRecap] = useState(null);

  // Get API riwayat absensi
  const getHistoryAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/history-attendance/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setData(response.data.data.attendance);
          setRecap(response.data.data.numbers_of_attendance);
        });
    } catch {}
  };

  // Get API riwayat Absensi sesuai filter tanggal
  const getOneHistoryAPI = async () => {
    try {
      axios
        .post(
          BASE_URL + '/choose-date-attendance',
          {npp: userInfo.npp, tanggal_hadir: selectedDate},
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          if (response.data.data.attendance != null) {
            setData(response.data.data.attendance);
            setRecap(response.data.data.numbers_of_attendance);
          } else {
            setData(null);
          }
          console.log(response.data.data.attendance);
          setDatePickerVisible(false);
        });
    } catch {}
  };

  // Menangani tombol Clock In
  const handleClockIn = async () => {
    try {
      axios
        .post(
          BASE_URL + '/get-attendance',
          {
            npp: userInfo.npp,
          },
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          if (response.data.message === 'User have not attendance') {
            setVisible(true);
            setStatus('Kosong');
          } else if (response.data.message === 'User already clocked out') {
            setVisible(true);
            setStatus('Isi');
          } else {
            setVisible(false);
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Anda sudah Clock In !'}
                    bgColor={colors.bgDanger}
                    icon={'alert-outline'}
                  />
                );
              },
              placement: 'top',
            });
          }
        });
    } catch (error) {}
  };

  // Menangani tombol Clock Out
  const handleClockOut = async () => {
    try {
      axios
        .post(
          BASE_URL + '/get-attendance',
          {
            npp: userInfo.npp,
          },
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          if (response.data.message === 'User already clocked in') {
            setOutVisible(true);
          } else {
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Anda sudah Clock Out !'}
                    bgColor={colors.bgDanger}
                    icon={'alert-outline'}
                  />
                );
              },
              placement: 'top',
            });
            setOutVisible(false);
          }
        });
    } catch (error) {}
  };

  // Menangani perubahan setelah Clock In
  const afterClockIn = async () => {
    if (status === 'Kosong') {
      try {
        axios
          .post(
            BASE_URL + '/clock-in',
            {npp: userInfo.npp, kode_unit: userInfo.kode_unit},
            {
              headers: {'x-access-token': userToken},
            },
          )
          .then(response => {
            toast.show({
              render: () => {
                return <SuccessDialog />;
              },
              placement: 'bottom',
            });
          });
      } catch {}
    } else if (status === 'Isi') {
      try {
        axios
          .put(
            BASE_URL + '/clock-in',
            {npp: userInfo.npp, kode_unit: userInfo.kode_unit},
            {
              headers: {'x-access-token': userToken},
            },
          )
          .then(response => {
            toast.show({
              render: () => {
                return <SuccessDialog />;
              },
              placement: 'bottom',
            });
          });
      } catch {}
    }
    setVisible(false);
  };

  // Menangani perubahan setelah Clock Out
  const afterClockOut = async () => {
    try {
      axios
        .put(
          BASE_URL + '/clock-out',
          {npp: userInfo.npp, kode_unit: userInfo.kode_unit},
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          toast.show({
            render: () => {
              return (
                <Toast
                  message={'Anda berhasil Clock Out !'}
                  bgColor={colors.bgSuccess}
                  icon={'check-all'}
                />
              );
            },
            placement: 'top',
          });
        });
    } catch {}
    setOutVisible(false);
  };

  const hideSheet = () => {
    setVisible(false);
    setOutVisible(false);
  };

  // Menjalankan function getHistoryAPi ketika terdapat perubahan pada state visible dan outVisible
  useEffect(() => {
    getHistoryAPI();
  }, [visible, outVisible]);

  if (data.length < 1) {
    return <Spinner />; // Apabila status loading true maka akan menampilkan Skeleton
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
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
              getOneHistoryAPI();
            }}
          />
        </Dialog.Actions>
      </Dialog>
      <ScrollView px={5} bg={colors.bgWhite} minH={'100%'}>
        <Box mt={7}>
          <ImageBackground
            source={require('../../assets/backgroundCard.png')}
            resizeMode={'stretch'}
            borderRadius={30}
            style={styles.mainCardBackground}>
            <VStack justifyContent={'center'} alignItems={'center'} py={10}>
              <Text style={styles.mainCardTime}>{getTime(date)}</Text>
              <Text style={styles.mainCardDate}>{getDate(date)}</Text>
              <HStack mt={3} alignItems={'center'}>
                <Button
                  title={'Clock In'}
                  titleStyle={styles.mainCardButtonTitle}
                  containerStyle={styles.mainCardButtonContainer}
                  buttonStyle={styles.mainCardButton}
                  icon={
                    <Icon
                      name="calendar-start"
                      size={16}
                      color={colors.dark}
                      style={styles.mainCardButtonIcon}
                    />
                  }
                  onPress={handleClockIn}
                />
                <Button
                  title={'Clock Out'}
                  titleStyle={styles.mainCardButtonTitle}
                  containerStyle={styles.mainCardButtonContainer}
                  buttonStyle={styles.mainCardButton}
                  icon={
                    <Icon
                      name="calendar-end"
                      size={16}
                      color={colors.dark}
                      style={styles.mainCardButtonIcon}
                    />
                  }
                  onPress={handleClockOut}
                />
              </HStack>
              {/* <Text style={styles.mainCardDescription}>Tidak ada presensi</Text> */}
            </VStack>
          </ImageBackground>
        </Box>
        <Box
          bg={colors.white}
          mx={1}
          px={5}
          pt={7}
          pb={5}
          mt={7}
          borderRadius={10}>
          <VStack px={2} space={2}>
            <Progress
              size={'md'}
              value={(100 / 31) * parseInt(recap)}
              _filledTrack={{
                bg: colors.success,
              }}
            />
            <Text fontWeight={'bold'}>
              {'Total kehadiran bulan ' +
                (data.length === 1
                  ? convertMonth(new Date(data[0].tanggal_hadir).getMonth())
                  : convertMonth(new Date().getMonth())) +
                ' : ' +
                recap +
                ' Hari'}
            </Text>
          </VStack>
        </Box>
        <Box mb={200}>
          <HStack justifyContent={'space-between'} alignItems={'center'} px={2}>
            <Text style={styles.subTitle}>Riwayat</Text>
            <TouchableHighlight
              onPress={() => setDatePickerVisible(true)}
              underlayColor={colors.bgWhite}>
              <View style={styles.chooseDate}>
                <Icon
                  name="calendar"
                  size={24}
                  color={colors.secondary}
                  style={styles.chooseDateIcon}
                />
                <Text style={{}}>Choose Date</Text>
              </View>
            </TouchableHighlight>
          </HStack>
          <VStack px={2} space={3}>
            {data === null ? (
              <Center>
                <Text color={colors.dark20}>
                  Riwayat kehadiran tidak ditemukan!
                </Text>
              </Center>
            ) : (
              data.map((e, index) => {
                return (
                  <HistoryCard
                    key={index}
                    date={e.tanggal_hadir}
                    active={false}
                    clockIn={e.t01}
                    clockOut={e.t02}
                    status={'hadir'}
                    onPress={() =>
                      navigation.navigate('AbsensiDetail', {
                        date: e.tanggal_hadir,
                        npp: e.npp,
                        t: [
                          e.t01,
                          e.t02,
                          e.t03,
                          e.t04,
                          e.t05,
                          e.t06,
                          e.t07,
                          e.t08,
                          e.t09,
                          e.t10,
                        ],
                      })
                    }
                  />
                );
              })
            )}
          </VStack>
        </Box>
      </ScrollView>
      <BottomSheet
        isVisible={visible}
        modalProps={{
          animationType: 'slide',
          presentationStyle: 'overFullScreen',
        }}
        onBackdropPress={() => setVisible(false)}>
        <HStack
          alignItems={'center'}
          px={5}
          pt={12}
          pb={5}
          bg={colors.white}
          borderTopLeftRadius={50}
          borderTopRightRadius={50}>
          <Icon
            name="chevron-left"
            size={32}
            color={colors.black}
            onPress={() => setVisible(false)}
          />
          <Text style={styles.sheetHeaderTitle}>Clock In</Text>
        </HStack>
        <ClockInScreen
          status={status}
          handleSend={afterClockIn}
          hideSheet={hideSheet}
        />
      </BottomSheet>
      <BottomSheet
        isVisible={outVisible}
        modalProps={{
          animationType: 'slide',
          presentationStyle: 'overFullScreen',
        }}
        onBackdropPress={() => setOutVisible(false)}>
        <HStack
          alignItems={'center'}
          px={5}
          pt={12}
          pb={5}
          bg={colors.white}
          borderTopLeftRadius={50}
          borderTopRightRadius={50}>
          <Icon
            name="chevron-left"
            size={32}
            color={colors.black}
            onPress={() => setOutVisible(false)}
          />
          <Text style={styles.sheetHeaderTitle}>Clock Out</Text>
        </HStack>
        <ClockOutScreen
          status={status}
          handleSend={afterClockOut}
          hideSheet={hideSheet}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default AbsensiScreen;

const styles = StyleSheet.create({
  chooseDate: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chooseDateIcon: {
    marginLeft: -5,
    paddingRight: 5,
  },
  mainCardButton: {
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  mainCardButtonContainer: {
    borderRadius: 5,
    elevation: 10,
    marginHorizontal: 5,
    shadowColor: '#333',
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
    width: 100,
  },
  mainCardButtonIcon: {paddingRight: 5},
  mainCardButtonTitle: {
    color: colors.dark10,
    fontFamily: fonts.poppins,
    fontSize: 10,
    marginBottom: -3,
  },
  mainCardDate: {
    fontFamily: fonts.poppins,
    fontSize: 14,
  },
  mainCardTime: {
    fontFamily: fonts.poppins_b,
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  sheetHeaderTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 24,
    marginLeft: 10,
    paddingTop: 12,
  },
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
});
