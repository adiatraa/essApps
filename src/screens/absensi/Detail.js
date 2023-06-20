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
import {Box, HStack, VStack} from 'native-base';

const Detail = ({route, navigation}) => {
  const {date, t} = route.params; // Get data parameter dari props

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
          <Text style={styles.headerTitle}>Detail Absensi</Text>
        </HStack>
        <HStack bg={colors.secondary} pl={24} pt={1} pb={7}>
          <Icon name="calendar-month-outline" size={22} color={colors.white} />
          <Text style={styles.headerDate}>{getDate(new Date(date))}</Text>
        </HStack>
      </Box>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {t.map((t, index) => {
            return t != null ? (
              <Timeline
                key={index + index}
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
    minHeight: 900,
    paddingHorizontal: 30,
    paddingVertical: 80,
    width: '100%',
  },
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
  scrollView: {
    backgroundColor: colors.secondary,
    height: '100%',
    width: '100%',
  },
});
