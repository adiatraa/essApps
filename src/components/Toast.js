import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Dialog} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './Theme';

const Toast = () => {
  return (
    <Dialog
      isVisible={false}
      overlayStyle={styles.toast}
      animationType={'fade'}>
      <Icon name="alert-circle-outline" color={colors.success} size={48} />
      <Text>Anda berada di luar jangkauan!</Text>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  toast: {
    alignItems: 'center',
    backgroundColor: colors.bgSuccess,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Toast;
