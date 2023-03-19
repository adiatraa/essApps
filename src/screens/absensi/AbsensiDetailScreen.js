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

const AbsensiDetailScreen = ({navigation}) => {
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
          <Text style={styles.headerTitle}>Absensi</Text>
        </View>
        <View style={styles.headerDescription}>
          <Icon name="calendar-month-outline" size={22} color={colors.white} />
          <Text style={styles.headerDate}>Senin, 24 Januari 2029</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Timeline status={'success'} />
          <Timeline status={'danger'} />
          <Timeline />
          <Timeline />
          <Timeline />
          <Timeline />
          <Timeline />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AbsensiDetailScreen;

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
