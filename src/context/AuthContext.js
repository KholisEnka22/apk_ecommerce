import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        getProfile(storedToken);
      }
    } catch (error) {
      console.log('Failed to load token:', error);
    }
  };

  const saveToken = async token => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token);
        setToken(token);
        getProfile();
        console.log('Token saved:', token);
      } else {
        await AsyncStorage.removeItem('token');
        setToken(null);
        setUser(null);
        console.log('Token removed');
      }
    } catch (error) {
      console.log('Failed to save token:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'http://gosmart.candibinangun.id/api/login',
        {
          email,
          password,
        },
      );

      const {token} = response.data.data;
      if (token) {
        saveToken(token);
        getProfile(); // Memanggil getProfile setelah login berhasil
        console.log('Login berhasil');
        return 'Login Sukses';
      } else {
        console.log('Login gagal: Token tidak valid');
        return 'Login Gagal';
      }
    } catch (error) {
      console.log('Login error:', error);
      return 'Login Gagal';
    }
  };

  const logout = async () => {
    try {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin keluar?',
        [
          {
            text: 'Batal',
            style: 'cancel',
          },
          {
            text: 'Keluar',
            onPress: async () => {
              await axios.get('http://gosmart.candibinangun.id/api/logout', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              setUser(null);
              saveToken(null);
              navigation.navigate('Login'); // Redirect ke halaman login setelah logout sukses
            },
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        'http://gosmart.candibinangun.id/api/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const userProfile = response.data;
      console.log(response.data);
      setUser(userProfile);
    } catch (error) {
      console.log('Failed to get user profile:', error);
    }
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider value={{user, token, login, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {AuthContext, AuthProvider, useAuth};
