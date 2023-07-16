import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';

function Alamat() {
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [provincesList, setProvincesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const {user, getProfile, updateUser} = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkmarkScale] = useState(new Animated.Value(0));
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userData => {
        if (userData) {
          console.log('data di local:', userData);
          const parsedUser = JSON.parse(userData);
          setFirstName(parsedUser.first_name || '');
          setLastName(parsedUser.last_name || '');
          setUsername(parsedUser.username || '');
          setPhone(parsedUser.phone || '');
          setAddress1(parsedUser.address1 || '');
          setAddress2(parsedUser.address2 || '');
          setProvince(parsedUser.province_id || '');
          setCity(parsedUser.city_id || '');
          setPostcode(parsedUser.postcode || '');
        }
      })
      .catch(error => {
        console.error(
          'Gagal mengambil data pengguna dari penyimpanan lokal:',
          error,
        );
      });
    getProfile();
  }, []);

  useEffect(() => {
    axios
      .get('https://api.rajaongkir.com/starter/province', {
        headers: {
          key: '5727bbd4c549aabdfc9add08504035a6',
        },
      })
      .then(response => {
        setProvincesList(response.data.rajaongkir.results);
      })
      .catch(error => {
        console.error('Gagal mengambil data provinsi:', error);
      });
  }, []);

  useEffect(() => {
    if (province) {
      axios
        .get(
          `https://api.rajaongkir.com/starter/city?province=${province}&key=5727bbd4c549aabdfc9add08504035a6`,
        )
        .then(response => {
          setCitiesList(response.data.rajaongkir.results);
        })
        .catch(error => {
          console.error('Gagal mengambil data kota:', error);
        });
    }
  }, [province]);

  useEffect(() => {
    if (user && user.data) {
      setFirstName(user.data.first_name || '');
      setLastName(user.data.last_name || '');
      setUsername(user.data.username || '');
      setPhone(user.data.phone || '');
      setAddress1(user.data.address1 || '');
      setAddress2(user.data.address2 || '');
      setProvince(user.data.province_id || '');
      setCity(user.data.city_id || '');
      setPostcode(user.data.postcode || '');
    }
  }, [user]);

  // const handleSaveAddress = () => {
  //   const updatedUser = {
  //     ...user.data,
  //     address1,
  //     address2,
  //     province_id: province,
  //     city_id: city,
  //     postcode,
  //     phone,
  //     username,
  //     first_name: firstName,
  //     last_name: lastName,
  //   };

  //   updateUser(updatedUser);

  //   ToastAndroid.show('Data berhasil disimpan.', ToastAndroid.SHORT);

  //   setTimeout(() => {
  //     navigation.navigate('Checkout');
  //   }, 1000);
  // };

  const handleSaveAddress = () => {
    setIsLoading(true);

    const updatedUser = {
      ...user.data,
      address1,
      address2,
      province_id: province,
      city_id: city,
      postcode,
      phone,
      username,
      first_name: firstName,
      last_name: lastName,
    };

    updateUser(updatedUser);

    setTimeout(() => {
      setIsLoading(false);
      setIsModalVisible(true);
      Animated.sequence([
        Animated.timing(checkmarkScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(checkmarkScale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsModalVisible(false);
        navigation.navigate('Checkout');
      });
    }, 1000);
  };

  const renderModal = () => {
    return (
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#56994F" />
            ) : (
              <>
                <Animated.View
                  style={[
                    styles.checkmarkContainer,
                    {transform: [{scale: checkmarkScale}]},
                  ]}>
                  {/* <FontAwesome name="check" size={50} color="#56994F" /> */}
                  <Icon
                    name="checkmark-circle-outline"
                    size={70}
                    color="#56994F"
                  />
                </Animated.View>
                <Text style={styles.modalText}>Data berhasil disimpan.</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Alamat</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Depan"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nama Belakang"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nomor Telepon"
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat 1"
        value={address1}
        onChangeText={text => setAddress1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat 2"
        value={address2}
        onChangeText={text => setAddress2(text)}
      />
      {provincesList.length > 0 && (
        <View style={styles.inputContainer}>
          <Picker
            style={styles.input}
            selectedValue={province || ''}
            onValueChange={itemValue => setProvince(itemValue)}>
            <Picker.Item label="Pilih Provinsi" value="" />
            {provincesList.map(province => (
              <Picker.Item
                key={province.province_id}
                label={province.province}
                value={province.province_id}
              />
            ))}
          </Picker>
        </View>
      )}
      {citiesList.length > 0 && (
        <View style={styles.inputContainer}>
          <Picker
            style={styles.input}
            selectedValue={city}
            onValueChange={itemValue => setCity(itemValue)}>
            <Picker.Item label="Pilih Kota" value="" />
            {citiesList.map(city => (
              <Picker.Item
                key={city.city_id}
                label={`${city.type} ${city.city_name}`}
                value={city.city_id}
              />
            ))}
          </Picker>
        </View>
      )}
      {provincesList.length === 0 && (
        <View style={styles.inputContainer}>
          <Text>Loading provinsi...</Text>
        </View>
      )}
      {citiesList.length === 0 && (
        <View style={styles.inputContainer}>
          <Text>Loading kota...</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Kode Pos"
        value={postcode}
        onChangeText={text => setPostcode(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 55,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#56994F',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 10,
  },
  checkmarkContainer: {
    marginBottom: 10,
  },
});

export default Alamat;
