import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  RefreshControl,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'lightblue',
    borderRadius: 4,
    alignSelf: 'center',
  },
  userListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  flatListContainer: {
    marginTop: 32,
    width: '100%',
    paddingHorizontal: 8,
  },
  TextInput: {
    backgroundColor: 'lightgrey',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
    marginHorizontal: 16,
    flex: 1,
  },
});

const API_URL = 'http://10.0.2.2:2000';

const Home = props => {
  const dispatch = useDispatch();

  // bekas M3S6C1
  // const globalState = useSelector(state => state);
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

  const [userList, setUserList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userInput, setUserInput] = useState('');

  const fetchUsers = () => {
    Axios.get(`${API_URL}/users`)
      .then(result => {
        setUserList(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const refreshHandler = () => {
    // 5 hal yg diperbuat onRefresh function:
    // 1. Membuat refreshing bernilai true agar icon loading muncul
    // 2. Load data dari API
    // 3. Menyimpan data ke state
    // 4.a Jika berhasil, membuat refreshing bernilai false agar icon loading hilang
    // 4.b Jika error, membuat refreshing bernilai false agar icon loading hilang dan console.log(error)

    setIsRefreshing(true);
    Axios.get(`${API_URL}/users`)
      .then(result => {
        setUserList(result.data);
        setIsRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setIsRefreshing(false);
      });
  };

  const renderUserList = ({item}) => {
    return (
      <View style={{...styles.userListItem}}>
        {/* View bersifat flexbox yang mengatur text berupa username dan tombol 'TouchableOpacity' */}
        <Text>{item.username}</Text>
        <TouchableOpacity
          style={{
            ...styles.navButton,
            backgroundColor: 'lightpink',
          }}
          onPress={() => props.navigation.push('UserProfile', item)}>
          <Text>Go to User Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const inputHandler = text => {
    setUserInput(text);
  };

  const sendButtonHandler = () => {
    Axios.post(`${API_URL}/users`, {
      username: userInput,
    })
      .then(result => {
        console.log(result);
        refreshHandler();
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={{...styles.mainContainer}}>
      {/* <TouchableOpacity
        onPress={() => props.navigation.navigate('UserProfile')}
        style={{...styles.navButton}}>
        <Text>Tap to Navigate</Text>
      </TouchableOpacity> */}
      {/* Kode di atas dijadikan komen di M3S4C3 */}

      <View style={{flexDirection: 'row'}}>
        <TextInput onChangeText={inputHandler} style={{...styles.TextInput}} />
        <TouchableOpacity
          onPress={sendButtonHandler}
          style={{...styles.navButton, marginRight: 12}}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{...styles.flatListContainer}}
        data={userList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUserList}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshHandler}
          />
        }
      />

      {/* Ionicons ada di M3S4C6, cek dokumentasi file icon yg digunakan. Di bawah adalah tes fungsi Ionicons */}
      {/* <Ionicons name="home-outline" size={24} /> */}
    </View>
  );
};

export default Home;
