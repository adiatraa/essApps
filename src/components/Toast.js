import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from './Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Toast = ({bgColor, message, icon, color}) => {
  return (
    <View style={[styles.toast, {backgroundColor: bgColor}]}>
      <Icon
        name={icon}
        size={16}
        color={color}
        style={{marginLeft: -5, paddingRight: 10}}
      />
      <Text style={{color: color}}>{message}</Text>
    </View>
  );
};

Toast.defaultProps = {
  color: colors.dark10,
  bgColor: colors.white,
  message: 'This is toast!',
  icon: 'alert-outline',
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    alignItems: 'center',
    borderColor: colors.dark50,
    borderRadius: 5,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
