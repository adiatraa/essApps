import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {Text} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../../components/Theme';
import {fonts} from '@rneui/base';

const Card = ({isActive, title, description, note}) => {
  return (
    <View
      style={[
        styles.card,
        {backgroundColor: isActive === true ? colors.primary : colors.white},
      ]}>
      <Icon
        name="calendar-check-outline"
        size={28}
        style={styles.cardIcon}
        color={colors.dark10}
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      <Text style={styles.cardNote}>{note}m ago</Text>
    </View>
  );
};

const NotificationScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.subTitle}>Hari Ini</Text>
          <Card
            isActive={true}
            title={'Attendance'}
            description={'Anda belum presensi Clock Out hari ini!'}
            note={2}
          />
          <Card
            title={'Attendance'}
            description={'Anda belum presensi Clock In hari ini!'}
            note={2}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>Minggu Ini</Text>
          <Card
            title={'Attendance'}
            description={'Anda belum presensi Clock Out hari ini!'}
            note={2}
          />
          <Card
            title={'Attendance'}
            description={'Anda belum presensi Clock In hari ini!'}
            note={2}
          />
          <Card
            title={'Attendance'}
            description={'Anda belum presensi Clock Out hari ini!'}
            note={2}
          />
          <Card
            title={'Attendance'}
            description={'Anda belum presensi Clock In hari ini!'}
            note={2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  cardBody: {width: '55%'},
  cardDesc: {color: colors.dark20, fontFamily: fonts.poppins, fontSize: 8},
  cardIcon: {
    backgroundColor: colors.bgWhite,
    borderRadius: 32,
    padding: 16,
  },
  cardNote: {
    color: colors.dark20,
    fontFamily: fonts.poppins,
    fontSize: 10,
  },
  cardTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 14,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  headerTitle: {
    bottom: 0,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    left: '50%',
    marginLeft: -20,
    position: 'absolute',
    textAlign: 'center',
    width: 100,
  },
  scrollView: {
    backgroundColor: colors.bgWhite,
    height: '100%',
    paddingHorizontal: 30,
    width: '100%',
  },
  subTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 40,
  },
});
