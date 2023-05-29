import {StyleSheet, SafeAreaView, StatusBar, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {Text} from '@rneui/themed';
import Timeline from '../../components/Timeline';
import {getDate} from '../../components/Date';
import {ScrollView, Box, HStack, VStack} from 'native-base';

const DetailScreen = ({navigation, route}) => {
  const {data} = route.params; // Get data parameter dari props
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.secondary} />
      <Box>
        <HStack alignItems={'center'} px={5} pt={5} bg={colors.secondary}>
          <Icon
            name="arrow-left"
            size={24}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Detail Jam Terbuang</Text>
        </HStack>
        <Box style={styles.headerDescription}>
          <Icon name="calendar-month-outline" size={22} color={colors.white} />
          <Text style={styles.headerDate}>
            {getDate(new Date(data.tanggal))}
          </Text>
        </Box>
      </Box>
      <ScrollView bg={colors.secondary} minH={'100%'}>
        <VStack
          bg={colors.bgWhite}
          borderTopLeftRadius={80}
          px={7}
          py={16}
          mb={200}>
          <Timeline title={'Jam Telat'} description={data.jam_telat + ' Jam'} />
          <Timeline
            title={'Jam Pulang Cepat'}
            description={data.jam_pulang_cepat + ' Jam'}
          />
          <Timeline
            title={'Jam Keluar Kompleks'}
            description={data.jam_kk_tidak_kembali + ' Jam'}
          />
          <Timeline
            title={'Jam Tidak Ada Keterangan'}
            description={data.jam_tidak_ada_keterangan + ' Jam'}
          />
          <Timeline
            title={'Total Jam Terbuang'}
            description={data.total_jam_terbuang + ' Jam'}
            active={true}
          />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  headerDate: {
    color: colors.white,
    fontFamily: fonts.poppins,
    fontSize: 16,
    marginBottom: -5,
    marginLeft: 10,
  },
  headerDescription: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingBottom: 40,
    paddingLeft: 60,
    paddingTop: 10,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: fonts.poppins_b,
    fontSize: 18,
    marginBottom: -5,
    marginLeft: 20,
  },
});
