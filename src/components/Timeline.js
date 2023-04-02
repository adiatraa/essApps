import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {colors, fonts} from './Theme';

const Timeline = ({active, status, title, description}) => {
  return active ? (
    <View style={styles.timeline}>
      <View style={styles.timelineStep}>
        <Icon
          name={'record-circle'}
          size={24}
          color={colors.secondary}
          style={styles.timelineStepDot}
        />
        <View style={styles.timelineStepLine} />
      </View>
      <View style={styles.timelineCardActive}>
        <Text style={[styles.timelineTitle, styles.active]}>{title}</Text>
        <Text
          style={[
            styles.timelineDescription,
            {
              color:
                status === 'success'
                  ? colors.success
                  : status === 'danger'
                  ? colors.danger
                  : colors.white,
            },
          ]}>
          {description}
        </Text>
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
        <Text style={styles.timelineTitle}>{title}</Text>
        <Text
          style={[
            styles.timelineDescription,
            {
              color:
                status === 'success'
                  ? colors.success
                  : status === 'danger'
                  ? colors.danger
                  : colors.dark20,
            },
          ]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

Timeline.defaultProps = {
  onPress: () => {},
  title: 'Clock In',
  description: '19.20 WIB',
  status: false,
  active: false,
};

export default Timeline;

const styles = StyleSheet.create({
  active: {color: colors.white},
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
  timelineCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 3,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: colors.primary,
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
