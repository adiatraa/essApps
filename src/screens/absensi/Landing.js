import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {colors, fonts} from '../../components/Theme';
import {Dialog} from '@rneui/themed';
import {
  getDate,
  getTime,
  converDate,
  convertMonth,
  convertTime,
} from '../../components/Date';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
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
  Button,
  Spinner as Spin,
  Skeleton,
} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import {CustomIcon} from '../../components/CustomIcon';

// History Card component
const HistoryCard = ({
  onPress,
  clockIn,
  clockOut,
  date,
  status,
  terlambat,
  active,
}) => {
  return (
    <Pressable onPress={onPress}>
      {({isHovered, isPressed}) => {
        return (
          <Box
            bg={colors.white}
            px={8}
            py={7}
            borderRadius={10}
            borderWidth={active ? 0.5 : 0}
            borderColor={colors.primary}>
            <VStack>
              <Text
                style={{
                  fontFamily: fonts.poppins_m,
                  fontSize: 14,
                  color: colors.dark,
                }}>
                {converDate(date)}
              </Text>
              <VStack alignItems={'flex-start'}>
                <HStack
                  alignItems={'center'}
                  justifyContent={'flex-start'}
                  flexWrap={'wrap'}
                  space={2}
                  w={'90%'}>
                  <HStack alignItems={'center'}>
                    <CustomIcon
                      name="calendar-circle-plus"
                      color={colors.dark}
                    />
                    <Text
                      style={{
                        fontFamily: fonts.poppins,
                        fontSize: 10,
                        color: colors.dark,
                        marginBottom: -2,
                        marginLeft: 2,
                      }}>
                      Clock In {'  '} {clockIn === null ? '-' : clockIn}
                    </Text>
                  </HStack>
                  {/* <Icon name={'circle-small'} color={colors.black} /> */}
                  <Text fontSize={10} pb={0.5} color={colors.dark20}>
                    |
                  </Text>
                  <HStack alignItems={'center'}>
                    <CustomIcon
                      name="calendar-circle-check"
                      color={colors.dark}
                    />

                    <Text
                      style={{
                        fontFamily: fonts.poppins,
                        fontSize: 10,
                        color: colors.dark,
                        marginBottom: -2,
                        marginLeft: 2,
                      }}>
                      Clock Out {'  '} {clockOut === null ? '-' : clockOut}
                    </Text>
                  </HStack>
                </HStack>
                <HStack alignItems={'center'}>
                  <CustomIcon
                    name="calendar-circle-warning"
                    color={colors.dark}
                  />

                  <Text
                    style={{
                      fontFamily: fonts.poppins,
                      fontSize: 10,
                      color: colors.dark,
                      marginBottom: -2,
                      marginLeft: 2,
                    }}>
                    Terlambat{' '}
                    {terlambat != null
                      ? terlambat != 0
                        ? terlambat
                        : ' -'
                      : ' -'}
                  </Text>
                </HStack>
              </VStack>
            </VStack>
            <Box
              position={'absolute'}
              bottom={0}
              right={0}
              w={120}
              py={1}
              bg={
                status === 'terlambat'
                  ? colors.secondary
                  : status === 'hadir'
                  ? colors.success
                  : colors.danger
              }
              borderBottomRightRadius={10}
              borderTopLeftRadius={10}>
              <HStack justifyContent={'center'} alignItems={'center'}>
                {/* <Icon name={'check-all'} color={colors.white} size={12} /> */}
                <Text
                  color={colors.white}
                  ml={1}
                  pr={1}
                  mb={-0.5}
                  style={{fontFamily: fonts.poppins_sb, fontSize: 10}}>
                  {status === 'terlambat'
                    ? 'TERLAMBAT'
                    : status === 'hadir'
                    ? 'HADIR'
                    : 'TIDAK HADIR'}
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

const Landing = ({navigation, route}) => {
  const toast = useToast();
  const isFocused = useIsFocused();
  const {userToken, userInfo} = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(); // Menyimpan tanggal terpilih filter Choose Date
  const [datePickerVisible, setDatePickerVisible] = useState(false); // Status visible datepicker
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [jamTelat, setJamTelat] = useState([]);
  const [recap, setRecap] = useState(null);
  const [inLoading, setInLoading] = useState(false);
  const [outLoading, setOutLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  // Get API riwayat absensi
  const getHistoryAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/history-attendance?npp=' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setJamTelat(response.data.jam_telat);
          setData(response.data.attendance);
          setRecap(response.data.numbers_of_attendance);
          setPageLoading(false);
        });
    } catch {}
  };

  // Get API riwayat Absensi sesuai filter tanggal
  const getOneHistoryAPI = async () => {
    try {
      axios
        .get(
          BASE_URL +
            '/choose-date-attendance?npp=' +
            userInfo.npp +
            '&tanggal_hadir=' +
            selectedDate,
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          if (response.data.attendance != null) {
            setJamTelat([response.data.jam_telat]);
            setData([response.data.attendance]);
            setRecap(response.data.numbers_of_attendance);
          } else {
            setData(null);
          }
          setDatePickerVisible(false);
        })
        .catch(err => {
          if (err.response.data.message === 'attendance not found') {
            setData([]);
            setRecap(err.response.data.numbers_of_attendance);
          }
          setDatePickerVisible(false);
        });
    } catch {}
  };

  // Menangani tombol Clock In
  const handleClockIn = async () => {
    try {
      axios
        .get(BASE_URL + '/get-attendance?npp=' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          if (response.data.message === 'already clock-out') {
            navigation.navigate('ClockIn', {status: 'Isi'});
            setInLoading(false);
          } else {
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
            setInLoading(false);
          }
        })
        .catch(err => {
          // console.log(err.response.data.message);
          if (err.response.data.message === 'attendance not found') {
            navigation.navigate('ClockIn', {status: 'Kosong'});
            setInLoading(false);
          }
        });
    } catch (error) {}
  };

  // Menangani tombol Clock Out
  const handleClockOut = async () => {
    try {
      axios
        .get(BASE_URL + '/get-attendance?npp=' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          if (response.data.message === 'already clock-in') {
            navigation.navigate('ClockOut');
            setOutLoading(false);
          } else {
            toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Anda belum Clock In !'}
                    bgColor={colors.bgDanger}
                    icon={'alert-outline'}
                  />
                );
              },
              placement: 'top',
            });
            setOutLoading(false);
          }
        });
    } catch (error) {}
  };

  const getStatusHadir = time => {
    if (time === undefined) {
      return;
    }
    let result;
    let tempTime = time.split(':');
    if (tempTime[0] == 0 && tempTime[1] == 0 && tempTime[2] == 0) {
      result = 'hadir';
    } else if (tempTime[0] > 0 || tempTime[1] > 0 || tempTime[2] > 0) {
      result = 'terlambat';
    } else {
      result = 'tidak hadir';
    }
    return result;
  };

  // Menjalankan function getHistoryAPi ketika terdapat perubahan pada state visible dan outVisible
  useEffect(() => {
    getHistoryAPI();
  }, [isFocused]);

  return (
    <SafeAreaView style={{backgroundColor: colors.bgWhite}}>
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
          selected={getFormatedDate(new Date(), 'YYYY/MM/DD')}
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
      <HStack alignItems={'center'} px={5} py={7} bg={colors.bgWhite}>
        <CustomIcon
          name="left-small"
          size={20}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Absensi</Text>
      </HStack>
      {pageLoading === true ? (
        <VStack px={5} bg={colors.bgWhite} h={'100%'}>
          <Skeleton rounded={'3xl'} h={180} />
          <Skeleton rounded={'md'} h={100} mt={7} />
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            px={2}
            py={6}>
            <Skeleton rounded={'sm'} w={70} h={7} />
            <Skeleton rounded={'sm'} w={150} h={12} />
          </HStack>
          <VStack px={2} space={3}>
            <Skeleton h={120} rounded={'md'} />
            <Skeleton h={120} rounded={'md'} />
            <Skeleton h={120} rounded={'md'} />
            <Skeleton h={120} rounded={'md'} />
            <Skeleton h={120} rounded={'md'} />
          </VStack>
        </VStack>
      ) : (
        <ScrollView
          px={5}
          bg={colors.bgWhite}
          minH={600}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                setIsRefresh(true);
                getHistoryAPI();
                setIsRefresh(false);
              }}
            />
          }>
          <Box>
            <ImageBackground
              source={require('../../assets/card.webp')}
              resizeMode={'stretch'}
              borderRadius={30}
              style={styles.mainCardBackground}>
              <VStack justifyContent={'center'} alignItems={'center'} py={10}>
                <Text style={styles.mainCardTime}>{getTime(date)}</Text>
                <Text style={styles.mainCardDate}>{getDate(date)}</Text>
                <HStack mt={3} alignItems={'center'} space={3}>
                  <Button
                    size={'sm'}
                    colorScheme={'dark'}
                    bg={colors.white}
                    borderRadius={10}
                    disabled={inLoading}
                    leftIcon={
                      inLoading === true ? (
                        <Spin color={colors.dark} />
                      ) : (
                        <CustomIcon
                          size={16}
                          name="calendar-circle-plus"
                          color={colors.dark}
                        />
                      )
                    }
                    w={110}
                    onPress={() => {
                      setInLoading(true);
                      handleClockIn();
                    }}>
                    <Text>Clock In</Text>
                  </Button>
                  <Button
                    size={'sm'}
                    colorScheme={'dark'}
                    bg={colors.white}
                    borderRadius={10}
                    disabled={outLoading}
                    leftIcon={
                      outLoading === true ? (
                        <Spin color={colors.dark} />
                      ) : (
                        <CustomIcon
                          size={16}
                          name="calendar-circle-check"
                          color={colors.dark}
                        />
                      )
                    }
                    w={110}
                    onPress={() => {
                      setOutLoading(true);
                      handleClockOut();
                    }}>
                    <Text>Clock Out</Text>
                  </Button>
                </HStack>
              </VStack>
            </ImageBackground>
          </Box>
          <Box bg={colors.white} mx={1} px={5} py={5} mt={7} borderRadius={15}>
            <VStack py={2} px={2} space={2}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text
                  fontFamily={fonts.poppins_sb}
                  fontWeight={'bold'}
                  fontSize={12}>
                  {'Total Kehadiran Bulan ' +
                    (data.length === 1
                      ? convertMonth(new Date(data[0].tanggal_hadir).getMonth())
                      : convertMonth(new Date(selectedDate).getMonth()))}
                </Text>
                <HStack alignItems={'center'}>
                  <Text
                    fontFamily={fonts.poppins_b}
                    fontWeight={'bold'}
                    fontSize={11}
                    color={colors.success}>
                    {recap}
                  </Text>
                  <Text
                    fontFamily={fonts.poppins_m}
                    fontWeight={'medium'}
                    fontSize={10}
                    color={colors.dark20}
                    mb={-0.5}
                    ml={1}>
                    Hari
                  </Text>
                </HStack>
              </HStack>
              <Progress
                size={'md'}
                value={(100 / 31) * parseInt(recap)}
                _filledTrack={{
                  bg: colors.success,
                }}
              />
            </VStack>
          </Box>
          <Box mb={100}>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              px={2}>
              <Text style={styles.subTitle}>Riwayat</Text>
              <Pressable onPress={() => setDatePickerVisible(true)}>
                <HStack style={styles.chooseDate}>
                  <CustomIcon
                    name="calendarday"
                    size={20}
                    color={colors.secondary}
                    style={styles.chooseDateIcon}
                  />
                  <Text style={{}}>Choose Date</Text>
                </HStack>
              </Pressable>
            </HStack>
            <VStack px={2} space={3}>
              {data.length < 1 ? (
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
                      active={e.t02 === null ? true : false}
                      date={e.tanggal_hadir}
                      clockIn={e.t01}
                      clockOut={
                        e.t10 != null
                          ? e.t10
                          : e.t08 != null
                          ? e.t08
                          : e.t06 != null
                          ? e.t06
                          : e.t04 != null
                          ? e.t04
                          : e.t02
                      }
                      status={getStatusHadir(jamTelat[index])}
                      terlambat={convertTime(jamTelat[index])}
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
      )}
    </SafeAreaView>
  );
};

export default Landing;

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
    paddingRight: 10,
  },
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
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
  subTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
});
