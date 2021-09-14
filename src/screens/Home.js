import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const globalState = useSelector(state => state);
  // pada kondisi ini, `state` memiliki property berupa `state.auth` yg berasal dari /redux/reducers/index.js
  // `auth` sendiri adalah property dengan nilai `authReducer` (lihat di /redux/reducers/index.js)
  // `authReducer` adalah suatu object dengan property username (lihat di /redux/reducers/auth.js)
  // berarti, ada globalState.auth.username karena `globalState = state`
  // bisa juga bikin code spt ini:
  // const globalState = useSelector(state => return { auth: state.auth, todo: state.todo})

  // Alternatif: misal ada reducers bernama todo yg sudah diimport ke dalam /reducers/index.js
  // const globalTodo = useSelector(state => state.todo)
  // const globalAuth = useSelector(state => state.auth)
  // ada 2 buah variabel yg menyimpan masing-masing reducers

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

      {/* Ionicons ada di M3S4C6, cek dokumentasi file icon yg digunakan. Di bawah adalah tes fungsi Ionicons */}
      {/* <Ionicons name="home-outline" size={24} /> */}
    </View>
  );
};

export default Home;
