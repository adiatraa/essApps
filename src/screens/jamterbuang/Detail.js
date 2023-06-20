import {StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import Timeline from '../../components/Timeline';
import {convertTime, getDate} from '../../components/Date';
import {ScrollView, Box, Text, HStack, VStack} from 'native-base';

const Detail = ({navigation, route}) => {
  const {data} = route.params; // Get data parameter dari props
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.secondary} />
      <Box>
        <HStack
          bg={colors.secondary}
          px={5}
          pt={7}
          space={1}
          alignItems={'center'}>
          <HStack
            bg={colors.bgPrimary}
            p={3}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={30}>
            <Icon
              name="chevron-left"
              size={28}
              color={colors.white}
              onPress={() => navigation.goBack()}
            />
          </HStack>
          <Text style={styles.headerTitle}>Detail Jam Terbuang</Text>
        </HStack>
        <HStack bg={colors.secondary} pl={24} pt={1} pb={7}>
          <Icon name="calendar-month-outline" size={22} color={colors.white} />
          <Text style={styles.headerDate}>
            {getDate(new Date(data.tanggal))}
          </Text>
        </HStack>
      </Box>
      <ScrollView bg={colors.secondary} minH={'100%'}>
        <VStack
          bg={colors.bgWhite}
          borderTopLeftRadius={80}
          px={7}
          pt={16}
          pb={300}>
          <Timeline
            title={'Jam Telat'}
            description={convertTime(data.jam_telat)}
          />
          <Timeline
            title={'Jam Pulang Cepat'}
            description={convertTime(data.jam_pulang_cepat)}
          />
          <Timeline
            title={'Jam Keluar Kompleks'}
            description={convertTime(data.jam_kk_tidak_kembali)}
          />
          <Timeline
            title={'Jam Tidak Ada Keterangan'}
            description={convertTime(data.jam_tidak_ada_keterangan)}
          />
          <Timeline
            title={'Total Jam Terbuang'}
            description={convertTime(data.total_jam_terbuang)}
            active={true}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  headerDate: {
    color: colors.white,
    fontFamily: fonts.poppins,
    fontSize: 16,
    marginBottom: -5,
    marginLeft: 10,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: fonts.poppins_b,
    fontSize: 18,
    marginBottom: -5,
    marginLeft: 20,
  },
});
