import React, {useContext, useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image, Button, Text} from '@rneui/themed';
import {AuthContext} from '../../context/AuthContext';
import Toast from '../../components/Toast';
import axios from 'axios';
import {useToast} from 'native-base';
import HomeSkeleton from '../../components/HomeSkeleton';
import {BASE_URL} from '../../../config';

const ProfilePage = ({navigation, route}) => {
  const toast = useToast();
  const {data} = route.params;

  const showToast = () => {
    toast.show({
      render: () => {
        return (
          <Toast
            message={'Fitur masih dalam proses pengembangan!'}
            bgColor={colors.bgPrimary}
          />
        );
      },
      placement: 'top',
    });
  };
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#F5F7FB'} barStyle={'dark-content'} />
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileCard}>
          <ImageBackground
            source={require('../../assets/backgroundCard.png')}
            resizeMode={'cover'}
            borderRadius={20}
            style={styles.profileCardBody}>
            <Image
              source={{
                uri: 'https://berita.99.co/wp-content/uploads/2022/06/foto-profil-keren.jpg',
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 35,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                }}>
                {data.personil.nama_lengkap}
              </Text>
              <Text style={{fontSize: 12, fontFamily: fonts.poppins}}>
                {data.personil.npp}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          style={{width: 350, marginHorizontal: 30}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}>
            <View style={styles.menuContainerScroll}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 18,
                  marginLeft: 8,
                }}>
                Cuti Besar
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 20,
                  marginLeft: 72,
                  color: '#FFD60A',
                }}>
                {data.cuti_besar}
              </Text>
            </View>
            <View style={styles.menuContainerScroll}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 8,
                }}>
                Poin Tahun Penilaian 2022
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 32,
                  marginLeft: -165,
                  color: '#00B658',
                }}>
                {data.personil.poin}
              </Text>
            </View>
            <View style={styles.menuContainerScroll}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 8,
                }}>
                Pensiun
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 84,
                  color: '#9747FF',
                }}>
                {data.pensiun}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: fonts.poppins_b,
                  fontWeight: '700',
                  marginTop: 12,
                  marginLeft: 6,
                  color: '#AFAFAF',
                }}>
                Tahun
              </Text>
              <Progress.Bar
                progress={0.3}
                width={200}
                style={{
                  marginLeft: -195,
                  marginTop: 40,
                }}
                color={'#9747FF'}
              />
            </View>
            <View style={styles.menuContainerScroll}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 8,
                }}>
                Lama Masa Kerja
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 44,
                  color: '#18A0FB',
                }}>
                {data.lama_masa_kerja}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: fonts.poppins_b,
                  fontWeight: '700',
                  marginTop: 12,
                  marginLeft: 6,
                  color: '#AFAFAF',
                }}>
                Tahun
              </Text>
              <Progress.Bar
                progress={0.3}
                width={200}
                style={{
                  marginLeft: -195,
                  marginTop: 40,
                }}
                color={'#18A0FB'}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.cvWrapper}>
          <TouchableOpacity style={styles.cvMenu} onPress={showToast}>
            <Icon name="text-account" size={32} color="#FFC700" />
            <Text style={styles.menuText}>CV Internal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cvMenu}
            onPress={() => {
              navigation.navigate('CVScreen');
            }}>
            <Icon name="account-details-outline" size={32} color="#FFC700" />
            <Text style={styles.menuText}>CV Eksternal</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => {
            navigation.navigate('DetailProfile');
          }}>
          <View style={styles.menuIcon}>
            <Icon name="account-circle-outline" size={32} color="#FFC700" />
          </View>
          <View style={styles.menuBar}>
            <Text style={styles.menuText}>Profile</Text>
          </View>
          <View style={styles.menuIconRight}>
            <Icon name="chevron-right" size={32} color={colors.dark20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer} onPress={showToast}>
          <View style={styles.menuIcon}>
            <Icon name="school" size={32} color="#FFC700" />
          </View>
          <View style={styles.menuBar}>
            <Text style={styles.menuText}>Pendidikan</Text>
          </View>
          <View style={styles.menuIconRight}>
            <Icon name="chevron-right" size={32} color={colors.dark20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer} onPress={showToast}>
          <View style={styles.menuIcon}>
            <Icon name="briefcase-variant" size={32} color="#FFC700" />
          </View>
          <View style={styles.menuBar}>
            <Text style={styles.menuText}>Kepegawaian</Text>
          </View>
          <View style={styles.menuIconRight}>
            <Icon name="chevron-right" size={32} color={colors.dark20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer} onPress={showToast}>
          <View style={styles.menuIcon}>
            <Icon name="account-multiple-plus" size={32} color="#FFC700" />
          </View>
          <View style={styles.menuBar}>
            <Text style={styles.menuText}>Ketenagakerjaan</Text>
          </View>
          <View style={styles.menuIconRight}>
            <Icon name="chevron-right" size={32} color={colors.dark20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuContainer} onPress={showToast}>
          <View style={styles.menuIcon}>
            <Icon name="clipboard-outline" size={32} color="#FFC700" />
          </View>
          <View style={styles.menuBar}>
            <Text style={styles.menuText}>Kinerja</Text>
          </View>
          <View style={styles.menuIconRight}>
            <Icon name="chevron-right" size={32} color={colors.dark20} />
          </View>
        </TouchableOpacity>
        <View style={{marginBottom: 150}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  cvMenu: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#B6B6B6',
    borderRadius: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '48%',
  },
  cvWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#F5F7FB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
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
    marginBottom: 2,
    marginLeft: 32,
    marginRight: 10,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '85%',
  },
  menuContainerScroll: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderColor: colors.dark30,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    height: 80,
    marginBottom: 2,
    marginRight: 20,
    marginTop: 20,
    padding: 10,
    paddingHorizontal: 15,
    width: 240,
  },
  menuIcon: {
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  menuIconRight: {
    height: 30,
    justifyContent: 'flex-end',
    marginLeft: 35,
    width: 30,
  },
  menuText: {
    color: '#B6B6B6',
    fontWeight: 'regular',
  },
  profileCard: {
    height: 'auto',
    marginTop: 20,
    paddingHorizontal: 30,
    position: 'relative',
    width: '100%',
  },
  profileCardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  scrollView: {
    backgroundColor: '#F5F7FB',
    height: '100%',
    width: '100%',
  },
});
