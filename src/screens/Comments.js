import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const dispatch = useDispatch();
  const globalAuth = useSelector(state => state.auth);

  const changeGlobalState = () => {
    const newUsername = 'Nama kamu?';

    AsyncStorage.setItem('username', newUsername)
      .then(result => {
        dispatch({
          type: 'CHANGE_USERNAME',
          payload: newUsername,
        });
      })
      .catch(err => {
        console.log('error');
      });
  };

  const loadGlobalState = () => {
    AsyncStorage.getItem('username')
      .then(result => {
        dispatch({
          type: 'CHANGE_USERNAME',
          payload: result,
        });
      })
      .catch(err => {
        console.log('error');
      });
  };

  const resetGlobalState = () => {
    AsyncStorage.removeItem('username')
      .then(result => {
        dispatch({
          type: 'RESET_USERNAME',
        });
      })
      .catch(err => {
        console.log('error');
      });
  };

  // useEffect(() => {
  //   loadGlobalState();
  // }, []);

  return (
    <View style={{...styles.mainContainer}}>
      <Text>All Comments screen</Text>
      <Text>Username: {globalAuth.username}</Text>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <TouchableOpacity
          style={{...styles.navButton}}
          onPress={changeGlobalState}>
          <Text>Change Global State</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.navButton}}
          onPress={resetGlobalState}>
          <Text>Reset Global State</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;
