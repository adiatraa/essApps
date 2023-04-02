import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../context/AuthContext';

export default function SettingProfile({navigation, route}) {
  const {logout, userToken, userInfo, newToken} = useContext(AuthContext);
  useEffect(() => {
    console.log(route);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <ImageBackground
            style={styles.leftContainer}
            resizeMode="contain"
            imageStyle={{
              alignSelf: 'flex-end',
              marginLeft: -60,
              marginTop: 70,
            }}
            source={require('../../assets/ellipse.png')}
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
            source={require('../../assets/group.png')}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/avatar.png')}
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
        onPress={() => navigation.navigate('UserProfile')}>
        <View style={styles.menuIcon}>
          <Ionicons name="md-person-circle-outline" size={32} color="#FFC700" />
        </View>
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>User Profile</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate('ChangePassScreen')}>
        <View style={styles.menuIcon}>
          <Ionicons name="md-key-outline" size={32} color="#FFC700" />
        </View>
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>Change Password</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuContainer} onPress={logout}>
        <View style={styles.menuIcon}>
          <Ionicons name="md-exit-outline" size={32} color="#FFC700" />
        </View>
        <View style={styles.menuBar}>
          <Text style={styles.menuText}>Logout</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 71,
    top: 5,
    width: 66,
  },

  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    // margin: 10,
    padding: 20,
  },
  imgBackground: {
    resizeMode: 'contain',
  },

  leftContainer: {
    backgroundColor: '#FFD60A',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    flexDirection: 'row',
    height: 120,
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
  },
  menuBar: {
    height: 30,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },

  menuContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'blue',
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
    width: '100%',
    // justifyContent: 'center',
  },

  menuIcon: {
    height: 30,
    justifyContent: 'center',
    width: 30,
  },

  menuText: {
    color: '#B6B6B6',
    fontWeight: 'bold',
  },

  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 30,
    position: 'absolute',
    top: 40,
  },

  profileIcon: {
    height: 100,
    justifyContent: 'center',
    width: 90,
  },
  profileText: {
    height: 90,
    justifyContent: 'center',
    marginLeft: 20,
    width: 200,
  },

  righttContainer: {
    backgroundColor: '#FFD60A',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    height: 120,
    marginBottom: 30,
    marginTop: 20,
    width: '100%',
  },

  titleText: {
    fontSize: 13,
  },
});
