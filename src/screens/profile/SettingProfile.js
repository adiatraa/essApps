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
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import HomeSkeleton from '../../components/HomeSkeleton';
import {BASE_URL} from '../../../config';

export default function SettingProfile({navigation, route}) {
  const {logout, userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // Loading status

  const fetchMyAPI = async () => {
    setStatus('loading'); // Status loading true

    try {
      axios
        .get(BASE_URL + '/user-profile/' + userInfo.npp, {
          headers: {'x-access-token': userToken},
        }) // Get API dengan parameter NPP dengan keamanan x-access-token token
        .then(response => {
          setData(response.data.data); // Mengisi data dengan data dari response API
          setStatus('success'); // Status loading false
        })
        .catch(e => {
          // logout(); // Apabla terdapat error maka akan logout
        });
    } catch {}
  };
  useEffect(() => {
    fetchMyAPI();
  }, []);
  if (status === 'loading') {
    return <HomeSkeleton />; // Apabila status loading true maka akan menampilkan Skeleton
  }
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
            source={{
              uri: 'https://berita.99.co/wp-content/uploads/2022/06/foto-profil-keren.jpg',
            }}
            style={[
              styles.avatar,
              {
                width: 60,
                height: 60,
                borderRadius: 35,
                marginRight: -10,
                marginTop: 10,
              },
            ]}
            resizeMode="cover"
          />
          <View style={styles.profileText}>
            <Text style={styles.nameText}>{data.personil.nama_lengkap}</Text>
            <Text style={styles.titleText}>{data.personil.npp}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate('UserProfile', {data: data})}>
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
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    flex: 1,
    padding: 20,
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
    backgroundColor: '#FFF',
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
    width: '100%',
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
