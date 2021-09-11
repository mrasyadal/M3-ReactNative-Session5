import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  SegmentedControlIOSComponent,
} from 'react-native';

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

const Home = props => {
  return (
    <View style={{...styles.mainContainer}}>
      <Text>Home screen</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('UserProfile')}
        style={{...styles.navButton}}>
        <Text>Tap to Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
