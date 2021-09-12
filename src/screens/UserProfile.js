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
  // routeParams ditambahkan di M3S4C3
  const routeParams = props.route.params;

  return (
    <View style={{...styles.mainContainer}}>
      <Text>User Profile Screen</Text>

      {/* `ID` dan `Name` ditambahkan di M3S4C3 */}
      <Text>ID: {routeParams.id}</Text>
      <Text>Name: {routeParams.username}</Text>

      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{...styles.navButton}}>
        <Text>Tap to Return</Text>
      </TouchableOpacity>

      {/* Ketika tombol di bawah ditekan, masuk ke komen dengan data orang tersebut yang disimpan di `routeParams` */}
      <TouchableOpacity
        onPress={() => props.navigation.push('Comments', routeParams)}
        style={{...styles.navButton}}>
        <Text>Tap to Navigate to Comments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;
