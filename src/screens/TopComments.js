import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: 'lightblue',
    borderRadius: 4,
  },
});

const TopComments = props => {
  return (
    <View style={{...styles.mainContainer}}>
      <Text>TopComments screen</Text>
    </View>
  );
};

export default TopComments;
