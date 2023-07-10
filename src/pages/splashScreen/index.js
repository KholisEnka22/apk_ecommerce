import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, Image, Animated} from 'react-native';

function Splashscreen({navigation}) {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000, // Durasi animasi 1 detik
      useNativeDriver: true,
    }).start(() => {
      // Navigasi ke halaman login setelah animasi selesai
      navigation.navigate('Login');
    });
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.Image
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
        style={[styles.image, {opacity}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Splashscreen;
