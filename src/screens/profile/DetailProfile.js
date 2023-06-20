import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, fonts} from '../../components/Theme';
import {getAge, getDateWDay} from '../../components/Date';
import {
  ScrollView,
  HStack,
  FormControl,
  Input,
  Select,
  Box,
  Button,
  Avatar,
  VStack,
  useToast,
  Text,
  Skeleton,
} from 'native-base';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {BASE_URL} from '../../../config';
import {AuthContext} from '../../context/AuthContext';
import Toast from '../../components/Toast';

export default function DetailProfile({navigation}) {
  const toast = useToast();
  const {userToken, userInfo} = useContext(AuthContext);
  const [data, setData] = useState({});
  const isFocused = useIsFocused();
  const [namaL, setNamaL] = useState('');
  const [namaP, setNamaP] = useState('');
  const [hp, setHp] = useState('');
  const [email, setEmail] = useState('');
  const [agama, setAgama] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnLoading, SetIsBtnLoading] = useState(false);

  const handleSubmit = async () => {
    let newData = data;
    namaL ? (newData.nama_lengkap = namaL) : '';
    namaP ? (newData.nama_panggilan = namaP) : '';
    hp ? (newData.no_hp = hp) : '';
    email ? (newData.email = email) : '';
    agama ? (newData.agama = agama) : '';
    newData.updated_by = data.nama_lengkap;
    SetIsBtnLoading(true);

    axios
      .post(
        BASE_URL + '/update-profile',
        {
          data: newData,
        },
        {
          headers: {'x-access-token': userToken},
        },
      )
      .then(response => {
        response.data.message === 'successfully update user profile'
          ? toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Perubahan data berhasil disimpan.'}
                    bgColor={colors.success}
                    color={colors.white}
                  />
                );
              },
              placement: 'top',
            })
          : toast.show({
              render: () => {
                return (
                  <Toast
                    message={'Perubahan data gagal disimpan.'}
                    bgColor={colors.danger}
                    color={colors.white}
                  />
                );
              },
              placement: 'top',
            });
        SetIsBtnLoading(false);
      })
      .catch(e => {
        SetIsBtnLoading(false);
      });
  };

  const getDataProfile = async () => {
    axios
      .get(BASE_URL + '/user-profile?npp=' + userInfo?.npp, {
        headers: {'x-access-token': userToken},
      }) // Get API dengan parameter NPP dengan keamanan x-access-token token
      .then(response => {
        setData(response.data.data);
        setAgama(response.data.data.agama);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('error');
      });
  };

  useEffect(() => {
    getDataProfile();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={colors.bgWhite} barStyle={'dark-content'} />
      <HStack p={5} bg={colors.bgWhite}>
        <Icon
          name="arrow-left"
          size={24}
          color={colors.black}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Detail Profile</Text>
      </HStack>
      {isLoading ? (
        <VStack h={'100%'} px={5} bg={colors.bgWhite}>
          <Skeleton h="130" rounded={'2xl'} />
          <VStack space={5} my={5}>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
            <VStack space={2}>
              <Skeleton w={100} h={22} rounded={'md'} />
              <Skeleton h={34} rounded={'md'} />
            </VStack>
          </VStack>
        </VStack>
      ) : (
        <ScrollView px={5} bg={colors.bgWhite}>
          <Box>
            <ImageBackground
              source={require('../../assets/card.webp')}
              resizeMode={'cover'}
              borderRadius={20}
              style={styles.profileCardBody}>
              <Avatar
                size={'lg'}
                bg={colors.primary}
                source={{
                  uri: data.foto,
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
          <FormControl my={3}>
            <FormControl.Label>{'NPP'}</FormControl.Label>
            <Input
              type="text"
              keyboardType="phone-pad"
              style={styles.textInput}
              defaultValue={data.npp}
              isReadOnly
              variant={'unstyled'}
              mt={-1}
              ml={-3}
              mb={-5}
            />
          </FormControl>
          <FormControl my={3}>
            <FormControl.Label>{'NIK'}</FormControl.Label>
            <Input
              type="text"
              keyboardType="phone-pad"
              style={styles.textInput}
              defaultValue={data.no_ktp}
              isReadOnly
              variant={'unstyled'}
              mt={-1}
              ml={-3}
              mb={-5}
            />
          </FormControl>
          <FormControl my={3}>
            <FormControl.Label>{'NPWP'}</FormControl.Label>
            <Input
              type="text"
              keyboardType="phone-pad"
              style={styles.textInput}
              defaultValue={data.no_npwp}
              isReadOnly
              variant={'unstyled'}
              mt={-1}
              ml={-3}
              mb={-5}
            />
          </FormControl>
          <FormControl my={3}>
            <FormControl.Label>{'Nama Lengkap'}</FormControl.Label>
            <Input
              type="text"
              variant={'underlined'}
              style={styles.textInput}
              defaultValue={data.nama_lengkap}
              InputRightElement={
                <Icon
                  name="pencil-outline"
                  size={20}
                  color={colors.dark}
                  style={{opacity: 0.3}}
                />
              }
              onChangeText={text => setNamaL(text)}
            />
          </FormControl>
          <FormControl my={3}>
            <FormControl.Label>{'Nama Panggilan'}</FormControl.Label>
            <Input
              type="text"
              variant={'underlined'}
              style={styles.textInput}
              defaultValue={data.nama_panggilan}
              InputRightElement={
                <Icon
                  name="pencil-outline"
                  size={20}
                  color={colors.dark}
                  style={{opacity: 0.3}}
                />
              }
              onChangeText={text => setNamaP(text)}
            />
          </FormControl>
          <FormControl my={3}>
            <FormControl.Label>{'Email'}</FormControl.Label>
            <Input
              type="text"
              keyboardType="email-address"
              variant={'underlined'}
              style={styles.textInput}
              defaultValue={data.email}
              InputRightElement={
                <Icon
                  name="pencil-outline"
                  size={20}
                  color={colors.dark}
                  style={{opacity: 0.3}}
                />
              }
              onChangeText={text => setEmail(text)}
            />
          </FormControl>
          <FormControl my={3}>
            <FormControl.Label>{'Nomor HP'}</FormControl.Label>
            <Input
              type="text"
              keyboardType="phone-pad"
              variant={'underlined'}
              style={styles.textInput}
              defaultValue={data.no_hp}
              InputRightElement={
                <Icon
                  name="pencil-outline"
                  size={20}
                  color={colors.dark}
                  style={{opacity: 0.3}}
                />
              }
              onChangeText={text => setHp(text)}
            />
          </FormControl>
          <HStack my={3}>
            <FormControl w={'50%'}>
              <FormControl.Label>{'Tempat Lahir'}</FormControl.Label>
              <Input
                type="text"
                variant={'unstyled'}
                mt={-1}
                ml={-3}
                mb={-5}
                style={styles.textInput}
                defaultValue={data.tempat_lahir}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{'Tanggal Lahir'}</FormControl.Label>
              <Input
                type="text"
                variant={'unstyled'}
                mt={-1}
                ml={-3}
                mb={-5}
                style={styles.textInput}
                defaultValue={getDateWDay(new Date(data.tanggal_lahir))}
                isReadOnly
              />
            </FormControl>
          </HStack>
          <HStack my={3}>
            <FormControl w={'50%'}>
              <FormControl.Label>{'Umur'}</FormControl.Label>
              <Input
                type="text"
                keyboardType="phone-pad"
                variant={'underlined'}
                style={styles.textInput}
                defaultValue={getAge(data.tanggal_lahir) + ' Tahun'}
                isReadOnly
              />
            </FormControl>
            <FormControl w={'50%'}>
              <FormControl.Label>{'Agama'}</FormControl.Label>
              <Select
                variant="underlined"
                style={styles.textInput}
                selectedValue={agama}
                _selectedItem={{
                  bg: colors.bgPrimary,
                }}
                onValueChange={value => setAgama(value)}>
                <Select.Item label={'Islam'} value={'Islam'} />
                <Select.Item
                  label={'Kristen Protestan'}
                  value={'Kristen Protestan'}
                />
                <Select.Item label={'Katolik'} value={'Katolik'} />
                <Select.Item label={'Hindu'} value={'Hindu'} />
                <Select.Item label={'Buddha'} value={'Buddha'} />
                <Select.Item label={'Konghucu'} value={'Konghucu'} />
              </Select>
            </FormControl>
          </HStack>
          <HStack my={3}>
            <FormControl w={'50%'}>
              <FormControl.Label>{'Golongan Darah'}</FormControl.Label>
              <Input
                type="text"
                variant={'unstyled'}
                ml={-3}
                mb={-5}
                style={styles.textInput}
                defaultValue={data.golongan_darah}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>{'Jenis Kelamin'}</FormControl.Label>
              <Input
                type="text"
                variant={'unstyled'}
                mt={-1}
                ml={-3}
                mb={-5}
                style={styles.textInput}
                defaultValue={
                  data.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'
                }
                isReadOnly
              />
            </FormControl>
          </HStack>
          <FormControl my={3}>
            <FormControl.Label>{'Status Pernikahan'}</FormControl.Label>
            <Input
              type="text"
              variant={'unstyled'}
              mt={-1}
              ml={-3}
              style={styles.textInput}
              defaultValue={
                data.kode_status_pernikahan === 'TK0'
                  ? 'Belum Menikah'
                  : 'Sudah Menikah'
              }
              isReadOnly
            />
          </FormControl>
          <Button
            isLoading={isBtnLoading}
            bg={colors.primary}
            borderRadius={10}
            my={5}
            py={3}
            _pressed={{bg: colors.bgPrimary}}
            onPress={handleSubmit}>
            <Text style={styles.textInput}>Simpan</Text>
          </Button>
          <Box mb={100} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.poppins_b,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  profileCardBody: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  textInput: {color: colors.dark, fontSize: 16, fontWeight: 'bold'},
});
