import {StyleSheet, SafeAreaView, RefreshControl} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, fonts} from '../../components/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker, {getFormatedDate} from 'react-native-modern-datepicker';
import {Dialog} from '@rneui/themed';
import axios from 'axios';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import {convertMonth, convertTime, getDate} from '../../components/Date';
import {
  Box,
  HStack,
  Pressable,
  Progress,
  ScrollView,
  VStack,
  Text,
  Skeleton,
} from 'native-base';
import {CustomIcon} from '../../components/CustomIcon';

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
            bg={isPressed ? colors.dark60 : colors.white}
            borderRadius={15}>
            <VStack pl={4}>
              <HStack my={1}>
                <CustomIcon name="calendar1" size={16} color={colors.dark30} />
                <Text style={styles.dateTitle} color={colors.dark30}>
                  {tanggal}
                </Text>
              </HStack>
              <Text style={styles.cardTitle}>Total Jam Terbuang</Text>
              <Text style={styles.cardDescription}>{jam}</Text>
            </VStack>
            <Icon name="chevron-right" size={32} />
          </HStack>
        );
      }}
    </Pressable>
  );
};

const Landing = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(
    getFormatedDate(new Date(), 'YYYY-MM-DD'),
  ); // Menyimpan tanggal terpilih filter Choose Date
  const [datePickerVisible, setDatePickerVisible] = useState(false); // Status visible datepicker
  const {userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [recap, setRecap] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);

  // Get API riwayat Jam Terbuang
  const getJamTerbuangAPI = async () => {
    try {
      axios
        .get(BASE_URL + '/history-jam-terbuang?npp=' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        })
        .then(response => {
          setData(response.data.data.jam_terbuang);
          setRecap(response.data.data.numbers_of_Jam_terbuang);
          setPageLoading(false);
        });
    } catch {}
  };

  // Get API riwayat Jam Terbuang sesuai filter tanggal
  const getOneJamTerbuangAPI = async () => {
    try {
      axios
        .get(
          BASE_URL +
            '/choose-date-jam-terbuang?npp=' +
            userInfo.npp +
            '&tanggal=' +
            selectedDate,
          {
            headers: {'x-access-token': userToken},
          },
        )
        .then(response => {
          setData([response.data.data.jam_terbuang]);
          setRecap(response.data.data.numbers_of_Jam_terbuang);
          setDatePickerVisible(false);
        })
        .catch(err => {
          if (err.response.data.message) {
            setData([]);
            setRecap(err.response.data.numbers_of_Jam_terbuang);
          }
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
      {pageLoading === true ? (
        <VStack h={'100%'} px={5} bg={colors.bgWhite}>
          <Skeleton rounded={'md'} h={100} />
          <Skeleton rounded={'md'} my={5} h={55} />
          <VStack space={5} mx={1}>
            <Skeleton rounded={'md'} h={90} />
            <Skeleton rounded={'md'} h={90} />
            <Skeleton rounded={'md'} h={90} />
            <Skeleton rounded={'md'} h={90} />
            <Skeleton rounded={'md'} h={90} />
            <Skeleton rounded={'md'} h={90} />
            <Skeleton rounded={'md'} h={90} />
          </VStack>
        </VStack>
      ) : (
        <ScrollView
          px={5}
          bg={colors.bgWhite}
          minH={'100%'}
          refreshControl={
            <RefreshControl
              refreshing={isRefresh}
              onRefresh={() => {
                setIsRefresh(true);
                getJamTerbuangAPI();
                setIsRefresh(false);
              }}
            />
          }>
          <Box bg={colors.white} mx={1} px={5} py={5} borderRadius={15}>
            <VStack py={2} px={2} space={2}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text
                  fontFamily={fonts.poppins_sb}
                  fontWeight={'bold'}
                  fontSize={12}>
                  {'Jam Terbuang Bulan ' +
                    (data.length === 1
                      ? convertMonth(new Date(data[0].tanggal).getMonth())
                      : convertMonth(new Date(selectedDate).getMonth()))}
                </Text>
                <HStack alignItems={'center'}>
                  <Text
                    fontFamily={fonts.poppins_b}
                    fontWeight={'bold'}
                    fontSize={11}
                    color={colors.secondary}>
                    {convertTime(recap)}
                  </Text>
                  <Text
                    fontFamily={fonts.poppins_m}
                    fontWeight={'medium'}
                    fontSize={10}
                    color={colors.dark20}
                    mb={-0.5}
                    ml={1}
                  />
                </HStack>
              </HStack>
              <Progress
                size={'md'}
                value={(100 / 31) * parseInt(recap)}
                _filledTrack={{
                  bg: colors.secondary,
                }}
              />
            </VStack>
          </Box>
          <Pressable onPress={() => setDatePickerVisible(true)}>
            {({isPressed}) => {
              return (
                <HStack
                  bg={isPressed ? colors.bgWhite : colors.white}
                  justifyContent={'center'}
                  alignItems={'center'}
                  my={5}
                  px={5}
                  py={3}
                  borderRadius={10}
                  borderWidth={1}
                  borderColor={colors.bgPrimary}>
                  <CustomIcon
                    name="calendarday"
                    size={20}
                    color={colors.secondary}
                    style={styles.chooseDateIcon}
                  />
                  <Text>Choose Date</Text>
                </HStack>
              );
            }}
          </Pressable>
          <VStack space={5} mx={1} mb={200}>
            {data.length < 1 ? (
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
              data.map((i, index) => {
                return (
                  <Card
                    key={index}
                    tanggal={getDate(new Date(i.tanggal))}
                    jam={convertTime(i.total_jam_terbuang)}
                    onPress={() =>
                      navigation.navigate('JamTerbuangDetail', {data: i})
                    }
                  />
                );
              })
            )}
          </VStack>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Landing;

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
