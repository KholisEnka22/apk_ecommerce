import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Svg, {Ellipse} from 'react-native-svg';

function Dashboard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <View style={styles.iconRow}>
            <IoniconsIcon
              name="cart-outline"
              style={styles.keranjang}></IoniconsIcon>
            <Text style={styles.dashboardText}>DASHBOARD</Text>
          </View>
        </View>
        <ImageBackground
          source={require('../assets/images/card_informasi.png')}
          resizeMode="contain"
          style={styles.image}
          imageStyle={styles.image_imageStyle}>
          <View style={styles.contenSearch}>
            <TextInput
              placeholder="Search"
              returnKeyType="search"
              style={styles.placeholder}></TextInput>
            <View style={styles.rect11}>
              <FontAwesomeIcon
                name="search"
                style={styles.icon8}></FontAwesomeIcon>
            </View>
          </View>
          <View style={styles.rect2Row}>
            <View style={styles.rect2}></View>
            <Svg viewBox="0 0 11.29 11.29" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(173,188,171,1)"
                cx={6}
                cy={6}
                rx={6}
                ry={6}></Ellipse>
            </Svg>
            <Svg viewBox="0 0 11.29 11.29" style={styles.ellipse2}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(173,188,171,1)"
                cx={6}
                cy={6}
                rx={6}
                ry={6}></Ellipse>
            </Svg>
            <Svg viewBox="0 0 11.29 11.29" style={styles.ellipse3}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(173,188,171,1)"
                cx={6}
                cy={6}
                rx={6}
                ry={6}></Ellipse>
            </Svg>
          </View>
          <Text style={styles.kategori}>Kategori</Text>
        </ImageBackground>
      </View>
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
      <View style={styles.kategoriTextRow}>
        <Text style={styles.makanan}>Makanan</Text>
        <Text style={styles.minuman}>Minuman</Text>
        <Text style={styles.kerajinan}>Kerajinan</Text>
      </View>
      <View style={styles.produkTerbaruRow}>
        <Text style={styles.produkTerbaru}>Produk Terbaru</Text>
        <Text style={styles.detail}>Detail</Text>
        <IoniconsIcon
          name="chevron-forward-outline"
          style={styles.iconArrow}></IoniconsIcon>
      </View>
      <View style={styles.rect8Row}>
        <View style={styles.rect8}>
          <View style={styles.image5Stack}>
            <Image
              source={require('../assets/images/ayam-geprek.jpg')}
              resizeMode="contain"
              style={styles.image5}></Image>
            <FontAwesomeIcon
              name="heart"
              style={styles.icon2}></FontAwesomeIcon>
          </View>
          <View style={styles.ayamGeprekStack}>
            <Text style={styles.ayamGeprek}>Ayam Geprek</Text>
            <Text style={styles.rp10000}>Rp. 10,000</Text>
          </View>
        </View>
        <View style={styles.rect9}>
          <View style={styles.image6Stack}>
            <Image
              source={require('../assets/images/ayam-geprek.jpg')}
              resizeMode="contain"
              style={styles.image6}></Image>
            <FontAwesomeIcon
              name="heart"
              style={styles.icon4}></FontAwesomeIcon>
          </View>
          <View style={styles.ayamGeprek2Stack}>
            <Text style={styles.ayamGeprek2}>Ayam Geprek</Text>
            <Text style={styles.rp100002}>Rp. 10,000</Text>
          </View>
        </View>
      </View>
      <View style={styles.rect10}>
        <View style={styles.icon5Row}>
          <IoniconsIcon name="md-home" style={styles.icon5}></IoniconsIcon>
          <IoniconsIcon name="md-cart" style={styles.icon6}></IoniconsIcon>
          <IoniconsIcon name="md-person" style={styles.icon7}></IoniconsIcon>
        </View>
      </View>
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
    width: 390,
    height: 322,
    position: 'absolute',
    backgroundColor: 'rgba(86,153,79,1)',
    left: 0,
    flexDirection: 'row',
  },
  keranjang: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 33,
    width: 30,
  },
  dashboardText: {
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255,255,255,1)',
    fontSize: 17,
    marginLeft: 90,
    marginTop: 9,
  },
  iconRow: {
    height: 33,
    flexDirection: 'row',
    flex: 1,
    marginRight: 154,
    marginLeft: 31,
    marginTop: 27,
  },
  image: {
    top: 81,
    width: 358,
    height: 358,
    position: 'absolute',
    left: 17,
  },
  image_imageStyle: {},
  placeholder: {
    fontFamily: 'Poppins-Regular',
    color: '#121212',
    height: 44,
    width: 272,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 15,
    paddingLeft: 15,
  },
  rect11: {
    width: 44,
    height: 44,
    backgroundColor: '#E6E6E6',
    borderRadius: 15,
    marginLeft: 13,
  },
  icon8: {
    color: 'rgba(128,128,128,1)',
    fontSize: 25,
    height: 25,
    width: 25,
    justifyContent: 'space-evenly',
    marginTop: 8,
    marginLeft: 10,
  },
  contenSearch: {
    height: 44,
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 13,
    marginRight: 9,
  },
  rect2: {
    width: 45,
    height: 11,
    backgroundColor: 'rgba(86,153,79,1)',
    borderRadius: 10,
  },
  ellipse: {
    width: 11,
    height: 11,
    marginLeft: 1,
  },
  ellipse2: {
    width: 11,
    height: 11,
    marginLeft: 3,
  },
  ellipse3: {
    width: 11,
    height: 11,
    marginLeft: 3,
  },
  rect2Row: {
    height: 11,
    flexDirection: 'row',
    marginTop: 247,
    marginLeft: 5,
    marginRight: 268,
  },
  kategori: {
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,1)',
    width: 81,
    height: 21,
    marginTop: 13,
    marginLeft: 11,
  },
  rectStack: {
    width: 390,
    height: 439,
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
    // marginLeft: 30,
    // marginRight: 30,
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
    marginLeft: 65,
  },
  kategoriTextRow: {
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
  iconArrow: {
    color: 'rgba(0,0,0,1)',
    fontSize: 20,
    marginLeft: 4,
  },
  produkTerbaruRow: {
    height: 23,
    flexDirection: 'row',
    marginTop: 14,
    marginLeft: 28,
    marginRight: 30,
  },
  rect8: {
    width: 165,
    height: 200,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
  },
  image5: {
    top: 20,
    width: 132,
    height: 75,
    marginLeft: 10,
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
  image5Stack: {
    width: 132,
    height: 81,
    marginTop: 4,
    marginLeft: 3,
  },
  ayamGeprek: {
    top: 4,
    position: 'absolute',
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,1)',
    width: 150,
    left: 2,
    fontSize: 16,
  },
  rp10000: {
    top: 25,
    position: 'absolute',
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,1)',
    width: 150,
    left: 2,
    fontSize: 16,
  },
  ayamGeprekStack: {
    width: 75,
    height: 35,
    marginTop: 18,
    marginLeft: 11,
  },
  image6: {
    top: 20,
    width: 132,
    height: 75,
    marginLeft: 10,
  },
  icon3: {
    top: 4,
    left: 118,
    position: 'absolute',
    color: 'rgba(65,117,5,1)',
    fontSize: 15,
  },
  rect9: {
    width: 165,
    height: 161,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 10,
  },
  image7: {
    top: 6,
    left: 0,
    width: 132,
    height: 75,
    position: 'absolute',
  },
  icon4: {
    top: 7,
    left: 130,
    position: 'absolute',
    color: 'rgba(65,117,5,1)',
    fontSize: 20,
    height: 20,
    width: 20,
  },
  ayamGeprek2: {
    top: 4,
    position: 'absolute',
    fontFamily: 'Poppins-Medium',
    color: 'rgba(0,0,0,1)',
    width: 150,
    left: 2,
    fontSize: 16,
  },
  rp100002: {
    top: 25,
    position: 'absolute',
    fontFamily: 'Poppins-SemiBold',
    color: 'rgba(0,0,0,1)',
    width: 150,
    left: 2,
    fontSize: 16,
  },
  ayamGeprek2Stack: {
    width: 75,
    height: 35,
    marginTop: 18,
    marginLeft: 11,
  },
  image6Stack: {
    width: 132,
    height: 81,
    marginTop: 4,
    marginLeft: 3,
  },
  rect8Row: {
    height: 151,
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-around',
  },
  rect10: {
    width: 392,
    height: 79,
    backgroundColor: 'rgba(86,152,79,1)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    marginTop: 9,
    alignSelf: 'center',
  },
  icon5: {
    color: 'rgba(251,196,27,1)',
    fontSize: 35,
    height: 38,
    width: 28,
  },
  icon6: {
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    height: 38,
    width: 28,
    marginLeft: 120,
  },
  icon7: {
    color: 'rgba(255,255,255,1)',
    fontSize: 35,
    height: 38,
    width: 26,
    marginLeft: 106,
  },
  icon5Row: {
    height: 38,
    flexDirection: 'row',
    flex: 1,
    marginRight: 51,
    marginLeft: 33,
    marginTop: 19,
  },
});

export default Dashboard;
