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
        console.log('Token berhasil dimuat:', storedToken);
      }
    } catch (error) {
      console.log('Gagal memuat token:', error);
    }
  };

  const saveToken = async token => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token);
        setToken(token);
        console.log('Token berhasil disimpan:', token);
      } else {
        await AsyncStorage.removeItem('token');
        setToken(null);
        setUser(null);
        console.log('Token berhasil dihapus');
      }
    } catch (error) {
      console.log('Gagal menyimpan token:', error);
    }
  };

  // const login = async credentials => {
  //   try {
  //     const response = await axios.post(
  //       'http://gosmart.candibinangun.id/api/login',
  //       credentials,
  //     );

  //     const {data} = response;
  //     if (data && data.code === 200 && data.data && data.data.token) {
  //       const {token, ...userData} = data.data;
  //       saveToken(token);
  //       getProfile(token);
  //       AsyncStorage.setItem('user', JSON.stringify(userData))
  //         .then(() => {
  //           console.log('Data pengguna berhasil disimpan di penyimpanan lokal');
  //         })
  //         .catch(error => {
  //           console.log(
  //             'Gagal menyimpan data pengguna di penyimpanan lokal:',
  //             error,
  //           );
  //         });
  //       console.log('Login berhasil');
  //       console.log('Data pengguna:', userData);
  //       return 'Login Sukses';
  //     } else {
  //       console.log('Login gagal: Respon tidak valid');
  //       return 'Login Gagal';
  //     }
  //   } catch (error) {
  //     console.log('Terjadi kesalahan saat login:', error);
  //     return 'Login Gagal';
  //   }
  // };

  const login = async credentials => {
    try {
      const response = await axios.post(
        'http://gosmart.candibinangun.id/api/login',
        credentials,
      );

      const {data} = response;
      if (data && data.code === 200 && data.data && data.data.token) {
        const {token, ...userData} = data.data;
        saveToken(token);
        getProfile();
        AsyncStorage.setItem('user', JSON.stringify(data.data))
          .then(() => {
            console.log(
              'Data pengguna berhasil disimpan di penyimpanan lokal',
              data.data,
            );
          })
          .catch(error => {
            console.log(
              'Gagal menyimpan data pengguna di penyimpanan lokal:',
              error,
            );
          });
        console.log('Login berhasil');
        console.log('Data pengguna:', userData);
        return 'Login Sukses';
      } else {
        console.log('Login gagal: Respon tidak valid');
        return 'Login Gagal';
      }
    } catch (error) {
      console.log('Terjadi kesalahan saat login:', error);
      return 'Login Gagal';
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        'http://gosmart.candibinangun.id/api/logout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
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
                saveToken(null);
                setUser(null);
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        console.log('Terjadi kesalahan saat logout');
      }
    } catch (error) {
      console.log('Terjadi kesalahan saat logout:', error);
    }
  };

  const getProfile = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        const response = await axios.get(
          'http://gosmart.candibinangun.id/api/profile',
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          },
        );

        const {data} = response;
        if (data && data.code === 200 && data.data) {
          const userData = data.data;
          updateUser(userData);
          AsyncStorage.setItem('user', JSON.stringify(userData))
            .then(() => {
              console.log(
                'Data pengguna berhasil disimpan di penyimpanan lokal',
                userData,
              );
            })
            .catch(error => {
              console.log(
                'Gagal menyimpan data pengguna di penyimpanan lokal:',
                error,
              );
            });
          console.log('Data pengguna yang login:', userData);
        } else {
          console.log('Gagal mendapatkan profil pengguna');
        }
      } else {
        console.log('Token tidak ditemukan');
      }
    } catch (error) {
      console.log('Gagal mendapatkan profil pengguna:', error);
    }
  };

  // const updateUser = updatedUserData => {
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     ...updatedUserData,
  //   }));
  // };
  const updateUser = async updatedUserData => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const updatedUser = {
          ...parsedUser,
          ...updatedUserData,
        };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        console.log('Data pengguna berhasil diperbarui:', updatedUser);
      }
    } catch (error) {
      console.error(
        'Gagal mengupdate data pengguna di penyimpanan lokal:',
        error,
      );
    }
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        getProfile,
        updateUser,
        login,
        logout,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {AuthContext, AuthProvider, useAuth};
