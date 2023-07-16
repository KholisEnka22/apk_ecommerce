import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Navigasi(props) {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const route = useRoute();

  const handleTabPress = async tabName => {
    setActiveTab(tabName);
    if (tabName === 'Cart') {
      const cartData = await AsyncStorage.getItem('cartData');
      if (cartData) {
        navigation.navigate(tabName, {cartData: JSON.parse(cartData)});
      } else {
        // Handle jika cartData tidak ada
        console.log('cartData tidak tersedia');
      }
    } else {
      navigation.navigate(tabName);
    }
  };

  const getIconColor = tabName => {
    return activeTab === tabName ? 'white' : 'white';
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect5}>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('Dashboard')}>
          <IoniconsIcon
            name="home"
            style={[styles.icon10, {color: getIconColor('Dashboard')}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('Cart')}>
          <IoniconsIcon
            name="cart"
            style={[styles.icon9, {color: getIconColor('Cart')}]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => handleTabPress('Profile')}>
          <IoniconsIcon
            name="person"
            style={[styles.icon11, {color: getIconColor('profile')}]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  rect5: {
    width: 395,
    height: 79,
    backgroundColor: 'rgba(86,152,79,1)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon10: {
    fontSize: 31,
    height: 31,
    width: 31,
  },
  icon9: {
    fontSize: 33,
    height: 33,
    width: 33,
  },
  icon11: {
    fontSize: 30,
    height: 30,
    width: 30,
  },
});

export default Navigasi;
