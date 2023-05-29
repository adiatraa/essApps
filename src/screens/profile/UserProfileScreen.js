import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {colors, fonts} from '../../components/Theme';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from '../../components/Toast';
import {
  Avatar,
  Box,
  HStack,
  Pressable,
  ScrollView,
  VStack,
  useToast,
  Text,
} from 'native-base';

const Navigation = ({onPress, icon, title}) => {
  return (
    <Pressable onPress={onPress}>
      {({isHovered, isPressed}) => {
        return (
          <HStack
            bg={
              isHovered
                ? colors.bgPrimary
                : isPressed
                ? colors.bgPrimary
                : colors.white
            }
            px={4}
            py={2}
            alignItems={'center'}
            space={3}
            borderRadius={10}>
            <Icon name={icon} size={32} color={colors.secondary} />
            <Text color={colors.dark20} fontWeight={'semibold'} pb={2} mt={2}>
              {title}
            </Text>
            <Box position={'absolute'} right={3}>
              <Icon name={'chevron-right'} size={20} />
            </Box>
          </HStack>
        );
      }}
    </Pressable>
  );
};

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
      <HStack alignItems={'center'} p={5} bg={colors.bgWhite}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>User Profile</Text>
      </HStack>
      <ScrollView bg={colors.bgWhite} px={7}>
        <Box mt={5}>
          <ImageBackground
            source={require('../../assets/backgroundCard.png')}
            resizeMode={'cover'}
            borderRadius={20}
            style={styles.profileCardBody}>
            <Avatar
              size={'lg'}
              bg={colors.primary}
              source={{
                uri: 'https://berita.99.co/wp-content/uploads/2022/06/foto-profil-keren.jpg',
              }}
            />
            <VStack ml={3}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fonts.poppins_b,
                  fontWeight: 'bold',
                }}>
                {data.nama_lengkap}
              </Text>
              <Text style={{fontSize: 12, fontFamily: fonts.poppins}}>
                {data.npp}
              </Text>
            </VStack>
          </ImageBackground>
        </Box>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast">
          <HStack space={3} alignItems={'center'} mt={5} mb={3}>
            <HStack
              justifyContent={'space-between'}
              alignItems={'center'}
              bg={colors.white}
              borderRadius={10}
              borderWidth={1}
              borderColor={colors.dark40}
              px={5}
              h={70}
              w={230}>
              <Text
                fontFamily={fonts.poppins_b}
                fontSize={18}
                fontWeight={'bold'}>
                Cuti Besar
              </Text>
              <Text
                fontFamily={fonts.poppins_b}
                fontSize={16}
                fontWeight={'bold'}
                color={'#FFD60A'}>
                {data.cuti_besar}
              </Text>
            </HStack>
            <VStack
              justifyContent={'center'}
              alignItems={'flex-start'}
              bg={colors.white}
              borderRadius={10}
              borderWidth={1}
              borderColor={colors.dark40}
              px={5}
              h={70}
              w={230}>
              <Text
                fontFamily={fonts.poppins_b}
                fontSize={14}
                fontWeight={'bold'}>
                Poin Tahun Penilaian 2022
              </Text>
              <Text
                fontFamily={fonts.poppins_b}
                fontSize={14}
                fontWeight={'bold'}
                color={'#00B658'}>
                2010
              </Text>
            </VStack>
            <VStack
              justifyContent={'center'}
              bg={colors.white}
              borderRadius={10}
              borderWidth={1}
              borderColor={colors.dark40}
              px={5}
              space={1}
              h={70}
              w={230}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text
                  fontFamily={fonts.poppins_b}
                  fontSize={14}
                  fontWeight={'bold'}>
                  Pensiun
                </Text>
                <HStack alignItems={'center'} space={1}>
                  <Text
                    fontFamily={fonts.poppins_b}
                    fontSize={12}
                    fontWeight={'bold'}
                    color={'#9747FF'}>
                    {data.pensiun}
                  </Text>
                  <Text
                    fontFamily={fonts.poppins_b}
                    fontSize={10}
                    fontWeight={'bold'}
                    color={colors.dark20}>
                    Tahun lagi
                  </Text>
                </HStack>
              </HStack>
              <Progress.Bar progress={0.3} width={200} color={'#9747FF'} />
            </VStack>
            <VStack
              justifyContent={'center'}
              bg={colors.white}
              borderRadius={10}
              borderWidth={1}
              borderColor={colors.dark40}
              px={5}
              space={1}
              h={70}
              w={230}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text
                  fontFamily={fonts.poppins_b}
                  fontSize={14}
                  fontWeight={'bold'}>
                  Lama Masa Kerja
                </Text>
                <HStack alignItems={'center'} space={1}>
                  <Text
                    fontFamily={fonts.poppins_b}
                    fontSize={12}
                    fontWeight={'bold'}
                    color={'#18A0FB'}>
                    {data.lama_masa_kerja}
                  </Text>
                  <Text
                    fontFamily={fonts.poppins_b}
                    fontSize={10}
                    fontWeight={'bold'}
                    color={colors.dark20}>
                    Tahun
                  </Text>
                </HStack>
              </HStack>
              <Progress.Bar progress={0.3} width={200} color={'#18A0FB'} />
            </VStack>
          </HStack>
        </ScrollView>
        <HStack justifyContent={'space-between'} alignItems={'center'} my={3}>
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
        </HStack>
        <VStack space={3} mt={3} mb={100}>
          <Navigation
            title={'Profile'}
            icon={'account-circle-outline'}
            onPress={() => {
              navigation.navigate('DetailProfile', {data: data});
            }}
          />
          <Navigation
            title={'Pendidikan'}
            icon={'school'}
            onPress={showToast}
          />
          <Navigation
            title={'Kepegawaian'}
            icon={'briefcase-variant'}
            onPress={showToast}
          />
          <Navigation
            title={'Ketenagakerjaan'}
            icon={'account-multiple-plus'}
            onPress={showToast}
          />
          <Navigation
            title={'Kinerja'}
            icon={'clipboard-outline'}
            onPress={showToast}
          />
        </VStack>
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
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  menuText: {
    color: '#B6B6B6',
    fontWeight: 'regular',
  },
  profileCardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
});
