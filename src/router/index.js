import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Alamat,
  Cart,
  Checkout,
  Dashboard,
  DetailProduk,
  Login,
  Produk,
  Profile,
  ScrollableTabViewPager1,
  SplashScreen,
} from '../pages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Cek token pada AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Tampilkan loading screen jika masih memeriksa status login
  }
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Set the animation to 'slide_from_right'
        screenAnimationOptions: {
          slide_from_right: {
            // Set the properties for the slide_from_right animation
            slideFrom: 'right',
            fade: false,
          },
          slide_from_left: {
            slideFrom: 'left',
            fade: false,
          },
        },
      }}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Produk" component={Produk} />
      <Stack.Screen name="DetailProduk" component={DetailProduk} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="ScrollableTabViewPager1"
        component={ScrollableTabViewPager1}
      />
      <Stack.Screen name="Alamat" component={Alamat} />
    </Stack.Navigator>
  );
};

export default Router;
