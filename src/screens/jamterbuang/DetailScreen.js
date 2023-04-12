import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {Text} from '@rneui/themed';
import Timeline from '../../components/Timeline';
import {getDate} from '../../components/Date';

const DetailScreen = ({navigation, route}) => {
  const {data} = route.params; // Get data parameter dari props
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.secondary} />
      <View>
        <View style={styles.header}>
          <Icon
            name="chevron-left-circle-outline"
            size={48}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Detail Jam Terbuang</Text>
        </View>
        <View style={styles.headerDescription}>
          <Icon name="calendar-month-outline" size={22} color={colors.white} />
          <Text style={styles.headerDate}>
            {getDate(new Date(data.tanggal))}
          </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.bgWhite,
    borderTopLeftRadius: 80,
    marginBottom: 100,
    marginTop: 20,
    minHeight: 700,
    paddingHorizontal: 30,
    paddingVertical: 80,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
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
    paddingBottom: 50,
    paddingLeft: 80,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: fonts.poppins_b,
    fontSize: 18,
    marginBottom: -5,
    marginLeft: 10,
  },
  scrollView: {
    backgroundColor: colors.secondary,
    height: '100%',
    width: '100%',
  },
});
