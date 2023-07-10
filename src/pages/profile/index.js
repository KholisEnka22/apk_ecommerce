import React, {useRef, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Navigasi from '../assets/components/navigation';
import {AuthContext} from '../../context/AuthContext';

function Profile() {
  const data = [
    {
      label: 'Riwayat Pesanan',
      value: [
        {status: 'Belum Dibayar', icon: 'wallet-outline'},
        {status: 'Dikemas', icon: 'archive-outline'},
        {status: 'Dikirim', icon: 'send-outline'},
        {status: 'Selesai', icon: 'ios-checkmark-circle-outline'},
      ],
    },
    {label: 'Age', value: '30'},
    {label: 'Location', value: 'New York, USA'},
    {label: 'Interests', value: 'Travel, Photography, Music'},
  ];
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [250, 100],
    extrapolate: 'clamp',
  });
  const navigation = useNavigation();
  const {logout} = useContext(AuthContext); // Ambil fungsi logout dari AuthContext

  function handleNavigateToScrollableTabView() {
    navigation.navigate('ScrollableTabViewPager1');
  }

  function handleLogout() {
    // Tambahkan logika logout di sini
    // Contoh:
    logout();
    console.log('Logout');
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../assets/images/Mark.png')}
            style={styles.profileImage}
          />
          <Text style={styles.username}>John Doe</Text>
        </View>
        <Text style={styles.email}>johndoe@example.com</Text>
      </Animated.View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          if (item.label === 'Riwayat Pesanan') {
            return (
              <View style={styles.orderHistoryContainer}>
                <Text style={styles.orderHistoryLabel}>{item.label}</Text>
                <View style={styles.orderHistoryIconsContainer}>
                  {item.value.map((status, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.orderHistoryIconContainer}
                      onPress={handleNavigateToScrollableTabView}>
                      <Icon
                        name={status.icon}
                        size={25}
                        color="#808080"
                        style={styles.orderHistoryIcon}
                      />
                      <Text style={styles.orderHistoryStatus}>
                        {status.status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          }
          return (
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          );
        }}
        keyExtractor={item => item.label}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}
      />

      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigasiContainer}>
        <Navigasi style={styles.navigasi1} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#121212',
    marginTop: 10,
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#808080',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  infoLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#121212',
  },
  infoValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#808080',
    marginTop: 5,
  },
  orderHistoryContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  orderHistoryLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#121212',
  },
  orderHistoryIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  orderHistoryIconContainer: {
    alignItems: 'center',
  },
  orderHistoryIcon: {
    marginBottom: 5,
  },
  orderHistoryStatus: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#808080',
  },
  logoutButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'red',
  },
  navigasiContainer: {
    bottom: 0,
    position: 'absolute',
  },
  navigasi1: {
    bottom: 0,
  },
});

export default Profile;
