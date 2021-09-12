import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import UserProfile from '../screens/UserProfile';
import Comments from '../screens/Comments';
import MainStack from './MainStack';

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      {/* <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="UserProfile" component={UserProfile} /> */}
      <BottomTab.Screen
        name="MainStack"
        component={MainStack}
        options={{title: 'Menu'}}
      />
      <BottomTab.Screen name="Comments" component={Comments} />
    </BottomTab.Navigator>
  );
};

export default MainTab;
