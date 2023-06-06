import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './Theme';
import {Text} from 'native-base';

const ForgotPasswordProgress = ({status}) => {
  return (
    <View>
      <View style={styles.progressLineWrapper}>
        <View
          style={
            status !== 'send' ? styles.progressLineActive : styles.progressLine
          }
        />
        <View
          style={
            status === 'change'
              ? styles.progressLineActive
              : styles.progressLine
          }
        />
      </View>
      <View style={styles.progress}>
        <View style={styles.progressDetail}>
          <View style={styles.progressIconActive}>
            <Icon name="email" color={colors.black} size={16} />
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: status === 'send' ? colors.black : colors.dark,
            }}>
            Email Address
          </Text>
        </View>
        <View style={styles.progressDetail}>
          <View
            style={
              status !== 'send'
                ? styles.progressIconActive
                : styles.progressIcon
            }>
            <Icon name="email-newsletter" color={colors.black} size={16} />
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: status === 'verify' ? colors.black : colors.dark,
            }}>
            Get OTP Code
          </Text>
        </View>
        <View style={styles.progressDetail}>
          <View
            style={
              status === 'change'
                ? styles.progressIconActive
                : styles.progressIcon
            }>
            <Icon name="key-change" color={colors.black} size={16} />
          </View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: status === 'change' ? colors.black : colors.dark,
            }}>
            Create New
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordProgress;

const styles = StyleSheet.create({
  progress: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  progressDetail: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 10,
  },
  progressIcon: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.dark40,
    borderRadius: 20,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10,
  },
  progressIconActive: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 20,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10,
  },
  progressLine: {
    backgroundColor: colors.dark30,
    height: 1,
    width: 100,
  },
  progressLineActive: {
    backgroundColor: colors.primary,
    height: 1,
    width: 100,
  },
  progressLineWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    left: '50%',
    marginLeft: -100,
    position: 'absolute',
    top: 50,
  },
});
