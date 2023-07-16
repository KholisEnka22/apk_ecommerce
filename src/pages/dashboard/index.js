import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Navigasi from '../assets/components/navigation';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Dashboard(props) {
  const {token} = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://gosmart.candibinangun.id/api/product',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProducts(response.data.data);
      console.log(response.data.data);
      console.log('Gatau:', token);
    } catch (error) {
      console.log('Failed to fetch products:', error);
    }
  };

  const idr = amount => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(amount);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.iconRow}>
            <IoniconsIcon
              name="cart-outline"
              style={styles.icon}></IoniconsIcon>
            <Text style={styles.textDashboard}>DASHBOARD</Text>
          </View>
          <View style={styles.searchRow}>
            <TextInput
              placeholder="Search"
              returnKeyType="search"
              style={styles.searchForm}></TextInput>
            <View style={styles.rect11}>
              <FontAwesomeIcon
                name="search"
                style={styles.iconSearch}></FontAwesomeIcon>
            </View>
          </View>
        </View>
        <Image
          source={require('../assets/images/card_informasi.png')}
          resizeMode="contain"
          style={styles.image}></Image>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.kategori}>Kategori</Text>
        <View style={styles.rect3Row}>
          <View style={styles.rect3}>
            <Image
              source={require('../assets/images/makanan.png')}
              resizeMode="contain"
              style={styles.image2}></Image>
          </View>
          <View style={styles.rect4}>
            <Image
              source={require('../assets/images/minuman.png')}
              resizeMode="contain"
              style={styles.image3}></Image>
          </View>
          <View style={styles.rect5}>
            <Image
              source={require('../assets/images/kerajinan.png')}
              resizeMode="contain"
              style={styles.image4}></Image>
          </View>
        </View>
        <View style={styles.makananRow}>
          <Text style={styles.makanan}>Makanan</Text>
          <Text style={styles.minuman}>Minuman</Text>
          <Text style={styles.kerajinan}>Kerajinan</Text>
        </View>
        <View style={styles.produkTerbaruRow}>
          <Text style={styles.produkTerbaru}>Produk Terbaru</Text>
          <Text style={styles.detail}>Detail</Text>
          <IoniconsIcon
            name="chevron-forward-outline"
            style={styles.icon1}
            onPress={() => props.navigation.navigate('Produk')}></IoniconsIcon>
        </View>
        <View style={styles.contentContaineritem}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((item, index) => (
              <View style={styles.itemContainer} key={index}>
                <View style={styles.imageStack}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('DetailProduk', {
                        slug: item.slug,
                      })
                    }>
                    <Image
                      source={{uri: item.image}}
                      resizeMode="cover"
                      style={styles.imagecon}
                    />
                    <IoniconsIcon
                      name="heart"
                      style={styles.icon2}></IoniconsIcon>
                  </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.price}>{idr(item.price)}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text>Tidak ada produk yang ditemukan</Text>
          )}
        </View>
      </ScrollView>
      <Navigasi />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(230, 230, 230,1)',
  },
  rect: {
    top: 0,
    width: 395,
    height: 322,
    alignContent: 'center',
    backgroundColor: 'rgba(86,153,79,1)',
    left: 0,
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  textDashboard: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255,255,255,1)',
    fontSize: 15,
    marginLeft: 95,
    marginTop: 6,
  },
  iconRow: {
    height: 33,
    flexDirection: 'row',
    marginTop: 27,
    marginLeft: 31,
    marginRight: 154,
  },
  searchForm: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    height: 44,
    width: 277,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
    paddingLeft: 15,
  },
  rect11: {
    width: 44,
    height: 44,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
  },
  iconSearch: {
    color: 'rgba(128,128,128,1)',
    fontSize: 28,
    height: 30,
    width: 30,
    marginTop: 7,
    marginLeft: 9,
  },
  searchRow: {
    height: 44,
    flexDirection: 'row',
    marginTop: 26,
    justifyContent: 'space-evenly',
  },
  image: {
    top: 147,
    width: 358,
    height: 214,
    position: 'absolute',
    alignSelf: 'center',
  },
  rectStack: {
    width: 390,
    height: 361,
  },
  rect2: {
    width: 45,
    height: 11,
    backgroundColor: 'rgba(86,153,79,1)',
    borderRadius: 10,
  },
  rect2Row: {
    height: 11,
    flexDirection: 'row',
    marginTop: 16,
    marginLeft: 22,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  imageStack: {
    position: 'relative',
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
  imagecon: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  itemContainer: {
    width: '43%', // Adjust the width as needed
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  contentContaineritem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  kategori: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginTop: 16,
    marginLeft: 17,
    marginBottom: 8,
  },
  rect3: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(233,199,199,1)',
    borderRadius: 10,
  },
  image2: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 9,
  },
  rect4: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(233,199,199,1)',
    borderRadius: 10,
    marginLeft: 59,
  },
  image3: {
    width: 50,
    height: 50,
    marginTop: 10,
    alignSelf: 'center',
  },
  rect5: {
    width: 70,
    height: 70,
    backgroundColor: 'rgba(233,199,199,1)',
    borderRadius: 10,
    marginLeft: 63,
  },
  image4: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 10,
  },
  rect3Row: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  makanan: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,1)',
    width: 68,
    height: 21,
  },
  minuman: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,1)',
    width: 68,
    height: 21,
    marginLeft: 61,
  },
  kerajinan: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,1)',
    width: 68,
    height: 21,
    marginLeft: 64,
  },
  makananRow: {
    height: 21,
    flexDirection: 'row',
    marginTop: 1,
    marginLeft: 35,
  },
  produkTerbaru: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,1)',
    width: 114,
    height: 21,
    marginTop: 2,
  },
  detail: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,1)',
    width: 43,
    height: 21,
    marginLeft: 163,
    marginTop: 2,
  },
  icon1: {
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
  },
  produkTerbaruRow: {
    height: 23,
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 28,
    marginRight: 30,
  },
  icon2: {
    top: 7,
    left: 130,
    position: 'absolute',
    color: '#fff',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  icon3: {
    top: 4,
    left: 118,
    position: 'absolute',
    color: 'rgba(65,117,5,1)',
    fontSize: 15,
  },
  image7: {
    top: 6,
    left: 0,
    width: 132,
    height: 75,
    position: 'absolute',
  },
  image7Stack: {
    width: 132,
    height: 81,
    marginTop: 4,
    marginLeft: 3,
  },
});

export default Dashboard;
