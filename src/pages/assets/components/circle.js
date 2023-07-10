import React from 'react';
import {View, StyleSheet} from 'react-native';

const Circle = () => {
  return <View style={styles.circle} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 11,
    height: 11,
    borderRadius: 11 / 2,
    backgroundColor: 'rgba(173,188,171,1)',
    marginLeft: 3,
  },
});

export default Circle;
