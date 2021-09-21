import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import UserProfile from '../screens/UserProfile';
import Comments from '../screens/Comments';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  navButton: {
    margin: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'lightblue',
    borderRadius: 4,
    alignSelf: 'center',
  },
});

const MainStack = () => {
  const globalAuth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logoutButtonHandler = () => {
    AsyncStorage.removeItem('username')
      .then(() => {
        AsyncStorage.getItem('interceptorId')
          .then(interceptorId => {
            Axios.interceptors.request.eject(parseInt(interceptorId));

            AsyncStorage.removeItem('interceptorId')
              .then(() => {
                dispatch({
                  type: 'RESET_USERNAME',
                });
              })
              .catch(() => {
                console.log('Error remove interceptorId');
              });
          })
          .catch(() => {
            console.log('Error get item di sini lhooo');
          });
      })
      .catch(err => {
        console.log('Error remove username');
      });
  };

  return (
    // Stack.Navigator adalah hasil pindahan dari App.js agar file App.js lebih rapih
    <Stack.Navigator initialRouteName="Home">
      {/* Stack.Navigator memiliki initial route name 'Home' yang mengeset `Home` jadi menu utama*/}
      {/* Stack.Navigator berisi Home, UserProfile, dan Comments */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: `Hello, ${globalAuth.username}`,
          headerRight: () => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.navButton,
                }}
                onPress={logoutButtonHandler}>
                <Text style={{color: 'black'}}>Log out</Text>
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      {/* <Stack.Screen name="Comments" component={Comments} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;
