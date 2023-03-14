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

const AbsensiDetailScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.secondary} />
      <View>
        <View style={styles.header}>
          <Icon
            name="chevron-left-circle-outline"
            size={32}
            color={colors.white}
          />
          <Text style={styles.headerTitle}>Absensi</Text>
        </View>
        <View style={styles.headerDescription}>
          <Text style={styles.headerDate}>Senin, 24 Januari 2029</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.timeline}>
            <View style={styles.timelineStep} />
            <View style={styles.timelineCard}>
              <Text style={styles.timelineTitle} />
              <Text style={styles.timelineDescription} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AbsensiDetailScreen;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  headerTitle: {
    color: colors.white,
    fontFamily: fonts.poppins_m,
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
