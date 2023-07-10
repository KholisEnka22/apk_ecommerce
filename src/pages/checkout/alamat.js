import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../../context/AuthContext';

function Alamat() {
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [provincesList, setProvincesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const {username: loggedInUsername} = useContext(AuthContext);

  useEffect(() => {
    setUsername(loggedInUsername);
  }, [loggedInUsername]);

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
        console.error('Failed to fetch provinces:', error);
      });
  }, []);

  const handleProvinceChange = provinceId => {
    axios
      .get(
        `https://api.rajaongkir.com/starter/city?province=${provinceId}&key=5727bbd4c549aabdfc9add08504035a6`,
      )
      .then(response => {
        setCitiesList(response.data.rajaongkir.results);
      })
      .catch(error => {
        console.error('Failed to fetch cities:', error);
      });
  };

  const handleSaveAddress = () => {
    console.log('Data alamat:', {
      address,
      province,
      city,
      postcode,
      phone,
      username,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Alamat</Text>
      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <View style={styles.inputContainer}>
        <Picker
          style={styles.input}
          selectedValue={province}
          onValueChange={itemValue => {
            setProvince(itemValue);
            handleProvinceChange(itemValue);
          }}>
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
      <TextInput
        style={styles.input}
        placeholder="Kode Pos"
        value={postcode}
        onChangeText={text => setPostcode(text)}
        keyboardType="numeric"
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
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Simpan</Text>
      </TouchableOpacity>
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
});

export default Alamat;
