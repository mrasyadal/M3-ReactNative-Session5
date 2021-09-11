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

const UserProfile = props => {
  return (
    <View style={{...styles.mainContainer}}>
      <Text>User Profile screen</Text>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{...styles.navButton}}>
        <Text>Tap to Return</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.push('Comments')}
        style={{...styles.navButton}}>
        <Text>Tap to Navigate to Comments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
