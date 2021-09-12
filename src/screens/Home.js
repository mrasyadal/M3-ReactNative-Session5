import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
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
  userListContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  flatListContainer: {
    marginTop: 32,
    width: '100%',
    paddingHorizontal: 8,
  },
});

const users = [
  {
    id: 1,
    username: 'Mark',
  },
  {
    id: 2,
    username: 'John',
  },
  {
    id: 3,
    username: 'Cohn',
  },
];

const Home = props => {
  const renderUserList = ({item}) => {
    return (
      <View style={{...styles.userListContainer}}>
        {/* View bersifat flexbox yang mengatur text berupa username dan tombol 'TouchableOpacity' */}
        <Text>{item.username}</Text>
        <TouchableOpacity
          style={{...styles.navButton, backgroundColor: 'lightpink'}}
          onPress={() => props.navigation.push('UserProfile', item)}>
          <Text>Go to User Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{...styles.mainContainer}}>
      <Text>Home screen</Text>
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('UserProfile')}
        style={{...styles.navButton}}>
        <Text>Tap to Navigate</Text>
      </TouchableOpacity> */}
      {/* Kode di atas dijadikan komen di M3S4C3 */}

      <FlatList
        style={{...styles.flatListContainer}}
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserList}
      />
    </View>
  );
};

export default Home;
