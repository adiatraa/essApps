import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Dialog} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from './Theme';

const Danger = ({visible}) => {
  return (
    <Dialog isVisible={visible} overlayStyle={styles.alert}>
      <Icon
        name="check-circle-outline"
        color={colors.danger}
        size={72}
        style={styles.alertIcon}
      />
      <Text style={styles.alertTitle}>PRESENSI BERHASIL!</Text>
      <Text style={styles.alertDescription}>
        Semangat & selalu berikan pelayanan terbaik untuk kita semua
      </Text>
    </Dialog>
  );
};

const Alert = {
  Danger,
};

export default Alert;

const styles = StyleSheet.create({
  alert: {
    alignItems: 'center',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  alertDescription: {
    color: colors.dark20,
    fontFamily: fonts.poppins,
    fontSize: 10,
    textAlign: 'center',
  },
  alertIcon: {
    marginBottom: 10,
  },
  alertTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_b,
    fontSize: 14,
    textAlign: 'center',
  },
});
