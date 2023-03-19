import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {Skeleton} from '@rneui/themed';

const HomeSkeleton = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
          paddingVertical: 50,
        }}>
        <Skeleton circle animation="wave" width={'90%'} height={40} />
        <Skeleton animation="wave" width={'90%'} height={40} />
        <Skeleton animation="wave" width={'90%'} height={40} />
        <Skeleton circle animation="wave" width={'90%'} height={40} />
        <Skeleton circle animation="wave" width={'90%'} height={40} />
        <Skeleton animation="wave" width={'90%'} height={40} />
        <Skeleton animation="wave" width={'90%'} height={40} />
        <Skeleton circle animation="wave" width={'90%'} height={40} />
        <Skeleton animation="wave" width={'90%'} height={40} />
        <Skeleton animation="wave" width={'90%'} height={40} />
      </View>
    </SafeAreaView>
  );
};

export default HomeSkeleton;
