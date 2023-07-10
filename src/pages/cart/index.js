import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigasi from '../assets/components/navigation';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';

function Cart() {
  const navigation = useNavigation();
  const route = useRoute();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const {token} = useContext(AuthContext);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const {item, sub_total, tax, total} = route.params?.cartData;

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(sub_total);
  const [cartTax, setCartTax] = useState(tax);
  const [cartTotal, setCartTotal] = useState(total);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          'http://gosmart.candibinangun.id/api/cart',
          config,
        );
        // console.log(response.data.data);

        if (
          response.data &&
          response.data.data &&
          response.data.data.item &&
          typeof response.data.data.item === 'object'
        ) {
          const cartItems = Object.entries(response.data.data.item).map(
            ([key, item]) => ({
              ...item,
              slug: key,
              isChecked: false,
              image: item.product.image,
            }),
          );

          setCartItems(cartItems);
          setSubtotal(response.data.data.sub_total);
          setCartTax(response.data.data.tax.parsedRawValue);
          setCartTotal(response.data.data.total);
        } else {
          console.error('Invalid cart data response:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };

    fetchCartData();
  }, [token]);

  useEffect(() => {
    if (route.params?.cartData) {
      // setCartData(route.params.cartData);
    }
  }, [route.params?.cartData]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((total, item) => {
      if (item.isChecked) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleCheckboxPress = itemId => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.slug === itemId) {
          return {...item, isChecked: !item.isChecked};
        }
        return item;
      }),
    );
  };

  const handleDeleteItem = async itemId => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://gosmart.candibinangun.id/api/cart/${itemId}`,
        config,
      );

      if (response.status === 200) {
        const updatedCartItems = cartItems.filter(item => item.slug !== itemId);
        setCartItems(updatedCartItems);

        const cartData = {
          item: updatedCartItems,
          sub_total: subtotal,
          tax: cartTax,
          total: cartTotal,
        };

        await AsyncStorage.setItem('cartData', JSON.stringify(cartData));
        setShowSuccessPopup(true);

        console.log('Produk berhasil dihapus dari keranjang:', itemId);
      } else {
        console.error('Failed to delete product data:', response.data);
      }
    } catch (error) {
      console.error('Failed to delete product data:', error);
    }
  };

  const hidePopup = () => {
    setShowSuccessPopup(false);
  };

  const handleAdd = itemId => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.slug === itemId) {
          return {...item, quantity: item.quantity + 1};
        }
        return item;
      }),
    );
  };

  const handleRemove = itemId => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.slug === itemId && item.quantity > 0) {
          return {...item, quantity: item.quantity - 1};
        }
        return item;
      }),
    );
  };

  const handleGoToCheckout = async () => {
    const selectedItems = cartItems.filter(item => item.isChecked);
    try {
      await AsyncStorage.setItem(
        'selectedItems',
        JSON.stringify(selectedItems),
      );
      navigation.navigate('Checkout');
    } catch (error) {
      console.error('Failed to save selected items:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rect1}>
        <View style={styles.icon1Row}>
          <IoniconsIcon
            name="chevron-back"
            style={styles.icon1}
            onPress={handleGoBack}
          />
          <Text style={styles.keranjang}>Keranjang</Text>
          <IoniconsIcon name="cart-outline" style={styles.icon2} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.rect6}>
          {cartItems.length > 0 ? (
            cartItems.map(product => (
              <View style={styles.itemContainer} key={product.slug}>
                <View style={styles.rectangle}>
                  <TouchableOpacity
                    onPress={() => handleCheckboxPress(product.slug)}
                    style={[
                      styles.checkbox,
                      product.isChecked
                        ? styles.checkboxChecked
                        : styles.checkboxUnchecked,
                    ]}>
                    {product.isChecked && (
                      <IoniconsIcon name="checkmark" style={styles.checkmark} />
                    )}
                  </TouchableOpacity>

                  <Image
                    source={{uri: product.image}}
                    resizeMode="contain"
                    style={styles.image1}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{product.name}</Text>
                    <View style={styles.itemPriceContainer}>
                      <Text style={styles.itemPrice}>{product.price}</Text>
                    </View>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={() => handleRemove(product.id)}>
                        <IoniconsIcon
                          name="remove-circle-outline"
                          style={styles.icon6}
                        />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>
                        {product.quantity}
                      </Text>
                      <TouchableOpacity onPress={() => handleAdd(product.id)}>
                        <IoniconsIcon
                          name="add-circle-outline"
                          style={styles.icon7}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleDeleteItem(product.slug)}
                    style={styles.deleteIconContainer}>
                    <IoniconsIcon
                      name="trash-outline"
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text>Tidak ada produk yang ditemukan</Text>
          )}
        </View>
      </ScrollView>
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
              <Text style={styles.successText}>
                Produk berhasil dihapus dari keranjang.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.rect8Stack}>
        <View style={styles.rect8}>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotal}>Subtotal :</Text>
            <Text style={styles.price}>Rp. {subtotal}</Text>
          </View>
          <TouchableOpacity style={styles.rect9} onPress={handleGoToCheckout}>
            <Text style={styles.checkout}>Checkout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navigasiContainer}>
          <Navigasi style={styles.navigasi1} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 238, 238, 1)',
  },
  rect1: {
    width: 392,
    height: 67,
    backgroundColor: 'rgba(86, 153, 79, 1)',
    alignSelf: 'center',
  },
  icon1: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 30,
    height: 30,
    width: 30,
  },
  keranjang: {
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
  icon1Row: {
    height: 33,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 19,
  },
  rect6: {
    width: 390,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      height: 5,
      width: 0,
    },
    elevation: 15,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignSelf: 'center',
    paddingVertical: 10,
  },
  itemContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  rectangle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'rgba(86, 152, 79, 1)',
  },
  checkboxUnchecked: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  checkmark: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 18,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  deleteIcon: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successIcon: {
    color: 'green',
    fontSize: 70,
    marginBottom: 10,
  },
  successText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  image1: {
    width: 111,
    height: 99,
    marginLeft: 13,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: '#121212',
    fontSize: 18,
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontFamily: 'Poppins-Medium',
    color: '#121212',
    fontSize: 15,
  },
  quantityContainer: {
    width: 80,
    height: 30,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    flexDirection: 'row',
    marginLeft: 75,
    marginTop: 20,
    paddingTop: 3,
    justifyContent: 'space-around',
  },
  icon6: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  quantityText: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
  },
  icon7: {
    color: 'rgba(128, 128, 128, 1)',
    fontSize: 20,
    height: 20,
    width: 20,
    marginTop: 1,
  },
  rect8Stack: {
    width: 392,
    height: 194,
  },
  rect8: {
    top: 0,
    width: 392,
    height: 192,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 5,
      height: 0,
    },
    elevation: 60,
    shadowOpacity: 0.77,
    shadowRadius: 20,
  },
  subtotal: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 18,
    marginTop: 10,
  },
  price: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 18,
    marginTop: 10,
  },
  subtotalRow: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rect9: {
    width: 325,
    height: 50,
    backgroundColor: 'rgba(86, 152, 79, 1)',
    borderRadius: 10,
    alignSelf: 'center',
  },
  checkout: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  navigasiContainer: {
    bottom: 0,
    position: 'absolute',
  },
  navigasi1: {
    bottom: 0,
  },
});

export default Cart;
