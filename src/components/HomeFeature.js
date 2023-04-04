import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {colors, fonts} from './Theme';

const HomeFeature = ({navigation, icon, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.feature} onPress={onPress}>
      <Icon
        name={icon}
        size={20}
        color={colors.primary}
        style={styles.featureIcon}
      />
      <Text style={styles.featureTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HomeFeature;

const styles = StyleSheet.create({
  feature: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.dark60,
    borderRadius: 10,
    borderWidth: 1,
    color: colors.dark,
    display: 'flex',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    shadowColor: '#333',
    shadowOffset: {width: 2, height: 1},
    shadowRadius: 3,
    width: 150,
  },
  featureIcon: {marginLeft: -10, paddingRight: 10},
  featureTitle: {
    color: colors.dark,
    fontFamily: fonts.poppins_sb,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
