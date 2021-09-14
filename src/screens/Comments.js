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
      <Text> All Comments screen</Text>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <TouchableOpacity style={{...styles.navButton}}>
          <Text>Change Global State</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.navButton}}>
          <Text>Save Global State</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
