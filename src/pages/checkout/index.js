import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Checkout(props) {
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchSelectedItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('selectedItems');
        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setSelectedItems(parsedItems);
        }
      } catch (error) {
        console.error('Failed to fetch selected items:', error);
      }
    };

    fetchSelectedItems();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleEditAddress = () => {
    navigation.navigate('Alamat'); // Ganti 'Alamat' dengan nama halaman Alamat Anda
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Icon
            name="chevron-back-outline"
            style={styles.backIcon}
            onPress={handleGoBack}
          />
          <Text style={styles.checkoutTitle}>Checkout</Text>
          <Icon name="cart-outline" style={styles.cartIcon} />
        </View>
      </View>
      <ScrollView>
        <Text style={styles.addressTitle}>Alamat</Text>
        <View style={styles.addressContainer}>
          <View style={styles.addressRow}>
            <Icon name="location-outline" style={styles.addressIcon} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressText}>Kenduruan - Sukorejo</Text>
              <Text style={styles.phoneNumber}>085731028903</Text>
            </View>
            <FontAwesomeIcon
              name="pencil"
              style={styles.editIcon}
              onPress={handleEditAddress}
            />
          </View>
        </View>
        <Text style={styles.orderTitle}>Detail Pesanan</Text>
        <View style={styles.orderContainer}>
          {selectedItems.map(item => (
            <View style={styles.itemContainer} key={item.slug}>
              <View style={styles.itemRow}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="contain"
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemPrice}>
                      Rp. {item.price} x {item.count}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.shippingTitle}>Opsi Pengiriman</Text>
        <View style={styles.shippingContainer}>
          <View style={styles.shippingRow}>
            <Text style={styles.shippingText}>JNE - REG</Text>
            <Icon name="chevron-down-outline" style={styles.arrowIcon} />
          </View>
        </View>
        <Text style={styles.paymentTitle}>Detail Pembayaran</Text>
        <View style={styles.paymentContainer}>
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalText}>Subtotal :</Text>
            <Text style={styles.subtotalValue}>Rp. 25.000</Text>
          </View>
          <View style={styles.shippingFeeRow}>
            <Text style={styles.shippingFeeText}>Ongkir :</Text>
            <Text style={styles.shippingFeeValue}>Rp. 10.000</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total :</Text>
            <Text style={styles.totalValue}>Rp. 35.000</Text>
          </View>
        </View>
        <View style={styles.paymentDetailsContainer}>
          <Text style={styles.paymentMethodText}>Beli</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#56994F',
    height: 60,
    paddingHorizontal: 20,
  },
  headerRow: {
    height: 33,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 14,
  },
  backIcon: {
    color: 'white',
    fontSize: 24,
  },
  checkoutTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
  },
  cartIcon: {
    color: 'white',
    fontSize: 24,
  },
  addressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#121212',
    marginTop: 10,
    marginLeft: 20,
  },
  addressContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    color: '#121212',
    fontSize: 24,
  },
  addressDetails: {
    marginLeft: 10,
  },
  addressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
  },
  phoneNumber: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
    marginTop: 5,
  },
  editIcon: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: 20,
    marginLeft: 'auto',
  },
  orderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#121212',
    marginTop: 20,
    marginLeft: 20,
  },
  orderContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#121212',
    marginBottom: 5,
  },
  itemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#121212',
    marginRight: 'auto',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityIcon: {
    color: '#56994F',
    fontSize: 24,
    marginHorizontal: 5,
  },
  quantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#121212',
    marginHorizontal: 5,
  },
  shippingTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#121212',
    marginTop: 20,
    marginLeft: 20,
  },
  shippingContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
    marginRight: 'auto',
  },
  arrowIcon: {
    color: '#121212',
    fontSize: 24,
  },
  paymentContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 10,
  },
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  subtotalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
    marginRight: 'auto',
  },
  subtotalValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
  },
  shippingFeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  shippingFeeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
    marginRight: 'auto',
  },
  shippingFeeValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#121212',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#121212',
    marginRight: 'auto',
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#121212',
  },
  paymentTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#121212',
    marginTop: 20,
    marginLeft: 20,
  },
  paymentDetailsContainer: {
    width: 324,
    height: 50,
    backgroundColor: '#56984f',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontFamily: 'Poppins-Medium',
    color: 'rgba(255,255,255,1)',
    fontSize: 16,
    marginTop: 12,
  },
});

export default Checkout;
