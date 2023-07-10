import React, {useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

function Login(props) {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const setLogin = await login(email, password);
      console.log(setLogin);
      if (setLogin == 'Login Sukses') {
        navigation.navigate('Dashboard');
      } else {
        Alert.alert('GAGAL LOGIN', 'Email atau Password Salah');
      }
      // Navigasi ke halaman lain setelah login berhasil
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <Image
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
        style={styles.image}></Image>
      <Text style={styles.masukDahulu}>Login dahulu untuk melanjutkan</Text>
      <TextInput
        style={styles.formeMail}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        keyboardType="default"
        secureTextEntry={true}
        style={styles.formpassword}
        onChangeText={text => setPassword(text)}></TextInput>
      <Text style={styles.lupaPassword}>Lupa Password ?</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.login}>Login</Text>
      </TouchableOpacity>
      <View style={styles.tidakPunyaAkunRow}>
        <Text style={styles.tidakPunyaAkun}>Tidak punya akun?</Text>
        <Text style={styles.daftar}>Daftar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(0,0,0,1)',
    alignSelf: 'center',
    fontSize: 17,
    marginTop: 53,
  },
  image: {
    width: 103,
    height: 103,
    marginTop: 54,
    alignSelf: 'center',
  },
  masukDahulu: {
    fontFamily: 'Poppins-SemiBold',
    color: '#121212',
    fontSize: 16,
    marginTop: 80,
    marginLeft: 37,
  },
  formeMail: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    height: 53,
    width: 329,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 10,
    marginTop: 20,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  formpassword: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    height: 53,
    width: 329,
    backgroundColor: 'rgba(230, 230, 230,1)',
    borderRadius: 10,
    marginTop: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  lupaPassword: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(90,179,82,1)',
    marginTop: 13,
    marginLeft: 248,
  },
  button: {
    width: 320,
    height: 56,
    backgroundColor: 'rgba(87,159,80,1)',
    borderRadius: 10,
    marginTop: 77,
    alignSelf: 'center',
  },
  login: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(255,255,255,1)',
    width: 40,
    height: 21,
    marginTop: 17,
    alignSelf: 'center',
  },
  tidakPunyaAkun: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    marginLeft: 20,
  },
  daftar: {
    fontFamily: 'Poppins-Regular',
    color: 'rgba(90,179,82,1)',
    marginLeft: 4,
  },
  tidakPunyaAkunRow: {
    height: 21,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 93,
    marginRight: 100,
  },
});

export default Login;
