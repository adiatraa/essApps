import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {colors, fonts} from './Theme';

const Timeline = ({active, status}) => {
  return active ? (
    <View style={styles.timeline}>
      <View style={styles.timelineStep} />
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle} />
        <Text style={styles.timelineDescription} />
      </View>
    </View>
  ) : (
    <View style={styles.timeline}>
      <View style={styles.timelineStep}>
        <Icon
          name={'record-circle-outline'}
          size={24}
          color={colors.secondary}
          style={styles.timelineStepDot}
        />
        <View style={styles.timelineStepLine} />
      </View>
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Clock In</Text>
        <Text
          style={[
            styles.timelineDescription,
            {
              color:
                status === 'success'
                  ? colors.success
                  : status === 'danger'
                  ? colors.danger
                  : colors.dark10,
            },
          ]}>
          19.20 WIB
        </Text>
      </View>
    </View>
  );
};

export default Timeline;

const styles = StyleSheet.create({
  timeline: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 3,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowRadius: 50,
    width: 280,
  },
  timelineDescription: {
    fontFamily: fonts.poppins,
    fontSize: 16,
    marginBottom: -5,
  },
  timelineStep: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  timelineStepLine: {
    borderRightColor: colors.dark30,
    borderRightWidth: 1,
    borderStyle: 'dashed',
    height: 70,
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  timelineTitle: {
    fontFamily: fonts.poppins_sb,
    fontSize: 14,
  },
});
