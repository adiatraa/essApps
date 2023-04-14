import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileScreen({navigation, route}) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => {
          navigation.navigate('CVScreen');
        }}>
        <View style={{width: '50%'}}>
          <ImageBackground
            style={styles.leftContainer}
            resizeMode="contain"
            imageStyle={{
              alignSelf: 'flex-end',
              marginLeft: -60,
              marginTop: 70,
            }}
            source={require('../assets/ellipse.png')}
          />
        </View>
        <View style={{width: '50%'}}>
          <ImageBackground
            style={styles.righttContainer}
            resizeMode="contain"
            imageStyle={{
              alignSelf: 'flex-end',
              marginLeft: 40,
            }}
            source={require('../assets/group.png')}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/avatar.png')}
            fadeDuration={0}
            style={styles.avatar}
          />
          <View style={styles.profileText}>
            <Text style={styles.nameText}>Leslie Alexander</Text>
            <Text style={styles.titleText}>Back End Developer</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => {
          navigation.navigate('UserProfileScreen');
        }}>
        <View style={styles.menuIcon}>
          <Icon name="account-circle-outline" size={28} color="#FFD60A" />
        </View>
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>User Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => {
          navigation.navigate('ChangePassScreen');
        }}>
        <View style={styles.menuIcon}>
          <Icon name="key-outline" size={28} color="#FFD60A" />
        </View>
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>Change Password</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer}>
        <View style={styles.menuIcon}>
          <Icon name="logout" size={28} color="#FFD60A" />
        </View>
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>Logout</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    // margin: 10,
    padding: 20,
  },

  avatar: {
    height: 71,
    width: 66,
    top: 5,
  },
  profileContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    left: 30,
    top: 40,
    flexDirection: 'row',
  },

  leftContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFD60A',
    height: 120,
    width: '100%',
    marginBottom: 30,
  },
  righttContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFD60A',
    height: 120,
    width: '100%',
    marginBottom: 30,
  },

  profileIcon: {
    justifyContent: 'center',
    height: 100,
    width: 90,
  },

  imgBackground: {
    resizeMode: 'contain',
  },

  profileText: {
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
    height: 90,
  },

  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 13,
  },

  menuIcon: {
    justifyContent: 'center',
    height: 30,
    width: 30,
  },
  menuContainer: {
    backgroundColor: 'blue',
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 10,
    paddingHorizontal: 15,
    margin: 10,
    height: 50,
    // justifyContent: 'center',
  },

  menuBar: {
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
    height: 30,
  },

  menuText: {
    color: '#B6B6B6',
    fontWeight: 'bold',
  },
});
