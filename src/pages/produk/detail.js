import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DetailProduk(props) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [count, setCount] = useState(0);

  const handleAdd = () => {
    if (count < product.quantity) {
      setCount(count + 1);
    }
  };

  const handleRemove = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const [product, setProduct] = useState(null);
  const {token} = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://gosmart.candibinangun.id/api/product/${props.route.params?.slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setProduct(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (qty, product) => {
    console.log('Jumlah qty yang dipilih:', qty);
    console.log('Data produk:', product);
    // console.log('Gambar produk:', product.image);
    if (qty > 0) {
      setSuccessMessage('Produk berhasil ditambahkan ke keranjang');
      setShowSuccessPopup(true);

      // Menyiapkan data permintaan
      const requestData = {
        slug: product.slug,
        qty: qty,
      };

      try {
        const response = await axios.post(
          'http://gosmart.candibinangun.id/api/cart',
          requestData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('halo', response.data);

        // Memperbarui AsyncStorage dengan data keranjang baru
        await AsyncStorage.setItem('cartData', JSON.stringify(response.data));
        console.log('Data berhasil disimpan ke api/cart:', response.data);

        // Navigasi ke halaman "Cart" dengan mengirimkan data keranjang baru
        navigation.navigate('Cart', {cartData: response.data});
      } catch (error) {
        console.error('Gagal menambahkan produk ke keranjang:', error);
        setErrorMessage('Gagal menambahkan produk ke keranjang');
        setShowErrorPopup(true);
      }
    } else {
      setErrorMessage('Gagal menambahkan produk ke keranjang');
      setShowErrorPopup(true);
    }
  };

  const hidePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IoniconsIcon
            name="chevron-back"
            style={styles.icon1}
            onPress={handleGoBack}
          />
          <Text style={styles.detailProduk}>Detail Produk</Text>
          <IoniconsIcon name="cart-outline" style={styles.icon2}></IoniconsIcon>
        </View>
        <ActivityIndicator
          size="large"
          color="#56984f"
          style={styles.loadingIndicator}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IoniconsIcon
          name="chevron-back"
          style={styles.icon1}
          onPress={handleGoBack}
        />
        <Text style={styles.detailProduk}>Detail Produk</Text>
        <IoniconsIcon name="cart-outline" style={styles.icon2}></IoniconsIcon>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.image}}
          resizeMode="contain"
          style={styles.image1}
        />
      </View>
      <Text style={styles.category}>Makanan</Text>
      <View style={styles.productInfo}>
        <View style={styles.productInfoColumn}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>Rp. {product.price}</Text>
        </View>
        <View style={styles.productRatingContainer}>
          <Text style={styles.productRating}>4.6</Text>
          <IoniconsIcon name="md-star" style={styles.icon3} />
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.descriptionTitle}>Deskripsi Produk</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.cartContainer}>
        <TouchableOpacity onPress={handleRemove}>
          <IoniconsIcon name="remove" style={styles.icon4} />
        </TouchableOpacity>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantity}>{count}</Text>
        </View>
        <TouchableOpacity onPress={handleAdd}>
          <IoniconsIcon name="add" style={styles.icon5} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButtonContainer}
          onPress={() => addToCart(count, product)}>
          <Text style={styles.buyButton}>Beli</Text>
        </TouchableOpacity>
      </View>
      {/* Popup Sukses Menyimpan ke Keranjang */}
      {showSuccessPopup && (
        <Modal
          animationType="fade"
          transparent
          visible={showSuccessPopup}
          onRequestClose={hidePopup}>
          <TouchableWithoutFeedback onPress={hidePopup}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <IoniconsIcon
                  name="checkmark-circle-outline"
                  style={styles.successIcon}
                />
                <Text style={styles.popupText}>{successMessage}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {/* Popup Error */}
      {showErrorPopup && (
        <Modal
          animationType="fade"
          transparent
          visible={showErrorPopup}
          onRequestClose={hidePopup}>
          <TouchableWithoutFeedback onPress={hidePopup}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <IoniconsIcon
                  name="close-circle-outline"
                  style={styles.errorIcon}
                />
                <Text style={styles.errorText}>{errorMessage}</Text>
                <TouchableOpacity
                  style={styles.popupButton}
                  onPress={hidePopup}>
                  <Text style={styles.popupButtonText}>Tutup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 238, 238, 1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 67,
    backgroundColor: 'rgba(86, 153, 79, 1)',
    paddingHorizontal: 20,
  },
  icon1: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  detailProduk: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255, 255, 255, 1)',
    marginTop: 4,
  },
  icon2: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  image1: {
    width: '100%',
    height: '100%',
  },
  category: {
    fontFamily: 'Poppins-SemiBold',
    color: '#121212',
    marginTop: 17,
    marginLeft: 29,
  },
  productInfo: {
    flexDirection: 'row',
    marginTop: 1,
    marginLeft: 29,
    marginRight: 30,
  },
  productInfoColumn: {
    width: 125,
    marginBottom: 5,
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    color: '#121212',
    fontSize: 18,
  },
  productPrice: {
    fontFamily: 'Poppins-Medium',
    color: '#121212',
    fontSize: 15,
    marginTop: 4,
    marginLeft: 2,
  },
  productRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  productRating: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    marginTop: 8,
  },
  icon3: {
    color: 'rgba(248, 231, 28, 1)',
    fontSize: 25,
    marginLeft: 5,
  },
  divider: {
    width: '90%',
    height: 1,
    backgroundColor: 'rgba(190, 177, 177, 1)',
    marginTop: 11,
    alignSelf: 'center',
  },
  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#121212',
    fontSize: 15,
    marginTop: 23,
    marginLeft: 31,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    width: '90%',
    marginLeft: 31,
    marginTop: 3,
  },
  cartContainer: {
    width: '90%',
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 210,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  icon4: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 40,
    height: 40,
    width: 40,
  },
  quantityContainer: {
    width: 43,
    height: 43,
    backgroundColor: 'rgba(220, 202, 202, 1)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Poppins-SemiBold',
    color: '#121212',
    fontSize: 22,
  },
  icon5: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 40,
    height: 40,
    width: 40,
  },
  buyButtonContainer: {
    width: 134,
    height: 43,
    backgroundColor: '#56984f',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buyButton: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: 300,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
    color: 'red',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  popupButton: {
    width: 100,
    backgroundColor: '#56984f',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successIcon: {
    color: '#56984f',
    fontSize: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  errorIcon: {
    color: 'red',
    fontSize: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default DetailProduk;
