import React, {useContext, useState, useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, View, Touchable, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {colors, fonts} from '../components/Theme';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../context/AuthContext';
import Spinner from '../components/Spinner';
import {Button, Text} from '@rneui/base';
import {Image} from '@rneui/themed';
import axios from 'axios';

const ProfilePage = ({navigation}) => {
    return(
    <SafeAreaView>
        <StatusBar backgroundColor={'#F5F7FB'} barStyle={'dark-content'}/>
        <View style={styles.header}>
            <Icon name="arrow-left"
            size={24}
            color={colors.black}
            onPress={()=>navigation.navigate('')}/>
            <Text style={styles.headerTitle}>User Profile</Text>
        </View>
        <ScrollView style={styles.scrollView}>
            <View style={styles.profileCard}>
                <ImageBackground 
                source={require('../assets/backgroundCard.png')}
                resizeMode={'cover'}
                borderRadius={20}
                style={styles.profileCardBody}>
                <Image 
                source={{
                    uri: 'https://liputan7upcash.com/wp-content/uploads/2022/07/Freya-JKT48-agama.jpg',
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 35,
                    marginRight: 20,
                  }}
                  resizeMode="cover"
                />
                <View>
                    <Text style={{
                  fontSize: 16,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                }}>
                    Leslie Alexander
                    </Text>
                    <Text style={{fontSize: 12, fontFamily: fonts.poppins}}>
                        Backend Engineer
                    </Text>
                </View>
                </ImageBackground>
            </View>
            <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // scrollEventThrottle={200}
            decelerationRate="fast"
            style={{width:350, marginHorizontal:30}}>
                <View style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
            <View style={styles.menuContainerScroll}>
                <Text style={{
                  fontSize: 18,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 18,
                  marginLeft: 8,
                }}>Cuti Besar</Text>
                <Text style={{
                  fontSize: 16,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 20,
                  marginLeft: 72,
                  color: '#FFD60A',
                }}>2023</Text>
            </View>
            <View style={styles.menuContainerScroll}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 8,
                }}>Poin Tahun Penilaian 2022</Text>
                <Text style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 32,
                  marginLeft: -165,
                  color: '#00B658',
                }}>50 Poin</Text>
            </View>
            <View style={styles.menuContainerScroll}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 8,
                }}>Pensiun</Text>
                <Text style={{
                  fontSize: 12,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 84,
                  color: '#9747FF',
                }}>4</Text>
                <Text style={{
                  fontSize: 10,
                  fontFamily: fonts.poppins_b,
                  fontWeight: "700",
                  marginTop: 12,
                  marginLeft: 6,
                  color: '#AFAFAF',
                }}>Tahun lagi</Text>
                <Progress.Bar progress={0.3} width={200} style={{
                    marginLeft: -195,
                    marginTop: 40,
                }} color={'#9747FF'}/>
            </View>
            <View style={styles.menuContainerScroll}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 8,
                }}>Lama Masa Kerja</Text>
                <Text style={{
                  fontSize: 12,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginLeft: 44,
                  color: '#18A0FB',
                }}>5</Text>
                <Text style={{
                  fontSize: 10,
                  fontFamily: fonts.poppins_b,
                  fontWeight: "700",
                  marginTop: 12,
                  marginLeft: 6,
                  color: '#AFAFAF',
                }}>Tahun</Text>
                <Progress.Bar progress={0.3} width={200} style={{
                    marginLeft: -195,
                    marginTop: 40,
                }} color={'#18A0FB'}/>
            </View>
            </View>
            </ScrollView>
            <TouchableOpacity style={styles.menuContainerHalf}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="text-account" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>CV Internal</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainerHalf2}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="account-details-outline" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>CV Eksternal</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="account-circle-outline" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>Profile</Text>
                </View>
                <View style={styles.menuIconRight}>
                    <Icon name="chevron-right" size={32} color="#7A7A7A"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="school" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>Pendidikan</Text>
                </View>
                <View style={styles.menuIconRight}>
                    <Icon name="chevron-right" size={32} color="#7A7A7A"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="briefcase-variant" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>Kepegawaian</Text>
                </View>
                <View style={styles.menuIconRight}>
                    <Icon name="chevron-right" size={32} color="#7A7A7A"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="account-multiple-plus" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>Ketenagakerjaan</Text>
                </View>
                <View style={styles.menuIconRight}>
                    <Icon name="chevron-right" size={32} color="#7A7A7A"/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuContainer}
            onPress={()=>{navigation.navigate('')}}>
                <View style={styles.menuIcon}>
                    <Icon name="clipboard-outline" size={32} color="#FFC700"/>
                </View>
                <View style={styles.menuBar}>
                    <Text style={styles.menuText}>Kinerja</Text>
                </View>
                <View style={styles.menuIconRight}>
                    <Icon name="chevron-right" size={32} color="#7A7A7A"/>
                </View>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        backgroundColor: '#F5F7FB',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    headerTitle:{
        fontFamily: fonts.poppins_b,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    scrollView:{
        backgroundColor: '#F5F7FB',
        height: '100%',
        width: '100%',
    },
    profileCard:{
        height: 'auto',
        marginTop: 20,
        paddingHorizontal: 30,
        position: 'relative',
        width:'100%',
    },
    profileCardBody:{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 30,
        paddingVertical: 30,
    },
    menuContainer:{
        alignItems: 'flex-start',
        backgroundColor: 'blue',
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        height: 50,
        marginLeft: 32,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 15,
        width: '85%',
    },
    menuContainerScroll:{
        alignItems: 'flex-start',
        backgroundColor: 'blue',
        backgroundColor: '#FFF',
        borderRadius: 20,
        flexDirection: 'row',
        height: 80,
        marginRight: 10,
        marginLeft:10,
        marginBottom: 2,
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 15,
        width: 240,
        elevation: 5,
    },
    menuContainerHalf:{
        alignItems: 'flex-start',
        backgroundColor: 'blue',
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        height: 50,
        marginLeft: 32,
        marginRight: 10,
        marginBottom: 2,
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 15,
        width: '40%',
        borderColor: '#B6B6B6',
        borderWidth: 1,
    },
    menuContainerHalf2:{
        alignItems: 'flex-start',
        backgroundColor: 'blue',
        backgroundColor: '#FFF',
        borderRadius: 10,
        flexDirection: 'row',
        height: 50,
        marginLeft: 210,
        marginRight: 10,
        marginBottom: 2,
        marginTop: -52,
        padding: 10,
        paddingHorizontal: 15,
        width: '41%',
        borderColor: '#B6B6B6',
        borderWidth: 1,
    },
    menuIcon:{
        justifyContent: 'center',
        height: 30,
        width: 30,
    },
    menuIconRight:{
        justifyContent: 'flex-end',
        marginLeft: 35,
        height: 30,
        width: 30,
    },
    menuBar:{
        justifyContent: 'center',
        marginLeft: 20,
        width: 200,
        height: 30,
    },
    menuText:{
        color: '#B6B6B6',
        fontWeight: 'regular',
    },
});
