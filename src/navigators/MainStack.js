import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import UserProfile from '../screens/UserProfile';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    // Stack.Navigator adalah hasil pindahan dari App.js agar file App.js lebih rapih
    <Stack.Navigator initialRouteName="Home">
      {/* Stack.Navigator memiliki initial route name 'Home' yang mengeset `Home` jadi menu utama*/}
      {/* Stack.Navigator berisi Home, UserProfile, dan Comments */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};

export default MainStack;
