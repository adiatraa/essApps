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

const Detail = ({route, navigation}) => {
  const {date, t} = route.params; // Get data parameter dari props

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.secondary} />
      <View>
        <View style={styles.header}>
          <Icon
            name="arrow-left"
            size={24}
            color={colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Detail Absensi</Text>
        </View>
        <View style={styles.headerDescription}>
          <Icon name="calendar-month-outline" size={22} color={colors.white} />
          <Text style={styles.headerDate}>{getDate(new Date(date))}</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {t.map((t, index) => {
            return t != null ? (
              <Timeline
                key={index}
                title={index % 2 !== 1 ? 'Clock In' : 'Clock Out'}
                description={t + ' WIB'}
                status={index % 2 !== 1 ? 'success' : 'danger'}
              />
            ) : (
              <></>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

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
  scrollView: {
    backgroundColor: colors.secondary,
    height: '100%',
    width: '100%',
  },
});
