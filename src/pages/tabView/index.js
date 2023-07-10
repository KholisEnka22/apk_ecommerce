import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Navigasi from '../assets/components/navigation';

const ScrollableTabViewPager1 = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const tabIndicatorTranslateX = useRef(new Animated.Value(0)).current;
  const {width} = Dimensions.get('window');
  const tabWidth = width / 4;

  const handleTabPress = index => {
    setActiveTab(index);
    const translateXValue = index * tabWidth;
    Animated.timing(tabIndicatorTranslateX, {
      toValue: translateXValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    scrollViewRef.current.scrollTo({x: index * width});
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress(0)}>
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 0 && styles.activeTabButtonText,
          ]}>
          Belum Dibayar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress(1)}>
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 1 && styles.activeTabButtonText,
          ]}>
          Dikemas
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress(2)}>
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 2 && styles.activeTabButtonText,
          ]}>
          Dikirim
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => handleTabPress(3)}>
        <Text
          style={[
            styles.tabButtonText,
            activeTab === 3 && styles.activeTabButtonText,
          ]}>
          Selesai
        </Text>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.tabIndicator,
          {
            transform: [{translateX: tabIndicatorTranslateX}],
            width: tabWidth - 20,
            marginLeft: 10,
          },
        ]}
      />
    </View>
  );

  const scrollViewRef = useRef(null);

  const renderContent = () => (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={event => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setActiveTab(page);
        const translateXValue = page * tabWidth;
        Animated.timing(tabIndicatorTranslateX, {
          toValue: translateXValue,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }}
      scrollEventThrottle={200}>
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          <Text style={styles.screenText}>Belum Dibayar Content</Text>
        </View>
        <View style={styles.screenContainer}>
          <Text style={styles.screenText}>Dikemas Content</Text>
        </View>
        <View style={styles.screenContainer}>
          <Text style={styles.screenText}>Dikirim Content</Text>
        </View>
        <View style={styles.screenContainer}>
          <Text style={styles.screenText}>Selesai Content</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={{flex: 1}}>
      {renderHeader()}
      {renderContent()}
      <View style={styles.navigasiContainer}>
        <Navigasi style={styles.navigasi1} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeTabButtonText: {
    color: 'blue',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: 'blue',
  },
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width * 4,
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navigasiContainer: {
    bottom: 0,
    position: 'absolute',
  },
  navigasi1: {
    bottom: 0,
  },
});

export default ScrollableTabViewPager1;
