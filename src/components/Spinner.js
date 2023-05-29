// src/components/Spinner.js

import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from './Theme';

const Spinner = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.bgWhite,
    flex: 1,
    justifyContent: 'center',
  },
});

export default Spinner;
