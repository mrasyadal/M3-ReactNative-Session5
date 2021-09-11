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

const Comments = props => {
  return (
    <View style={{...styles.mainContainer}}>
      <Text>Comments screen</Text>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{...styles.navButton}}>
        <Text>Tap to Return</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comments;
