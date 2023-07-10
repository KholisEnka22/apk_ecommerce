import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  Image,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Navigasi from '../assets/components/navigation';
import {useNavigation} from '@react-navigation/native';

function Produk(props) {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };
  const data = [
    {
      image: require('../assets/images/ayam-geprek.jpg'),
      title: 'Ayam Geprek',
      price: 'Rp. 10,000',
    },
    {
      image: require('../assets/images/ayam-geprek.jpg'),
      title: 'Ayam Geprek 2',
      price: 'Rp. 10,000',
    },
    {
      image: require('../assets/images/ayam-geprek.jpg'),
      title: 'Ayam Geprek 2',
      price: 'Rp. 10,000',
    },
    {
      image: require('../assets/images/ayam-geprek.jpg'),
      title: 'Ayam Geprek 2',
      price: 'Rp. 10,000',
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar animated />
      <View style={styles.rect2}>
        <View style={styles.icon4Row}>
          <IoniconsIcon
            name="chevron-back"
            style={styles.icon4}
            onPress={handleGoBack}></IoniconsIcon>
          <Text style={styles.produk}>Produk</Text>
          <IoniconsIcon name="cart-outline" style={styles.icon5}></IoniconsIcon>
        </View>
      </View>
      <View style={styles.placeholder1Row}>
        <TextInput
          placeholder="Search"
          returnKeyType="search"
          style={styles.placeholder1}></TextInput>
        <View style={styles.icon6Stack}>
          <FontAwesomeIcon name="search" style={styles.icon6}></FontAwesomeIcon>
          <View style={styles.rect3}>
            <FontAwesomeIcon
              name="search"
              style={styles.icon7}></FontAwesomeIcon>
          </View>
        </View>
      </View>
      <Text style={styles.semuaProduk}>Semua Produk</Text>
      <View style={styles.contentContaineritem}>
        {data.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <View style={styles.imageStack}>
              <Image
                source={item.image}
                resizeMode="contain"
                style={styles.imagecon}
              />
              <FontAwesomeIcon name="heart" style={styles.icon2} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
      <Navigasi style={styles.navigasi}></Navigasi>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242,238,238,1)',
  },
  rect2: {
    width: 395,
    height: 80,
    backgroundColor: 'rgba(86,153,79,1)',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  icon4: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  produk: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255,255,255,1)',
    marginTop: 7,
  },
  icon5: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  icon4Row: {
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    flex: 1,
    marginTop: 27,
  },
  placeholder1: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    height: 44,
    width: 277,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    paddingLeft: 15,
  },
  icon6: {
    top: 0,
    left: 11,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 30,
  },
  rect3: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 15,
  },
  icon7: {
    color: 'rgba(128,128,128,1)',
    fontSize: 25,
    height: 28,
    width: 28,
    marginTop: 7,
    marginLeft: 10,
  },
  icon6Stack: {
    width: 51,
    height: 44,
    marginLeft: 12,
  },
  placeholder1Row: {
    height: 44,
    flexDirection: 'row',
    marginTop: 26,
    justifyContent: 'space-evenly',
  },
  semuaProduk: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,1)',
    marginTop: 20,
    marginLeft: 31,
  },
  contentContaineritem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  textContainer: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 3,
  },
  price: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },
  itemContainer: {
    width: '43%', // Adjust the width as needed
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  imageStack: {
    position: 'relative',
  },
  imagecon: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  icon2: {
    top: 7,
    left: 130,
    position: 'absolute',
    color: 'rgba(65,117,5,1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  itemContainer: {
    width: '43%', // Adjust the width as needed
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  navigasi: {
    // marginTop: 394,
    position: 'absolute',
    bottom: 0,
  },
});

export default Produk;
